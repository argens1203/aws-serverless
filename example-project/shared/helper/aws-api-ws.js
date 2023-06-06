import AWS from 'aws-sdk';

export async function sendMsgToClient(url, connectionId, payload) {
  const apigatewaymanagementapi = new AWS.ApiGatewayManagementApi({
    apiVersion: "2018-11-29",
    endpoint: url,
  });
  await apigatewaymanagementapi
    .postToConnection({
      ConnectionId: connectionId,
      Data: JSON.stringify(payload),
    })
    .promise();
  return true;
}
export async function disconnect(url, connectionId) {
    const apigatewaymanagementapi = new AWS.ApiGatewayManagementApi({
      apiVersion: "2018-11-29",
      endpoint: url,
    });
    const params = {
      ConnectionId: connectionId
    };
    await apigatewaymanagementapi
      .deleteConnection(
        params,
        (err, data) => {
          if (err) return {err, test:'abc'};
          return {data, test:'abc'};
        }
      )
      .promise();
    return true;
}