import prisma from "../../lib/prisma";

export const getCart = (userId: number) =>
  prisma.cartItem.findMany({
    where: { userId },
    include: { product: { include: { category: true } } },
    orderBy: { updatedAt: "desc" },
  });

export const addItem = (userId: number, productId: number, qty: number) =>
  prisma.cartItem.upsert({
    where: { userId_productId: { userId, productId } },
    update: { quantity: { increment: qty } },
    create: { userId, productId, quantity: qty },
  });

export const updateQty = (userId: number, productId: number, qty: number) =>
  prisma.cartItem.update({
    where: { userId_productId: { userId, productId } },
    data: { quantity: qty },
  });

export const removeItem = (userId: number, productId: number) =>
  prisma.cartItem.delete({
    where: { userId_productId: { userId, productId } },
  });

export const clearCart = (userId: number) =>
  prisma.cartItem.deleteMany({ where: { userId } });
