import express from "express";
import {
  createOrderHandler,
  getOrderByIdHandler,
  updateOrderStatusHandler,
  getUserOrdersHandler,
} from "./order.controller";
import {
  validateCreateOrder,
  validateUpdateOrderStatus,
} from "./order.validator";

const router = express.Router();

router.post("/", validateCreateOrder, createOrderHandler);
router.get("/:orderId",  getOrderByIdHandler);
router.put(
  "/:orderId/status",
  validateUpdateOrderStatus,
  updateOrderStatusHandler
);
router.get("/user/:userId",  getUserOrdersHandler);

export default router;
