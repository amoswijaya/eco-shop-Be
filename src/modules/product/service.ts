import prisma from "../../lib/prisma";
import { CreateProductDto, UpdateProductDto } from "./dto";

export const createProduct = (data: CreateProductDto) =>
  prisma.product.create({ data });

export const getProducts = async (
  page: number,
  limit: number,
  search?: string,
  categoryId?: number
) => {
  const where: any = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  if (categoryId) {
    where.categoryId = categoryId;
  }

  const [data, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      include: { category: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return { data, pagination: { total, totalPages, page, limit } };
};
export const getProductById = (id: number) =>
  prisma.product.findUnique({ where: { id }, include: { category: true } });

export const updateProduct = (id: number, data: UpdateProductDto) =>
  prisma.product.update({ where: { id }, data });

export const deleteProduct = (id: number) =>
  prisma.product.delete({ where: { id } });
