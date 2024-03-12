import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../src/app";
import Order, { IOrder } from "../src/data-access/order.model";


describe("Order API", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Order.deleteMany({});
  });

  const testOrder: Partial<IOrder> = {
    userId: "user123",
    productIds: ["product1", "product2"],
    quantities: [2, 1],
    totalAmount: 100,
  };

  describe("POST /api/orders", () => {
    it("should create a new order", async () => {
      const response = await request(app).post("/api/orders").send(testOrder);
      expect(response.status).toBe(201);
      expect(response.body.userId).toBe(testOrder.userId);
      expect(response.body.productIds).toEqual(testOrder.productIds);
      expect(response.body.quantities).toEqual(testOrder.quantities);
      expect(response.body.totalAmount).toBe(testOrder.totalAmount);
      expect(response.body.status).toBe("pending");
    });

    it("should return a validation error if required fields are missing", async () => {
      const invalidOrder = { userId: "user123" };
      const response = await request(app)
        .post("/api/orders")
        .send(invalidOrder);
    
      expect(response.status).toBe(400);
      expect(response.body?.message).toContain('"productIds" is required');
    });
  });

  describe("GET /api/orders/:orderId", () => {
    it("should retrieve an order by its ID", async () => {
      const createdOrder = await Order.create(testOrder);
      const response = await request(app).get(
        `/api/orders/${createdOrder._id}`
      );

      expect(response.status).toBe(200);
      expect(response.body._id).toBe(createdOrder._id.toString());
    });

    it("should return a 404 error if the order is not found", async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const response = await request(app).get(`/api/orders/${nonExistentId}`);
    
      expect(response.status).toBe(404);
      expect(response.body?.message).toBe("Order not found");
    });

  });

  describe("PUT /api/orders/:orderId/status", () => {
    it("should update the status of an order", async () => {
      const createdOrder = await Order.create(testOrder);
      const response = await request(app)
        .put(`/api/orders/${createdOrder._id}/status`)
        .send({ status: "processing" });
      expect(response.status).toBe(200);
      expect(response.body.status).toBe("processing");
    });

    it("should return a 404 error if the order is not found", async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .put(`/api/orders/${nonExistentId}/status`)
        .send({ status: "processing" });
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Order not found");
    });

  });

  describe("GET /api/orders/user/:userId", () => {
    it("should retrieve all orders of a user", async () => {
      await Order.create(testOrder);
      await Order.create({
        ...testOrder,
        productIds: ["product3"],
        quantities: [1],
      });
      const response = await request(app).get(
        `/api/orders/user/${testOrder.userId}`
      );
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
    });

    it("should return an empty array if the user has no orders", async () => {
      const response = await request(app).get(
        "/api/orders/user/nonexistentUser"
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

  });
});
