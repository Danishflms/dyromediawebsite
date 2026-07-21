import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = { _type?: string };

/**
 * Sanity calls this the moment a document is published (see the webhook
 * setup instructions). It revalidates the Next.js cache for that content
 * type only, so the change appears on the live site within seconds —
 * without a full rebuild.
 */
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      return new Response("Invalid signature", { status: 401 });
    }
    if (!body?._type) {
      return new Response("Missing _type in webhook payload", { status: 400 });
    }

    revalidateTag(body._type, "max");
    return NextResponse.json({ revalidated: true, type: body._type, now: Date.now() });
  } catch (err) {
    console.error("[sanity webhook] revalidation failed:", err);
    return new Response((err as Error).message, { status: 500 });
  }
}
