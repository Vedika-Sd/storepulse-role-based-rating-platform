import { Response } from "express";
import prisma from "../config/db";
import { AuthRequest } from "../middleware/auth";
import { getSentimentLabel } from "../services/sentiment.service";

export async function getOwnerDashboard(req: AuthRequest, res: Response) {
  try {
    const ownerId = req.user!.id;

    const store = await prisma.store.findUnique({
      where: { ownerId },
      include: {
        ratings: {
          include: { user: { select: { id: true, name: true, email: true } } },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!store)
      return res.status(404).json({ message: "No store found for this owner" });

    const averageRating = store.ratings.length
      ? Number(
          (
            store.ratings.reduce((s, r) => s + r.value, 0) /
            store.ratings.length
          ).toFixed(2),
        )
      : 0;

    const raters = store.ratings.map((r) => ({
      userId: r.user.id,
      name: r.user.name,
      email: r.user.email,
      rating: r.value,
      comment: r.comment,
      sentimentScore: r.sentimentScore,
      sentiment: getSentimentLabel(r.sentimentScore),
      ratedAt: r.createdAt,
    }));

    return res.json({
      storeName: store.name,
      averageRating,
      totalRatings: store.ratings.length,
      sentimentSummary: {
        happy: raters.filter((r) => r.sentiment === "HAPPY").length,
        neutral: raters.filter((r) => r.sentiment === "NEUTRAL").length,
        unhappy: raters.filter((r) => r.sentiment === "UNHAPPY").length,
      },
      raters,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
