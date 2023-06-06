import {APIGatewayEvent} from "aws-lambda";
// import {APIGatewayEvent, Context} from "aws-lambda";
import * as heartbeat from "../handlers/link/index";

test("hello", async () => {
  const event = { body: "Test Body" } as APIGatewayEvent;
  // const context = {} as Context;

  const response = await heartbeat.handler(event);

  expect(response.statusCode).toEqual(200);
  // expect(typeof response.body).toBe("string");
});
