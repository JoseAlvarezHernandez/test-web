let path = require('path');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let port = process.env.PORT || 1339;
// Set express rules
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'app')));

// Start server
app.listen(port, () => console.log('Server started'));
