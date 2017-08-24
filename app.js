let express = require('express');
let bodyParser = require('body-parser');
let debug = require('debug')('data-bug:server');
let http = require('http');

let index = require('./routes/index');

let app = express();

app.set('view engine', 'ejs');

app.use('/', index);

app.use((req, res, next) => {
    let err = new Error(req.url + ' Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err: {};

    res.status(err.status || 500);
    res.json(err);
});

let port = normalizePort(process.env.PORT || '80');
app.set('port', port);

let server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
    let port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    
    return false;
}

function onError(error) {
    if (errpr.syscall != 'listen') {
        throw error;
    }
    let bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    switch (error.code) {
        case 'EACCES' :
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE' :
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default : 
        throw error;
    }
}

function onListening() {
    let addr = server.address();
    let bind = typeof addr === 'string'
        ? 'pipe' + addr
        : 'port' + addr.port;
    debug('Listening on ' + bind);
}