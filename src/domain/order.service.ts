import {
  createOrder,
  getOrderById,
  updateOrderStatus,
  getUserOrders,
} from "../data-access/order.repository";
import { IOrder } from "../data-access/order.model";

export async function createOrderService(
  orderData: Partial<IOrder>
): Promise<IOrder> {
  // Validate order data and perform any necessary business logic
  // ...

  // Create the order using the repository function
  const order = await createOrder(orderData);
  return order;
}

export async function getOrderByIdService(
  orderId: string
): Promise<IOrder | null> {
  // Retrieve the order by ID using the repository function
  const order = await getOrderById(orderId);
  return order;
}

export async function updateOrderStatusService(
  orderId: string,
  status: string
): Promise<IOrder | null> {
  // Validate the status and perform any necessary business logic
  // ...

  // Update the order status using the repository function
  const updatedOrder = await updateOrderStatus(orderId, status);
  return updatedOrder;
}

export async function getUserOrdersService(userId: string): Promise<IOrder[]> {
  // Retrieve user orders using the repository function
  const orders = await getUserOrders(userId);
  return orders;
}
