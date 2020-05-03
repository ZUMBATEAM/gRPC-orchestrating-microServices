import gRPC from 'grpc';
import hAPI from 'hapi';
import good from 'good';
import { getSimpleData } from './app/controller/getSimpleData.controller';
const protoLoader = require('@grpc/proto-loader');
// const Boom = require('boom');


const packageDefinition = protoLoader.loadSync('.porto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const packageObject = gRPC.loadPackageDefinition(packageDefinition);

const client = new packageObject.SampleDataService('localhost:8001', gRPC.credentials.createInsecure());


const options = {
    reporters: {
        myConsoleReporter: [
            {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{ log: '*', response: '*' }],
            }, {
                module: 'good-console',
            }, 'stdout',
        ],
    },
};

const server = hAPI.server({
    host: '0.0.0.0',
    port: 8000,
});

server.route({
    method: 'GET',
    path: '/',
    handler: async (request, h) => {
        const allResults = await getSimpleData(client);
        return h.response(allResults);
    },
});


const start = async () => {
    try {
        if (!module.parent) {
            await server.register({
                plugin: good,
                options,
            });
            await server.start();
        }
        console.log('server started');
    } catch (err) {
        console.log('failed to start the server', err);
    }
};

start();
