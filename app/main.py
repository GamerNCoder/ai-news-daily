"""AI News Daily — RSS ingest + interest keywords + JSON API.

Email sending is intentionally not wired here: use Resend/SendGrid in production
with confirmed opt-in (see README).
"""

from __future__ import annotations

import re
from typing import Annotated

import feedparser
import httpx
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(title="AI News Daily", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Public RSS feeds (respect each site's ToS when scaling).
FEEDS = [
    ("Hacker News — AI", "https://hnrss.org/newest?q=AI&count=40"),
    ("arXiv — cs.AI", "http://export.arxiv.org/rss/cs.AI"),
    ("MIT Tech Review", "https://www.technologyreview.com/feed/"),
]


class Article(BaseModel):
    source: str
    title: str
    link: str
    summary: str = ""
    score: float = 0.0


class DigestResponse(BaseModel):
    interests: list[str]
    articles: list[Article]


def tokenize(text: str) -> set[str]:
    return {w.lower() for w in re.findall(r"[A-Za-z0-9]+", text) if len(w) > 2}


def score_article(title: str, summary: str, interests: set[str]) -> float:
    blob = f"{title} {summary}"
    words = tokenize(blob)
    if not interests:
        return 0.0
    hits = len(words & interests)
    return hits + 0.1 * len(re.findall(r"\bAI\b|\bML\b|\bLLM\b|\bGPT\b", blob, re.I))


async def fetch_feed(client: httpx.AsyncClient, name: str, url: str) -> list[Article]:
    out: list[Article] = []
    try:
        r = await client.get(url, timeout=20.0)
        r.raise_for_status()
    except Exception:
        return out
    parsed = feedparser.parse(r.text)
    for e in parsed.entries[:25]:
        title = getattr(e, "title", "") or ""
        link = getattr(e, "link", "") or ""
        summary = ""
        if hasattr(e, "summary"):
            summary = re.sub("<[^<]+?>", "", e.summary)[:400]
        elif hasattr(e, "description"):
            summary = re.sub("<[^<]+?>", "", e.description)[:400]
        out.append(Article(source=name, title=title, link=link, summary=summary))
    return out


@app.get("/health")
async def health():
    return {"ok": True}


@app.get("/digest", response_model=DigestResponse)
async def digest(
    interests: Annotated[str, Query(description="Comma-separated keywords, e.g. robotics,agents,safety")] = "ai,machine learning,agents",
):
    raw = [i.strip() for i in interests.split(",") if i.strip()]
    interest_set = tokenize(" ".join(raw))

    articles: list[Article] = []
    async with httpx.AsyncClient(headers={"User-Agent": "ai-news-daily/0.1 (portfolio)"}) as client:
        for name, url in FEEDS:
            articles.extend(await fetch_feed(client, name, url))

    for a in articles:
        a.score = score_article(a.title, a.summary, interest_set)

    articles.sort(key=lambda x: x.score, reverse=True)
    top = [a for a in articles if a.score > 0][:30]
    if not top:
        top = articles[:15]

    return DigestResponse(interests=raw, articles=top)


class EmailPreview(BaseModel):
    """Document shape for a future transactional email (do not send without opt-in)."""

    subject: str = Field(..., example="Your AI news digest")
    body_preview: str


@app.get("/email-preview", response_model=EmailPreview)
async def email_preview(interests: str = "ai,safety"):
    d = await digest(interests=interests)
    lines = [f"- {a.title} ({a.source})" for a in d.articles[:8]]
    body = "Top stories:\n" + "\n".join(lines)
    return EmailPreview(subject="Your AI news digest (preview)", body_preview=body[:2000])
