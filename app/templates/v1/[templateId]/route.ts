import assert from "node:assert"
import { type Modification, createClient } from "bannerify-js"
import type { NextRequest } from "next/server"

const client = createClient({
  apiKey: "",
  // baseUrl: 'http://localhost:8788/api/v1',
})

// export const runtime = "edge"
export const dynamic = "force-dynamic" // defaults to auto
export async function GET(request: NextRequest, ctx: { params: { templateId: string } }) {
  const searchParams = request.nextUrl.searchParams
  const d = searchParams.get("d")
  const { modifications = [], format = "png" } = d
    ? (JSON.parse(atob(d)) as {
        modifications?: Modification[]
        format?: "svg" | "png"
      })
    : {}
  assert(Array.isArray(modifications) || typeof modifications === "undefined")
  return new Response(null, {
    headers: {
      Location: await client.generateImageSignedUrl(ctx.params.templateId, {
        modifications,
        format,
      }),
    },
    status: 302,
  })
}
