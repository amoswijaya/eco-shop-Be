import prisma from "../../lib/prisma";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto";

export const createCategory = (data: CreateCategoryDto) =>
  prisma.category.create({ data });

export const getCategories = () =>
  prisma.category.findMany({ orderBy: { name: "asc" } });

export const getCategoryById = (id: number) =>
  prisma.category.findUnique({ where: { id } });

export const updateCategory = (id: number, data: UpdateCategoryDto) =>
  prisma.category.update({ where: { id }, data });

export const deleteCategory = (id: number) =>
  prisma.category.delete({ where: { id } });
