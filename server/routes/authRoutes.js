const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const router = express.Router();
const jsforce = require('jsforce');
const { oauth2,
  getSession,
  resumeSalesforceConnection,
  getLightningDomainUrl,
  subscribeToSFPlatformEvent,
  unsubscribeFromSFPlatformEvent } = require('../helper/salesforceHelper');

let SFSubscription;

/**
 * Login endpoint
 */
router.get('/login', (req, res) => {
  // Redirect to Salesforce login/authorization page
  res.redirect(oauth2.getAuthorizationUrl({ scope: 'api id web refresh_token' }));
});

/**
 * Endpoint for retrieving currently connected user
 */
router.get('/whoami', (req, res) => {
  const session = getSession(req, res);

  if (!session) return;

  // Request session info from Salesforce
  const conn = resumeSalesforceConnection(session);

  conn.identity((error, response) => {
    if (error) {
      return console.error(error);
    }

    res.send(response);
  });
});

router.get('/logout', (req, res) => {
  const session = getSession(req, res);

  if (!session) return;

  // Revoke OAuth token
  const conn = resumeSalesforceConnection(session);

  conn.logout(err => {
    if (err) {
      console.error('Salesforce OAuth revoke error: ' + JSON.stringify(err));
      response.status(500).json(err);
      return;
    }

    // Destroy server-side session
    session.destroy(err => {
      if (err) {
        console.error('Salesforce session destruction error: ' + JSON.stringify(err));
      }
    });

    unsubscribeFromSFPlatformEvent(global.SFSubscription);

    return res.json('Success');
  });
});

router.get('/token', (req, res) => {
  const session = getSession(req, res);

  if (!session) {
    console.log('No active session.');
    return;
  }

  res.json(session.sfdcAuth.accessToken);
});

router.get('/propertyMapBaseScriptUrl', (req, res) => {
  const session = getSession(req, res);

  if (!session) {
    console.log('No active session for Lightning Out Base Script URL.');
    return;
  }

  const sfdcLightningDomainUrl = getLightningDomainUrl(session.sfdcAuth.instanceUrl);
  res.json(`${sfdcLightningDomainUrl}/lightning/lightning.out.js`);
});

router.get('/propertyMapLtnOutJs', (req, res) => {
  const session = getSession(req, res);

  if (!session) {
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

module.exports = (io) => {

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

    conn.authorize(req.query.code, (error, userInfo) => {

      // can use the following id in JWT flow
      // {
      //   id: '0050w000001ebrUAAQ',
      //   organizationId: '00D0w0000000Xb8EAE',
      //   url: 'https://test.salesforce.com/id/00D0w0000000Xb8EAE/0050w000001ebrUAAQ'
      // }
      // console.log(userInfo);

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

      //connect to react front end

      io.on('connection', (socket) => {
        // subsribe to Salesforce Platform Event Channel
        global.SFSubscription = subscribeToSFPlatformEvent(conn, socket);

        socket.on('disconnect', () => {
          console.log('Socket disconnected!');
        })
      })

      // Redirect to app main page
      return res.redirect('/');
    });
  });

  return router
};
