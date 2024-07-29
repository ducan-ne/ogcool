import assert from 'node:assert'
import * as crypto from 'node:crypto'
import { BaselimeLogger } from '@baselime/edge-logger'
import { Bannerify, type Modification } from 'bannerify-js'
import type { NextRequest } from 'next/server'

const client = new Bannerify(process.env.BANNERIFY_KEY as string)

// export const runtime = "edge"
export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: NextRequest, ctx: { params: { templateId: string } }) {
  const logger = new BaselimeLogger({
    ctx: {
      waitUntil: async () => {},
    },
    apiKey: process.env.BASELIME_KEY as string,
    service: 'ogcool',
    dataset: 'prod',
    namespace: 'imagemate',
    requestId: crypto.randomUUID(),
  })
  const searchParams = request.nextUrl.searchParams
  const d = searchParams.get('d')
  const { modifications = [], format = 'png' } = d
    ? (JSON.parse(atob(d)) as {
        modifications?: Modification[]
        format?: 'svg' | 'png'
      })
    : {}
  assert(Array.isArray(modifications) || typeof modifications === 'undefined')
  if (process.env.BASELIME_KEY) {
    logger.info('GET /templates/v1/[templateId]', {
      templateId: ctx.params.templateId,
      sdk: searchParams.get('sdk'),
      format,
    })
    logger.flush()
  }
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
