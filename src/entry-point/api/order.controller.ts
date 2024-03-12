import { Request, Response, NextFunction } from "express";
import {
  createOrderService,
  getOrderByIdService,
  updateOrderStatusService,
  getUserOrdersService,
} from "../../domain/order.service";

export async function createOrderHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const orderData = req.body;
    const order = await createOrderService(orderData);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
}

export async function getOrderByIdHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const orderId = req.params.orderId;
    const order = await getOrderByIdService(orderId);

    if (order == null) {
      res.status(404).json({ message: "Order not found" });
      return;
    }
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
}

export async function updateOrderStatusHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const orderId = req.params.orderId;
    const { status } = req.body;
    const updatedOrder = await updateOrderStatusService(orderId, status);
    if (!updatedOrder) {
      res.status(404).json({ message: "Order not found" });
      return;
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
  }
}

export async function getUserOrdersHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.params.userId;
    const orders = await getUserOrdersService(userId);
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
}
