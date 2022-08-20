import http from 'http';
import dayjs from 'dayjs';
import process from 'process';
import Logger from './core/logger';
import config from '../node.config';
import app from './loaders';

process.setMaxListeners(100);

const server = http.createServer(app);

server.on('error', (err: Error) => {
    Logger.handleAppErrors('---Server Error--->', false, err);
});

const port = process.env.PORT || config.port;

server.listen(port, () => {
    console.log(`Server started at ${dayjs().tz('Africa/Nairobi').format('LLLL')} on port ${port}`);
});

function onError(error: any) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? `Pipe ${port}`
        : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

server.on('error', onError);
