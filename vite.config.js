import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const applyVercelResponseHelpers = (res) => {
  if (typeof res.status === "function" && typeof res.json === "function") return res;

  res.status = (code) => {
    res.statusCode = code;
    return res;
  };

  res.json = (obj) => {
    if (!res.getHeader("Content-Type")) res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(obj));
    return res;
  };

  return res;
};

const razorpayApiDevMiddleware = () => ({
  name: "razorpay-api-dev-middleware",
  apply: "serve",
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      const url = req?.url || "";
      if (!url.startsWith("/api/razorpay/")) return next();

      applyVercelResponseHelpers(res);

      try {
        if (url.startsWith("/api/razorpay/create-order")) {
          const mod = await import("./api/razorpay/create-order.js");
          return mod.default(req, res);
        }

        if (url.startsWith("/api/razorpay/verify")) {
          const mod = await import("./api/razorpay/verify.js");
          return mod.default(req, res);
        }

        return res.status(404).json({ error: "Not found" });
      } catch (error) {
        return res.status(500).json({ error: error?.message || "Server error" });
      }
    });
  },
});

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  Object.assign(process.env, env);

  return {
    plugins: [react(), tailwindcss(), razorpayApiDevMiddleware()],
  };
});
