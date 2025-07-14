import { Request, Response } from "express";
import * as service from "./service";
import { AddCartDto, UpdateCartDto } from "./dto";

export const getCart = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const items = await service.getCart(userId);
  res.json({ data: items });
};

export const addItem = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { productId, quantity } = AddCartDto.parse(req.body);
  const item = await service.addItem(userId, productId, quantity);
  res.status(201).json({ data: item });
};

export const updateQty = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const productId = Number(req.params.id);
  const { quantity } = UpdateCartDto.parse(req.body);
  const item = await service.updateQty(userId, productId, quantity);
  res.json({ data: item });
};

export const removeItem = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const productId = Number(req.params.id);
  await service.removeItem(userId, productId);
  res.status(204).send();
};

export const clearCart = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  await service.clearCart(userId);
  res.status(204).send();
};
