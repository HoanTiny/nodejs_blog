const path = require('path');
const express = require('express');
var methodOverride = require('method-override');
const handlebars = require('express-handlebars');
// const middlewares = require("middlewares");

const app = express();
const port = 3006;

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

// Use Middlewares
app.use(require('./app/middlewares/SortMiddlewares'));

// app.engine("handlebars", handlebars());
app.engine(
    'hbs',
    handlebars.engine({
        defaultLayout: 'main',
        extname: '.hbs',
        helpers: require('./helpers/handlebars'),
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
