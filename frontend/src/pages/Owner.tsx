import { useEffect, useState } from "react";
import { api } from "../api/client";
import { Loading, Notice } from "../components/Feedback";
import { Page } from "./Admin";

type Sentiment = "HAPPY" | "NEUTRAL" | "UNHAPPY" | "NO_COMMENT";
type Rater = { userId: string; name: string; email: string; rating: number; comment?: string | null; sentiment: Sentiment; ratedAt: string };
type Data = { storeName: string; averageRating: number; totalRatings: number; sentimentSummary: { happy: number; neutral: number; unhappy: number }; raters: Rater[] };
const sentimentCopy: Record<Sentiment, string> = { HAPPY: "Happy", NEUTRAL: "Neutral", UNHAPPY: "Unhappy", NO_COMMENT: "No comment" };

export default function OwnerDashboard() {
  const [data, setData] = useState<Data>();
  const [error, setError] = useState("");
  useEffect(() => { api<Data>("/owner/dashboard").then(setData).catch((e: Error) => setError(e.message)); }, []);
  if (error) return <Page title="Store overview" subtitle="Your customer feedback at a glance."><Notice message={error} /></Page>;
  if (!data) return <Loading />;
  return <Page title={data.storeName} subtitle="Understand the sentiment behind every rating.">
    <div className="metric-grid">
      <article className="metric-card"><p>Average rating</p><strong>★ {data.averageRating.toFixed(2)}</strong><span>Across all feedback</span></article>
      <article className="metric-card"><p>Total ratings</p><strong>{data.totalRatings}</strong><span>Customer responses</span></article>
      <article className="metric-card"><p>Happy customers</p><strong>{data.sentimentSummary.happy}</strong><span>{data.sentimentSummary.neutral} neutral · {data.sentimentSummary.unhappy} unhappy</span></article>
    </div>
    <section className="table-card"><div className="section-title"><div><p className="eyebrow">SENTIMENT INSIGHTS</p><h2>Customer feedback</h2></div><span className="sentiment-key">Happy / Neutral / Unhappy</span></div>
      <table><thead><tr><th>Customer</th><th>Rating</th><th>Comment</th><th>Customer sentiment</th><th>Submitted</th></tr></thead><tbody>{data.raters.map((r) => <tr key={r.userId}><td><strong>{r.name}</strong><small>{r.email}</small></td><td><span className="rating-pill">★ {r.rating}</span></td><td>{r.comment || "No written comment"}</td><td><span className={`sentiment-badge ${r.sentiment.toLowerCase()}`}>{sentimentCopy[r.sentiment]}</span></td><td>{new Date(r.ratedAt).toLocaleDateString()}</td></tr>)}</tbody></table>
      {!data.raters.length && <p className="empty">No ratings yet. Customer sentiment will appear here.</p>}
    </section>
  </Page>;
}
