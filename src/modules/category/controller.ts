import { Request, Response } from "express";
import * as service from "./service";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto";

export const createCategory = async (req: Request, res: Response) => {
  const data = CreateCategoryDto.parse(req.body);
  const category = await service.createCategory(data);
  res.status(201).json({ data: category });
};

export const getCategories = async (_req: Request, res: Response) => {
  const categories = await service.getCategories();
  res.json({ data: categories });
};

export const getCategoryById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const category = await service.getCategoryById(id);
  if (!category) return res.status(404).json({ error: "Not found" });
  res.json({ data: category });
};

export const updateCategory = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const data = UpdateCategoryDto.parse(req.body);
  const category = await service.updateCategory(id, data);
  res.json({ data: category });
};

export const deleteCategory = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await service.deleteCategory(id);
  res.status(204).send();
};
