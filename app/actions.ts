'use server'

import { codeToHtml } from 'shiki'
import { transformerMetaHighlight } from '@shikijs/transformers'

export async function _hightlightCode(code: string) {
  return codeToHtml(code, {
    lang: 'typescript',
    theme: "github-light",
    transformers: [
      transformerMetaHighlight({ className: "bg-gray-200 inline-block w-full py-1" }),
      // transformerTwoslash(),
    ],
    meta: {
    },
  })
}