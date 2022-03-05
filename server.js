// Import dependencie
const express = require("express");
// Setup the express server
const app = express();
const port = 3000;
// Import middlewares into express
app.use(express.json({limit:"100mb"}));
// Import routes
const authRounter = require("./routers/auth");
const messagesRouter = require("./routers/messages");
// Setup all the routers
app.use("/api/messages", messagesRouter);
app.use("/api/auth", authRounter);
// Start the server
app.listen(port,() => {
    console.log('Listening on port ${port}..')
});