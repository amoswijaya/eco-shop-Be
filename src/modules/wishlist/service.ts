import prisma from "../../lib/prisma";

export const getWishlist = (userId: number) =>
  prisma.wishlistItem.findMany({
    where: { userId },
    include: { product: { include: { category: true } } },
    orderBy: { createdAt: "desc" },
  });

export const addItem = (userId: number, productId: number) =>
  prisma.wishlistItem.upsert({
    where: { userId_productId: { userId, productId } },
    update: {},
    create: { userId, productId },
  });

export const removeItem = (userId: number, productId: number) =>
  prisma.wishlistItem.delete({
    where: { userId_productId: { userId, productId } },
  });
