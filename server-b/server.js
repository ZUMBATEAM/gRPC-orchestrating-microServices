import express from 'express';
import compression from 'compression';
import privateRouter from './app/services/routes';


// const Boom = require('boom');
import { DEFAULT_SERVER_HOST, DEFAULT_SERVER_PORT } from './app/config/services';

const PORT = process.env.PORT || DEFAULT_SERVER_PORT;
const HOST = process.env.HOST || DEFAULT_SERVER_HOST;

const app = express();

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));
app.use(compression());

// CORS middleware
const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(allowCrossDomain);

app.use(allowCrossDomain);
app.use('/private/api/v1', privateRouter);


app.use('*', (req, res, next) => {
    console.error('handled'); // Log error message in our server's console
    // If err has no specified error code, set error code to 'Internal Server Error (500)'
    return res.status(500).send('{}'); // All HTTP requests must have a response, so let's send back an error with its status code and message
});



app.listen(PORT, () => console.warn(`listening to http server on ${HOST}:${PORT}...`));

app.on('error', (err) => console.warn(err));

// return app;

// const options = {
//     reporters: {
//         myConsoleReporter: [
//             {
//                 module: 'good-squeeze',
//                 name: 'Squeeze',
//                 args: [{ log: '*', response: '*' }],
//             }, {
//                 module: 'good-console',
//             }, 'stdout',
//         ],
//     },
// };
//
// const server = hAPI.server({
//     host: '0.0.0.0',
//     port: 8000,
// });

// server.route({
//     method: 'GET',
//     path: '/',
//     handler: async (request, h) => {
//         const allResults = await getSimpleData(client);
//         return h.response(allResults);
//     },
// });


// const start = async () => {
//     try {
//         if (!module.parent) {
//             await server.register({
//                 plugin: good,
//                 options,
//             });
//             await server.start();
//         }
//         console.log('server started');
//     } catch (err) {
//         console.log('failed to start the server', err);
//     }
// };
//
// start();
