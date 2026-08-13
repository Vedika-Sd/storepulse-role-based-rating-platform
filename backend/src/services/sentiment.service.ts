import Sentiment from "sentiment";

const analyzer = new Sentiment();

export type SentimentLabel = "HAPPY" | "NEUTRAL" | "UNHAPPY" | "NO_COMMENT";

// Returns a normalized score roughly between -1 (very negative) and 1 (very positive)
export function analyzeSentiment(text?: string): number | null {
  if (!text || text.trim().length === 0) return null;
  const result = analyzer.analyze(text);
  const wordCount = text.trim().split(/\s+/).length;
  const normalized = wordCount > 0 ? result.score / wordCount : 0;
  return Math.max(-1, Math.min(1, Number(normalized.toFixed(2))));
}

// Turns the ML/library score into language that a store owner can act on.
export function getSentimentLabel(score: number | null): SentimentLabel {
  if (score === null) return "NO_COMMENT";
  if (score > 0.1) return "HAPPY";
  if (score < -0.1) return "UNHAPPY";
  return "NEUTRAL";
}
