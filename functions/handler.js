const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const db = new AWS.DynamoDB.DocumentClient()

module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: {
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
      env: process.env
    },
  }

  Promise.all([
    s3.listObjects({
      Bucket: process.env.bucket1
    })
    .promise(),
    db.scan({
      TableName: process.env.table1
    })
    .promise()
  ])
  .then(result => {
    response.result = result
  }, err => {
    response.error = err.stack
  })
  .then(() => {
    response.body = JSON.stringify(response.body)
    callback(null, response)
  })
};
