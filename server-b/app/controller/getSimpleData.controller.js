function getSimpleData(client) {
    return new Promise((resolve, reject) => {
        client.GetSampleData({}, (err, response) => {
            console.log('err', err);
            if (!response?.err) {
                resolve(response);
            } else {
                reject(err);
            }
        });
    });
}


export {
    getSimpleData,
}
