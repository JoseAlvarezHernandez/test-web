let path = require('path');
let express = require('express');
let app = express();
let routes = require('./routes');
let bodyParser = require('body-parser');
let port = process.env.port || 1339;
// Set express rules
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'app')));

// Set routes
app.get('/', routes.index);

// Start server
app.listen(port,()=>{});
