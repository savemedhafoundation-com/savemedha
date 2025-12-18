import crypto from "crypto";

const RAZORPAY_ORDERS_URL = "https://api.razorpay.com/v1/orders";

const readJsonBody = async (req) => {
  if (req?.body && typeof req.body === "object") return req.body;
  if (typeof req?.body === "string" && req.body.trim()) return JSON.parse(req.body);

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  const text = Buffer.concat(chunks).toString("utf8");
  return text.trim() ? JSON.parse(text) : {};
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const keyId = process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return res.status(500).json({
      error:
        "Missing Razorpay credentials (set RAZORPAY_KEY_ID (or VITE_RAZORPAY_KEY_ID) and RAZORPAY_KEY_SECRET).",
    });
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  const amountInput = body?.amount;
  const currency = (body?.currency || "INR").toUpperCase();

  const amount = Number.parseInt(String(amountInput ?? ""), 10);
  if (!Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  const smallestUnitAmount = amount * 100;
  const receipt = `smf_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;

  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

  const response = await fetch(RAZORPAY_ORDERS_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: smallestUnitAmount,
      currency,
      receipt,
      notes: body?.notes || undefined,
    }),
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    return res.status(response.status).json({
      error: "Failed to create Razorpay order",
      details: data,
    });
  }

  return res.status(200).json({
    keyId,
    orderId: data?.id,
    amount: data?.amount,
    currency: data?.currency,
    receipt: data?.receipt,
  });
}
