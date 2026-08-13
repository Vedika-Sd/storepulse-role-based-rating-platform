import { Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../config/db";
import { AuthRequest } from "../middleware/auth";

const SALT_ROUNDS = 10;

// ---- Dashboard ----
export async function getDashboard(req: AuthRequest, res: Response) {
  try {
    const [totalUsers, totalStores, totalRatings] = await Promise.all([
      prisma.user.count(),
      prisma.store.count(),
      prisma.rating.count(),
    ]);
    return res.json({ totalUsers, totalStores, totalRatings });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// ---- Create a normal user or admin ----
export async function createUser(req: AuthRequest, res: Response) {
  try {
    const { name, email, address, password, role } = req.body;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      return res.status(409).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await prisma.user.create({
      data: { name, email, address, password: hashedPassword, role },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
        createdAt: true,
      },
    });

    return res.status(201).json({ message: "User created", user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// ---- Create a store, along with its owner account, in one atomic transaction ----
export async function createStore(req: AuthRequest, res: Response) {
  try {
    const {
      storeName,
      storeEmail,
      storeAddress,
      ownerName,
      ownerEmail,
      ownerPassword,
    } = req.body;

    const [existingStoreEmail, existingOwnerEmail] = await Promise.all([
      prisma.store.findUnique({ where: { email: storeEmail } }),
      prisma.user.findUnique({ where: { email: ownerEmail } }),
    ]);
    if (existingStoreEmail)
      return res.status(409).json({ message: "Store email already in use" });
    if (existingOwnerEmail)
      return res.status(409).json({ message: "Owner email already in use" });

    const hashedPassword = await bcrypt.hash(ownerPassword, SALT_ROUNDS);

    const result = await prisma.$transaction(async (tx) => {
      const owner = await tx.user.create({
        data: {
          name: ownerName,
          email: ownerEmail,
          address: storeAddress,
          password: hashedPassword,
          role: "STORE_OWNER",
        },
      });
      const store = await tx.store.create({
        data: {
          name: storeName,
          email: storeEmail,
          address: storeAddress,
          ownerId: owner.id,
        },
      });
      return { owner, store };
    });

    return res.status(201).json({
      message: "Store and owner created",
      store: result.store,
      owner: {
        id: result.owner.id,
        name: result.owner.name,
        email: result.owner.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// ---- List users (admin + normal), with filter + sort ----
export async function listUsers(req: AuthRequest, res: Response) {
  try {
    const { name, email, address, role, sortBy, order } = req.query as Record<
      string,
      string
    >;

    const users = await prisma.user.findMany({
      where: {
        role: role
          ? (role as any)
          : { in: ["ADMIN", "NORMAL_USER", "STORE_OWNER"] },
        name: name ? { contains: name, mode: "insensitive" } : undefined,
        email: email ? { contains: email, mode: "insensitive" } : undefined,
        address: address
          ? { contains: address, mode: "insensitive" }
          : undefined,
      },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
        createdAt: true,
      },
      orderBy: { [sortBy || "createdAt"]: order === "desc" ? "desc" : "asc" },
    });

    return res.json({ users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// ---- List stores, with average rating, filter + sort ----
export async function listStores(req: AuthRequest, res: Response) {
  try {
    const { name, email, address, sortBy, order } = req.query as Record<
      string,
      string
    >;

    const stores = await prisma.store.findMany({
      where: {
        name: name ? { contains: name, mode: "insensitive" } : undefined,
        email: email ? { contains: email, mode: "insensitive" } : undefined,
        address: address
          ? { contains: address, mode: "insensitive" }
          : undefined,
      },
      include: {
        ratings: { select: { value: true } },
        owner: { select: { id: true, name: true, email: true } },
      },
      orderBy:
        sortBy && sortBy !== "rating"
          ? { [sortBy]: order === "desc" ? "desc" : "asc" }
          : undefined,
    });

    const withAvg = stores.map((s) => {
      const avg = s.ratings.length
        ? s.ratings.reduce((sum, r) => sum + r.value, 0) / s.ratings.length
        : 0;
      const { ratings, ...rest } = s;
      return { ...rest, averageRating: Number(avg.toFixed(2)) };
    });

    if (sortBy === "rating") {
      withAvg.sort((a, b) =>
        order === "desc"
          ? b.averageRating - a.averageRating
          : a.averageRating - b.averageRating,
      );
    }

    return res.json({ stores: withAvg });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// ---- Get single user detail (includes rating if STORE_OWNER) ----
export async function getUserDetail(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
        createdAt: true,
        ownedStore: { include: { ratings: { select: { value: true } } } },
      },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    let averageRating: number | null = null;
    if (user.role === "STORE_OWNER" && user.ownedStore) {
      const ratings = user.ownedStore.ratings;
      averageRating = ratings.length
        ? Number(
            (ratings.reduce((s, r) => s + r.value, 0) / ratings.length).toFixed(
              2,
            ),
          )
        : 0;
    }

    const { ownedStore, ...rest } = user;
    return res.json({
      user: { ...rest, ...(averageRating !== null ? { averageRating } : {}) },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
