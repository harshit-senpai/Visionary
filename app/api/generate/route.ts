import { requestData } from "@/schema";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Together from "together-ai";

let rateLimit: Ratelimit | undefined;

if (process.env.UPSTASH_REDIS_REST_URL) {
  rateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.fixedWindow(100, "1440 m"),
    analytics: true,
    prefix: "visinory",
  });
}

export async function POST(req: Request) {
  let json = await req.json();
  let parsedData = requestData.safeParse(json);

  type TogetherConstructorProps = ConstructorParameters<typeof Together>;
  let options: TogetherConstructorProps[0] = {};

  if (process.env.HELICONE_API_KEY) {
    options.baseURL = "https://together.helicone.ai/v1";
    options.defaultHeaders = {
      "Helicone-Auth": `Bearer ${process.env.HELICONE_API_KEY}`,
      "Helicone-Property-BYOK": parsedData.data?.userAPIKey ? "true" : "false",
    };
  }

  const client = new Together(options);

  if (parsedData.data?.userAPIKey) {
    client.apiKey = parsedData.data?.userAPIKey;
  }

  if (rateLimit && !parsedData.data?.userAPIKey) {
    const identifier = await getIPAddress();

    const { success } = await rateLimit.limit(identifier);

    if (!success) {
      return NextResponse.json(
        "No request left, add your own API keys or try after 24 hrs",
        { status: 429 }
      );
    }
  }

  let response;

  try {
    response = await client.images.create({
      prompt: parsedData.data?.prompt!,
      model: "black-forest-labs/FLUX.1-schnell-Free",
      width: 1024,
      height: 768,
      seed: parsedData.data?.iterativeMode ? 123 : undefined,
      // @ts-ignore
      response_format: "base64",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.toString() }, { status: 500 });
  }

  return NextResponse.json(response.data[0]);
}

async function getIPAddress() {
  const FALLBACK_IP_ADDRESS = "0.0.0.0";
  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0] ?? FALLBACK_IP_ADDRESS;
  }

  return headerList.get("x-real-ip") ?? FALLBACK_IP_ADDRESS;
}
