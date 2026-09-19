export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/data") {
      const key = env.TWELVE_DATA_API_KEY;
      if (!key) return Response.json({error:"API key is not configured on the server."},{status:500});
      const symbol = url.searchParams.get("symbol") || "EUR/JPY";
      const interval = url.searchParams.get("interval") || "1min";
      const allowed = ["1min","5min","15min","30min","1h","4h","1day"];
      if (!allowed.includes(interval)) return Response.json({error:"Invalid timeframe"},{status:400});
      const api = "https://api.twelvedata.com/time_series?symbol="+encodeURIComponent(symbol)+"&interval="+interval+"&outputsize=60&apikey="+encodeURIComponent(key);
      try {
        const r = await fetch(api, {headers:{"accept":"application/json"}});
        return new Response(await r.text(), {
          status:r.status,
          headers:{"content-type":"application/json","cache-control":"no-store"}
        });
      } catch {
        return Response.json({error:"Market data request failed."},{status:502});
      }
    }
    return env.ASSETS.fetch(request);
  }
};