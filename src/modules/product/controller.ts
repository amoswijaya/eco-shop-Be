import { Request, Response } from "express";
import * as service from "./service";
import { CreateProductDto, UpdateProductDto } from "./dto";

export const createProduct = async (req: Request, res: Response) => {
  const data = CreateProductDto.parse(req.body);
  const product = await service.createProduct(data);
  res.status(201).json({ data: product });
};

export const getProducts = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = req.query.search as string | undefined;
  const categoryId = req.query.categoryId
    ? Number(req.query.categoryId)
    : undefined;

  const result = await service.getProducts(page, limit, search, categoryId);
  res.json(result);
};

export const getProductById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const product = await service.getProductById(id);
  if (!product) return res.status(404).json({ error: "Not found" });
  res.json({ data: product });
};

export const updateProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const data = UpdateProductDto.parse(req.body);
  const product = await service.updateProduct(id, data);
  res.json({ data: product });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await service.deleteProduct(id);
  res.status(204).send();
};
