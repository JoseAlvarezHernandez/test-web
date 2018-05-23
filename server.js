const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 1339;

// Set express rules
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'app')));
app.all('/*', (req, res) => res.sendFile('app/index.html', { root: __dirname }));

// Start server
app.listen(port, () => console.log('Server started'));
