import { Request, Response } from "express";
import * as service from "./service";
import { AddWishlistDto } from "./dto";

export const getWishlist = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const items = await service.getWishlist(userId);
  res.json({ data: items });
};

export const addItem = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { productId } = AddWishlistDto.parse(req.body);
  const item = await service.addItem(userId, productId);
  res.status(201).json({ data: item });
};

export const removeItem = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const productId = Number(req.params.id);
  await service.removeItem(userId, productId);
  res.status(204).send();
};
