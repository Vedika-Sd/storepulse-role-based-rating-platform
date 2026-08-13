export type Role = "ADMIN" | "NORMAL_USER" | "STORE_OWNER";
export type User = { id: string; name: string; email: string; role: Role; address?: string };
export type Store = { id: string; name: string; email?: string; address: string; averageRating: number; myRating?: number | null; ownerId?: string | null; owner?: Pick<User, "id" | "name" | "email"> | null };
export type ApiError = { message?: string; errors?: Record<string, string[]> };
