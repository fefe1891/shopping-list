const request = require("supertest");
const app = require("../index");
const items = require("../fakeDb");

let popsicle = { name: "popsicle", price: 1.45 };

// Before each test, clear out the items array and insert the "popsicle" item for consistency
beforeEach(function() {
    items.push(popsicle);
});

// After each test, clear out the items array so data from one test doesn't affect another
afterEach(function() {
    items.length = 0;
});

// Test for getting all items
it("should return all items", async function() {
    const resp = await request(app).get(`/items`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([ popsicle ]);
});

// Test for creating a new item
it("should create a new item", async function() {
    const resp = await request(app).post(`/items`).send({ name: "test", price: 3 });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ added: { name: "test", price: 3 }});
});

// Test for a single item
it("should return a single item", async function() {
    const resp = await request(app).get(`/items/${popsicle.name}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(popsicle);
});

// Test for patching/updating an item
it("should update an item", async function() {
    const resp = await request(app).patch(`/items/${popsicle.name}`).send({ name: "updated popsicle", price: 2 });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ updated: { name: "updated popsicle", price: 2 }});
});

// Test for deleting an item
it("should delete an item", async function() {
    const resp = await request(app).delete(`/items/${popsicle.name}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ message: "Deleted" });
});