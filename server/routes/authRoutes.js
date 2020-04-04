'use strict';

const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const router = express.Router();
const jsforce = require('jsforce');
const redisClient = require('../redisClient');

// Instantiate Salesforce client with .env configuration
const oauth2 = new jsforce.OAuth2({
  loginUrl: process.env.SF_DOMAIN,
  clientId: process.env.SF_COMSUMER_KEY,
  clientSecret: process.env.SF_COMSUMER_SECRET,
  redirectUri: process.env.SF_CALLBACK_URL
});

/**
 *  Attemps to retrieves the server session.
 *  If there is no session, redirects with HTTP 401 and an error message
 */
function getSession(req, res) {
  // get the session from redis store 
  const session = req.session;

  if (!session.sfdcAuth) {
    res.status(401).json('No active session.');
    return null;
  }

  return session;
}

function resumeSalesforceConnection(session) {
  return new jsforce.Connection({
    oauth2: oauth2,
    instanceUrl: session.sfdcAuth.instanceUrl,
    accessToken: session.sfdcAuth.accessToken,
    refreshToken: session.sfdcAuth.refreshToken
  });
}

//use REGEX extract the lightning domain url, which is different from instance url
function getLightningDomainUrl(instanceUrl) {
  const pattern = /(https:\/\/[^.]+)/;
  return `${instanceUrl.match(pattern)[0]}.lightning.force.com`;
}

/**
 * Login endpoint
 */
router.get('/login', (req, res) => {
  // Redirect to Salesforce login/authorization page
  res.redirect(oauth2.getAuthorizationUrl({ scope: 'api id web refresh_token' }));
});

/**
 * Login callback endpoint (only called by Salesforce)
 */
router.get('/callback', (req, res) => {
  if (!req.query.code) {
    res.status(500).send('Failed to get authorization code from Salesforce server callback.');
    return;
  }

  // Authenticate with OAuth
  const conn = new jsforce.Connection({
    oauth2: oauth2,
    version: process.env.SF_API_VERSION
  });

  conn.authorize(req.query.code, function (error, userInfo) {
    if (error) {
      console.log('Salesforce authorization error: ' + JSON.stringify(error));
      res.status(500).json(error);
      return;
    }

    // Store oauth session data in server/ session store 
    // (never expose it directly to client)
    req.session.sfdcAuth = {
      instanceUrl: conn.instanceUrl,
      accessToken: conn.accessToken,
      refreshToken: conn.refreshToken
    };

    // Redirect to app main page
    //return res.redirect('/index.html');
    const encodeStr = encodeURIComponent('true');

    if (process.env.NODE_ENV === 'production') {
      return res.redirect('/');
      //return res.redirect('/');
    } else if (process.env.NODE_ENV === 'development') {
      return res.redirect('/');
    } else {
      return res.redirect('/');
    }
  });
});

/**
 * Endpoint for retrieving currently connected user
 */
router.get('/whoami', (req, res) => {
  const session = getSession(req, res);

  if (session == null) {
    console.log('No active session.');
    return;
  }

  // Request session info from Salesforce
  const conn = resumeSalesforceConnection(session);

  conn.identity(function (error, response) {
    if (error) {
      return console.error(error);
    }

    res.send(response);
  });
});

router.get('/logout', async (req, res) => {
  const session = getSession(req, res);
  if (session == null) return;

  // Revoke OAuth token
  const conn = resumeSalesforceConnection(session);

  conn.logout(function (err) {
    if (err) {
      console.error('Salesforce OAuth revoke error: ' + JSON.stringify(err));
      response.status(500).json(err);
      return;
    }

    // Destroy server-side session
    session.destroy(function (err) {
      if (err) {
        console.error('Salesforce session destruction error: ' + JSON.stringify(err));
      }
    });

    // Redirect to app main page
    //TODO: can we use??? res.render('index.html');
    if (process.env.NODE_ENV === 'production') {
      return res.json('Success');
    } else if (process.env.NODE_ENV === 'development') {
      return res.json('Success');
    } else {
      return res.json('Success');
    }
  });
});

router.get('/token', (req, res) => {
  const session = getSession(req, res);

  if (session == null) {
    console.log('No active session.');
    return;
  }

  res.json(session.sfdcAuth.accessToken);
});

router.get('/propertyMapBaseScriptUrl', (req, res) => {
  const session = getSession(req, res);

  if (session == null) {
    console.log('No active session for Lightning Out Base Script URL.');
    return;
  }

  const sfdcLightningDomainUrl = getLightningDomainUrl(session.sfdcAuth.instanceUrl);
  res.json(`${sfdcLightningDomainUrl}/lightning/lightning.out.js`);
});

router.get('/propertyMapLtnOutJs', (req, res) => {
  const session = getSession(req, res);

  if (session == null) {
    console.log('No active session for Lightning Out JS.');
    return;
  }

  const sfdcLightningDomainUrl = getLightningDomainUrl(session.sfdcAuth.instanceUrl);

  res.json(
    `$Lightning.use(
      'c:propertyMapAuraAppContainer',
      () => {
        $Lightning.createComponent(
          'c:propertyMap',
          {},
          'propertyMap'
        )
      },
      '${sfdcLightningDomainUrl}',
      '${session.sfdcAuth.accessToken}');`
  );
});

module.exports = router;
