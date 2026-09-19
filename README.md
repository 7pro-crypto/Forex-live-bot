# Forex Live Signal Bot

Android Chrome-friendly live forex dashboard using Twelve Data.

Features:
- Multiple major forex pairs
- 1m, 5m, 15m, 30m, 1h, 4h, 1day
- Live price
- Candlestick close-price trend chart
- LIVE BUY / LIVE SELL / WAIT heuristic
- API key kept server-side

Deploy with Cloudflare Workers + Assets.
Set the secret `TWELVE_DATA_API_KEY` in the Worker environment. Never put the key in GitHub or index.html.
