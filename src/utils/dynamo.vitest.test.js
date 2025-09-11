import { describe, it, expect, beforeEach } from "vitest";
import { mockClient } from "aws-sdk-client-mock";
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
  GetCommand,
  DeleteCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

import {
  createItem,
  listAllItems,
  getItem,
  deleteItem,
  updateItem,
} from "./dynamo";

// All of the following code was copied from previous assignment

const ddbMock = mockClient(DynamoDBDocumentClient);

beforeEach(() => {
  ddbMock.reset();
});

describe("CRUD (unit, mocked) with Vitest", () => {
  it("createItem returns the same item", async () => {
    ddbMock.on(PutCommand).resolves({});
    const item = { id: "1", text: "hi" };

    const output = await createItem("Testing", item);

    expect(output).toEqual(item);
  });

  it("ListAllItems returns an array", async () => {
    const mockItems = [{ id: "1" }, { id: "2" }];
    ddbMock.on(ScanCommand).resolves({ Items: mockItems });

    const output = await listAllItems("Test");

    expect(output).toEqual(mockItems);
  });

  it("ListAllItems returns an empty array when empty", async () => {
    ddbMock.on(ScanCommand).resolves({});

    const output = await listAllItems("Test");

    expect(output).toEqual([]);
  });

  it("getItem returns the requested item", async () => {
    const mockItem = { id: "7", name: "Tester" };
    ddbMock.on(GetCommand).resolves({ Item: mockItem });

    const output = await getItem("FakeTable", { id: "7" });

    expect(output).toEqual(mockItem);
  });

  it("deleteItem returns deleted item", async () => {
    const mockItem = { id: "1", name: "Fake Item" };
    ddbMock.on(DeleteCommand).resolves({ Attributes: mockItem });

    const output = await deleteItem("Table", { id: "1" });

    expect(output).toEqual(mockItem);
  });

  it("updateItem changes tenant name", async () => {
    const mockUpdate = { id: "1", name: "Updated" };
    ddbMock.on(UpdateCommand).resolves({ Attributes: mockUpdate });

    const output = await updateItem("FakeTable", { id: "1" }, "Updated");

    expect(output).toEqual(mockUpdate);
  });
});
