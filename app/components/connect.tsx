'use client'
import { cache, use } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-aria-components'
import { codeToHtml } from 'shiki'
import { transformerMetaHighlight } from '@shikijs/transformers'
import * as prettier from 'prettier/standalone'
import ts from 'prettier/plugins/typescript'
import es from 'prettier/plugins/estree'
import html from 'prettier/plugins/html'
import type { Modification } from 'bannerify-js'
import { FileHeader } from '@/app/components/file-header'
import { toast } from 'sonner'
import { LinesAndColumns } from 'lines-and-columns'
import { focusSafely } from '@react-aria/focus'

const formatCode = cache(async (code: string, parser = "typescript") => {
  return prettier.format(code, {
    semi: false,
    parser,
    printWidth: 60,
    plugins: [ts, es, html],
  })
})

const highlightCode = cache(async (code: string, lang = "typescript", hightlight = "") => {
  return codeToHtml(code, {
    lang,
    theme: "github-light",
    transformers: [transformerMetaHighlight({ className: "bg-gray-200 inline-block w-full py-1" })],
    meta: {
      __raw: hightlight,
    },
  })
})

export const Connect = ({
  templateName,
  modifications,
}: {
  templateName: string
  modifications: Modification[]
}) => {
  const nextjsSnippet = `
    import ogcool from 'ogcool'
    import type { Metadata } from 'next'

    export const metadata: Metadata = {
      openGraph: {
        images: [ogcool("${templateName}", { modifications: ${JSON.stringify(modifications)} })],
      }
    }
     
    export default function Page() {}
  `
  const quickStartSnippet = `
    import ogcool from 'ogcool'
    
    ogcool("${templateName}", { modifications: ${JSON.stringify(modifications)} })
  `
  const astroSnippet = `
      <html lang="en">
        <head>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <meta property="og:title" content="My website"/>
          <meta property="og:description" content=""/>
          <meta property="og:url" content="https://example.com"/>
          <meta property="og:image" content={ogcool("${templateName}", { modifications: ${JSON.stringify(
            modifications,
          )} })}/>
        </head>
        <body>
          <slot />
        </body>
      </html>
    `

  const nuxtjsSnippet = `
  <script setup lang="ts">
    useSeoMeta({
      title: 'My Amazing Site',
      ogTitle: 'My Amazing Site',
      description: 'This is my amazing site, let me tell you all about it.',
      ogDescription: 'This is my amazing site, let me tell you all about it.',
      ogImage: ogcool("${templateName}", { modifications: ${JSON.stringify(modifications)} }),
      twitterCard: 'summary_large_image',
    })
    </script>
  `

  const remixSnippet = `export const meta: MetaFunction<typeof loader> = ({
  data,
}) => {
  return [
    { title: "Website title" },
    {
      property: "og:image",
      content: ogcool("${templateName}", { modifications: ${JSON.stringify(modifications)} }),
    },
  ]
}`

  return (
    <div className="flex gap-2 flex-col py-4">
      <p className="text-sm text-slate-800 font-normal pb-2 flex gap-2">
        Install the SDK using npm or yarn:
        <button
          type="button"
          className="cursor-pointer bg-transparent flex gap-1"
          onClick={async () => {
            await navigator.clipboard.writeText("npm install ogcool")
            toast("Copied to clipboard")

          }}
          dangerouslySetInnerHTML={{
            __html: '$ ' + use(
              codeToHtml("npm install ogcool", {
                lang: "shellscript",
                theme: "github-light",
              }),
            ),
          }}
        />
      </p>
      <Tabs className="rounded-xl border border-slate-6">
        <TabList aria-label="sdk" className="relative flex gap-4 overflow-x-auto rounded-t-xl p-4">
          <Tab
            className="inline-flex cursor-pointer select-none items-center text-sm font-semibold hover:bg-slate-5 data-[selected=true]:bg-slate-200 text-slate-600 data-[selected=true]:text-slate-700 h-[22px] rounded px-2"
            id="quickstart"
            ref={el => {
              if (el) {
                focusSafely(el)
              }
            }}
          >
            Quick Start
          </Tab>
          <Tab
            className="inline-flex cursor-pointer select-none items-center text-sm font-semibold hover:bg-slate-5 data-[selected=true]:bg-slate-200 text-slate-600 data-[selected=true]:text-slate-700 h-[22px] rounded px-2"
            id="nextjs"
          >
            Next.js
          </Tab>
          <Tab
            className="inline-flex cursor-pointer select-none items-center text-sm font-semibold hover:bg-slate-5 data-[selected=true]:bg-slate-200 text-slate-600 data-[selected=true]:text-slate-700 h-[22px] rounded px-2"
            id="remix"
          >
            Remix
          </Tab>
          <Tab
            className="inline-flex cursor-pointer select-none items-center text-sm font-semibold hover:bg-slate-5 data-[selected=true]:bg-slate-200 text-slate-600 data-[selected=true]:text-slate-700 h-[22px] rounded px-2"
            id="astro"
          >
            Astro
          </Tab>
          <Tab
            className="inline-flex cursor-pointer select-none items-center text-sm font-semibold hover:bg-slate-5 data-[selected=true]:bg-slate-200 text-slate-600 data-[selected=true]:text-slate-700 h-[22px] rounded px-2"
            id="nuxtjs"
          >
            Nuxt.js
          </Tab>
        </TabList>
        <TabPanel
          id="quickstart"
          className="border-t border-slate-6 outline-none w-full overflow-hidden"
        >
          <FileHeader name="index.ts" content={use(formatCode(quickStartSnippet))} />
          <div
            className="relative z-20 w-full overflow-hidden h-full rounded-br-3xl !rounded-b-xl p-4"
            dangerouslySetInnerHTML={{
              __html: use(formatCode(quickStartSnippet).then(highlightCode)),
            }}
          />
        </TabPanel>
        <TabPanel
          id="nextjs"
          className="border-t border-slate-6 outline-none w-full overflow-hidden"
        >
          <FileHeader name="app/mypage/page.tsx" content={use(formatCode(nextjsSnippet))} />
          <div
            className="relative z-20 w-full overflow-hidden h-full rounded-br-3xl !rounded-b-xl p-4"
            dangerouslySetInnerHTML={{
              __html: use(formatCode(nextjsSnippet).then(highlightCode)),
            }}
          />
        </TabPanel>
        <TabPanel
          id="remix"
          className="border-t border-slate-6 outline-none w-full overflow-hidden"
        >
          <FileHeader name="app/routes/index.tsx" content={use(formatCode(remixSnippet))} />
          <div
            className="relative z-20 w-full overflow-hidden h-full rounded-br-3xl !rounded-b-xl p-4"
            dangerouslySetInnerHTML={{
              __html: use(formatCode(remixSnippet).then(highlightCode)),
            }}
          />
        </TabPanel>
        <TabPanel id="astro">
          <FileHeader
            icon="astro"
            name="src/layouts/Layout.astro"
            content={use(formatCode(astroSnippet, "typescript").then((e) => e.slice(1)))}
          />
          <div
            className="relative z-20 w-full overflow-hidden h-full rounded-br-3xl !rounded-b-xl p-4"
            dangerouslySetInnerHTML={{
              __html: use(
                formatCode(astroSnippet, "typescript")
                  .then((e) => `---\nconst { title } = Astro.props;\n---\n${e.slice(1)}`)
                  .then((c) => {
                    const lines = new LinesAndColumns(c)
                    const start = c.lastIndexOf("<meta")
                    const end = c.lastIndexOf("    />")
                    return highlightCode(
                      c,
                      "astro",
                      `{${lines.locationForIndex(start)!.line + 1}-${
                        lines.locationForIndex(end)!.line + 1
                      }}`,
                    )
                  }),
              ),
            }}
          />
        </TabPanel>
        <TabPanel id="nuxtjs">
          <FileHeader icon="vue" name="app.vue" content={use(formatCode(nuxtjsSnippet, "vue"))} />
          <div
            className="relative z-20 w-full overflow-hidden h-full rounded-br-3xl !rounded-b-xl p-4"
            dangerouslySetInnerHTML={{
              __html: use(formatCode(nuxtjsSnippet, "vue").then((e) => highlightCode(e, "vue"))),
            }}
          />
        </TabPanel>
      </Tabs>
    </div>
  )
}
