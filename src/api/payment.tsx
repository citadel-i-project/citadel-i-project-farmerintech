import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  success: boolean;
  reference?: string;
  publicKey?: string;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") return res.status(405).end();

  const { amount, email, name } = req.body;

  try {
    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount, // in kobo
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-callback`,//https:citadel-i.com.ng
        metadata: { name },
      }),
    });

    const data = await response.json();

    if (data.status) {
      res.status(200).json({
        success: true,
        reference: data.data.reference,
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      });
    } else {
      res.status(400).json({ success: false, message: data.message });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Payment initialization failed" });
  }
}
