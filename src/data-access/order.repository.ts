import Order, { IOrder } from "./order.model";

export async function createOrder(orderData: Partial<IOrder>): Promise<IOrder> {
  const order = new Order(orderData);
  return await order.save();
}

export async function getOrderById(orderId: string): Promise<IOrder | null> {
  return await Order.findById(orderId);
}

export async function updateOrderStatus(
  orderId: string,
  status: string
): Promise<IOrder | null> {
  return await Order.findByIdAndUpdate(orderId, { status }, { new: true });
}

export async function getUserOrders(userId: string): Promise<IOrder[]> {
  return await Order.find({ userId });
}
