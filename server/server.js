const app = require('./app.js');
const server = require('http').createServer(app);
const port = process.env.PORT || 5001;


server.listen(port, () => console.log(`Listening on port ${port}`));