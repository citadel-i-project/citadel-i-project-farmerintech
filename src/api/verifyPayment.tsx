import type { NextApiRequest, NextApiResponse } from "next";

type VerifyResponse = {
  success: boolean;
  data?: any; // you can type this more strictly if you know Paystack's response shape
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VerifyResponse>
) {
  if (req.method !== "POST") return res.status(405).end();

  const { reference } = req.body;

  if (!reference) {
    return res.status(400).json({ success: false, message: "Reference is required" });
  }

  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });

    const data = await response.json();

    if (data.status && data.data.status === "success") {
      res.status(200).json({ success: true, data: data.data });
    } else {
      res.status(400).json({ success: false, message: "Payment was not successful" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Payment verification failed" });
  }
}
