const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3333;
const cors = require('cors')({ origin: 'http://localhost:3000' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/downloads', express.static('downloads'));
app.use(cors);

// routes(app, express);

require('./routes/menu.routes')(app);
require('./routes/post.routes')(app);
require('./routes/file.routes')(app);
require('./routes/login.routes')(app);
require('./routes/settings.routes')(app);

app.listen(port, error => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server listening on port ${port}`);
});