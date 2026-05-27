import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { randomUUID } from "node:crypto";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { filename, contentType } = req.body as {
      filename: string;
      contentType: string;
    };

    if (!filename || !contentType) {
      return res.status(400).json({
        error: "filename and contentType are required",
      });
    }

    if (!ALLOWED_TYPES.includes(contentType)) {
      return res.status(400).json({
        error: "File type not allowed",
      });
    }

    // 🔥 CREAR CLIENTE AQUÍ (NO GLOBAL)
    const s3 = new S3Client({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    const BUCKET = process.env.AWS_S3_BUCKET;

    if (!BUCKET) {
      throw new Error("S3_BUCKET missing");
    }

    const key = `products/${randomUUID()}-${filename}`;

    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      ContentType: contentType,
    });

    const url = await getSignedUrl(s3, command, {
      expiresIn: 600,
    });

    const publicUrl = `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    return res.status(200).json({
      url,
      key,
      publicUrl,
    });
  } catch (error) {
    console.error("[presign] failed", error);

    return res.status(500).json({
      error: "No se pudo generar la URL firmada",
    });
  }
}
