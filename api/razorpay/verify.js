import crypto from "crypto";

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

  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return res.status(500).json({
      error: "Missing Razorpay secret (set RAZORPAY_KEY_SECRET).",
    });
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  const orderId = body?.orderId || body?.razorpay_order_id;
  const paymentId = body?.paymentId || body?.razorpay_payment_id;
  const signature = body?.signature || body?.razorpay_signature;

  if (!orderId || !paymentId || !signature) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const payload = `${orderId}|${paymentId}`;
  const expected = crypto.createHmac("sha256", keySecret).update(payload).digest("hex");

  const expectedBuf = Buffer.from(expected, "utf8");
  const signatureBuf = Buffer.from(String(signature), "utf8");

  const ok =
    expectedBuf.length === signatureBuf.length &&
    crypto.timingSafeEqual(expectedBuf, signatureBuf);

  if (!ok) {
    return res.status(400).json({ ok: false });
  }

  return res.status(200).json({ ok: true });
}

