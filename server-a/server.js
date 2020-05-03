import gRPC from 'grpc';
import { getSimpleDate } from './app/controller/getSimpleData.controller';
const protoLoader = require('@grpc/proto-loader');

// const proto = gRPC.load('.porto');
const packageDefinition = protoLoader.loadSync('.porto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const packageObject = gRPC.loadPackageDefinition(packageDefinition);
const server = new gRPC.Server();



server.addService(packageObject.SampleDataService.service, {
    GetSampleData: getSimpleDate,
});

const port = '8001';
console.log('port', port);

server.bind(`0.0.0.0:${port}`, gRPC.ServerCredentials.createInsecure());

server.start();
console.log('grpc server is running');
