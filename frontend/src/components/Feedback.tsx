export function Loading() { return <div className="loading">Loading your workspace…</div>; }
export function Notice({ message, type = "error" }: { message: string; type?: "error" | "success" }) { return <p className={`notice ${type}`}>{message}</p>; }
