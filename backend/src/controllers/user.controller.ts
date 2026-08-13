import { Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../config/db";
import { AuthRequest } from "../middleware/auth";
import { analyzeSentiment } from "../services/sentiment.service";

// ---- Browse/search stores, with this user's own rating attached ----
export async function browseStores(req: AuthRequest, res: Response) {
  try {
    const { name, address } = req.query as Record<string, string>;
    const userId = req.user!.id;

    const stores = await prisma.store.findMany({
      where: {
        name: name ? { contains: name, mode: "insensitive" } : undefined,
        address: address
          ? { contains: address, mode: "insensitive" }
          : undefined,
      },
      include: { ratings: true },
    });

    const result = stores.map((s) => {
      const avg = s.ratings.length
        ? s.ratings.reduce((sum, r) => sum + r.value, 0) / s.ratings.length
        : 0;
      const myRating = s.ratings.find((r) => r.userId === userId);
      return {
        id: s.id,
        name: s.name,
        address: s.address,
        averageRating: Number(avg.toFixed(2)),
        myRating: myRating ? myRating.value : null,
      };
    });

    return res.json({ stores: result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// ---- Submit or update a rating (upsert on the unique userId+storeId pair) ----
export async function submitRating(req: AuthRequest, res: Response) {
  try {
    const userId = req.user!.id;
    const { storeId, value, comment } = req.body;

    const store = await prisma.store.findUnique({ where: { id: storeId } });
    if (!store) return res.status(404).json({ message: "Store not found" });

    const sentimentScore = analyzeSentiment(comment);

    const rating = await prisma.rating.upsert({
      where: { userId_storeId: { userId, storeId } },
      update: { value, comment, sentimentScore },
      create: { userId, storeId, value, comment, sentimentScore },
    });

    return res.json({ message: "Rating saved", rating });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// ---- Change own password ----
export async function changePassword(req: AuthRequest, res: Response) {
  try {
    const userId = req.user!.id;
    const { currentPassword, newPassword } = req.body;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Current password is incorrect" });

    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashed },
    });

    return res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
