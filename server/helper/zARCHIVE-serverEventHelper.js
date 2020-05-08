//idea comes from the following blog
//https://alligator.io/nodejs/server-sent-events-build-realtime-app/
//the solution of using Sever Sent Event has beening dumped

/**
 * the leadning is:
 * use native Server Send Event might highly fit this feature requirement 
 * in which we only need get data from send and render data in UI
 * data flow is signle direction and no complex requriements
 * 
 * while:
 * challenge 1: hard pass data between routes
 * Salesforce message is in AuthRoutes, while we want to use this message in SeverEventRoutes
 * solution 1 is use global variable
 * solution 2 is use redis, then pub/sub for real time process
 * I tried solution 2, redis can save the message
 * while:
 * question 1, in the redis store, there are session data, and message data 
 * although they have different key pattern, uuid/ sess:<sid>, how to differentiate keys in redis?
 * haven't tried redis pub sub
 */

// Middleware for POST /nest endpoint
async function add(req, res, next) {
  const newNest = req.body;
  nests.push(newNest);

  // Send recently added nest as POST result
  res.json(newNest)

  // Invoke iterate and send function
  return sendEventsToAll(newNest);
}

// Iterate clients list and use write res object method to send new message
const sendEventsToAll = (newMessage) => {
  // retrieve cache data from redis
  clients.forEach(c => c.res.write(`data: ${JSON.stringify(newMessage)}\n\n`))
}

module.exports = {

}