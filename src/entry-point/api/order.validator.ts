import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const createOrderSchema = Joi.object({
  userId: Joi.string().required(),
  productIds: Joi.array().items(Joi.string()).required(),
  quantities: Joi.array().items(Joi.number().integer().min(1)).required(),
  totalAmount: Joi.number().min(0).required(),
});

const updateOrderStatusSchema = Joi.object({
  status: Joi.string()
    .valid("pending", "processing", "shipped", "delivered")
    .required(),
});

export const validateCreateOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = createOrderSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error.details[0]);
  }
  next();
}

export const validateUpdateOrderStatus = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = updateOrderStatusSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error.details[0]);
  }
  next();
}

