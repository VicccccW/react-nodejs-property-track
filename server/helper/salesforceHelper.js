const jsforce = require('jsforce');

// Instantiate Salesforce client with .env configuration
const oauth2 = new jsforce.OAuth2({
  loginUrl: process.env.SF_DOMAIN,
  clientId: process.env.SF_COMSUMER_KEY,
  clientSecret: process.env.SF_COMSUMER_SECRET,
  redirectUri: process.env.SF_CALLBACK_URL
});

/**
 *  Attemps to retrieves the server session.
 *  If there is no session, redirects with HTTP 401 and an error 
 *  TODO: refactor to a middleware
 */
const getSession = (req, res) => {
  // get the session from redis store 
  const session = req.session;

  if (!session.sfdcAuth) {
    res.status(200).json({ NoAuth: true });
    return;
  }

  return session;
}

const resumeSalesforceConnection = session => {
  return new jsforce.Connection({
    oauth2: oauth2,
    instanceUrl: session.sfdcAuth.instanceUrl,
    accessToken: session.sfdcAuth.accessToken,
    refreshToken: session.sfdcAuth.refreshToken
  });
}

//use REGEX extract the lightning domain url, which is different from instance url
const getLightningDomainUrl = instanceUrl => {
  const pattern = /(https:\/\/[^.]+)/;
  return `${instanceUrl.match(pattern)[0]}.lightning.force.com`;
}

const subscribeToSFPlatformEvent = (conn, socket) => {

  // The Salesforce streaming topic and position to start from.
  const channel = "/event/SF_Property_Event__e";
  // const replayId = -2; // receive all messages in the pool
  const replayId = -1; // receive only new messages without replay

  // Construct a streaming client.
  const fayeClient = conn.streaming.createClient([
    new jsforce.StreamingExtension.Replay(channel, replayId),
    new jsforce.StreamingExtension.AuthFailure(() => process.exit(1))
  ]);

  console.log('Subscribing to SF Platform Event...');

  // Subscribe to the channel with a function to receive each message.
  const subscription = fayeClient.subscribe(channel, data => {
    console.log('topic data received ---> ', JSON.stringify(data));

    // can only sent UTF-8
    socket.emit('SFEVENT', JSON.stringify(data));

    // cache data to redies store
    //redisClient.setex(uuidv4(), 3600, JSON.stringify(data));
  });

  return subscription;
}

const unsubscribeFromSFPlatformEvent = subscription => {
  if (subscription) {
    console.log('Unsubscribing from SF Platform Event...');
    subscription.cancel();
  }
}

module.exports = {
  oauth2,
  getSession,
  resumeSalesforceConnection,
  getLightningDomainUrl,
  subscribeToSFPlatformEvent,
  unsubscribeFromSFPlatformEvent
}