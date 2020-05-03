import gRPC from "grpc";
const  protoLoader = require('@grpc/proto-loader');

async function requestData(req, res, next) {

    const packageDefinition = protoLoader.loadSync('.porto', {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
    const packageObject = gRPC.loadPackageDefinition(packageDefinition);

    const client = new packageObject.SampleDataService('localhost:8001', gRPC.credentials.createInsecure());

    const response = await new Promise((resolve, reject) => {
        client.GetSampleData({}, (err, response) => {
            console.log('err', err);
            if (!response?.err) {
                resolve(response);
            } else {
                reject(err);
            }
        });
    });

    res.json(response);
}

export {
    requestData,
}
