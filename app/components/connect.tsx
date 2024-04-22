"use client"
import { FileHeader } from "@/app/components/file-header"
import { focusSafely } from "@react-aria/focus"
import { transformerMetaHighlight } from "@shikijs/transformers"
import type { Modification } from "bannerify-js"
import { LinesAndColumns } from "lines-and-columns"
import es from "prettier/plugins/estree"
import html from "prettier/plugins/html"
import ts from "prettier/plugins/typescript"
import * as prettier from "prettier/standalone"
import { cache, use } from "react"
import { Tab, TabList, TabPanel, Tabs } from "react-aria-components"
import { codeToHtml } from "shiki"
import { toast } from "sonner"

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
          <meta property="og:image" content={image}/>
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
    <div className="flex flex-col gap-2 py-4">
      <p className="flex gap-2 pb-2 font-normal text-slate-800 text-sm">
        Install the SDK using npm or yarn:
        <button
          type="button"
          className="flex cursor-pointer gap-1 bg-transparent"
          onClick={async () => {
            await navigator.clipboard.writeText("npm install ogcool")
            toast("Copied to clipboard")
          }}
          dangerouslySetInnerHTML={{
            __html: `$ ${use(
              codeToHtml("npm install ogcool", {
                lang: "shellscript",
                theme: "github-light",
              }),
            )}`,
          }}
        />
      </p>
      <Tabs className="rounded-xl border border-slate-6">
        <TabList aria-label="sdk" className="relative flex gap-4 overflow-x-auto rounded-t-xl p-4">
          <Tab
            className="inline-flex h-[22px] cursor-pointer select-none items-center rounded px-2 font-semibold text-slate-600 text-sm data-[selected=true]:bg-slate-200 hover:bg-slate-5 data-[selected=true]:text-slate-700"
            id="quickstart"
            ref={(el) => {
              if (el) {
                focusSafely(el)
              }
            }}
          >
            <span className="mr-1">Quick</span>Start
          </Tab>
          <Tab
            className="inline-flex h-[22px] cursor-pointer select-none items-center rounded px-2 font-semibold text-slate-600 text-sm data-[selected=true]:bg-slate-200 hover:bg-slate-5 data-[selected=true]:text-slate-700"
            id="nextjs"
          >
            Next.js
          </Tab>
          <Tab
            className="inline-flex h-[22px] cursor-pointer select-none items-center rounded px-2 font-semibold text-slate-600 text-sm data-[selected=true]:bg-slate-200 hover:bg-slate-5 data-[selected=true]:text-slate-700"
            id="remix"
          >
            Remix
          </Tab>
          <Tab
            className="inline-flex h-[22px] cursor-pointer select-none items-center rounded px-2 font-semibold text-slate-600 text-sm data-[selected=true]:bg-slate-200 hover:bg-slate-5 data-[selected=true]:text-slate-700"
            id="astro"
          >
            Astro
          </Tab>
          <Tab
            className="inline-flex h-[22px] cursor-pointer select-none items-center rounded px-2 font-semibold text-slate-600 text-sm data-[selected=true]:bg-slate-200 hover:bg-slate-5 data-[selected=true]:text-slate-700"
            id="nuxtjs"
          >
            Nuxt.js
          </Tab>
        </TabList>
        <TabPanel
          id="quickstart"
          className="w-full overflow-hidden border-slate-6 border-t outline-none"
        >
          <FileHeader name="index.ts" content={use(formatCode(quickStartSnippet))} />
          <div
            className="!rounded-b-xl relative z-20 h-full w-full overflow-hidden rounded-br-3xl p-4"
            dangerouslySetInnerHTML={{
              __html: use(formatCode(quickStartSnippet).then(highlightCode)),
            }}
          />
        </TabPanel>
        <TabPanel
          id="nextjs"
          className="w-full overflow-hidden border-slate-6 border-t outline-none"
        >
          <FileHeader name="app/mypage/page.tsx" content={use(formatCode(nextjsSnippet))} />
          <div
            className="!rounded-b-xl relative z-20 h-full w-full overflow-hidden rounded-br-3xl p-4"
            dangerouslySetInnerHTML={{
              __html: use(formatCode(nextjsSnippet).then(highlightCode)),
            }}
          />
        </TabPanel>
        <TabPanel
          id="remix"
          className="w-full overflow-hidden border-slate-6 border-t outline-none"
        >
          <FileHeader name="app/routes/index.tsx" content={use(formatCode(remixSnippet))} />
          <div
            className="!rounded-b-xl relative z-20 h-full w-full overflow-hidden rounded-br-3xl p-4"
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
            className="!rounded-b-xl relative z-20 h-full w-full overflow-hidden rounded-br-3xl p-4"
            dangerouslySetInnerHTML={{
              __html: use(
                formatCode(astroSnippet, "typescript")
                  .then(async (e) => {
                    const jsCode = `
                      import ogcool from 'ogcool'
                      const image = ogcool("${templateName}", { modifications: ${JSON.stringify(
                        modifications,
                      )} })
                      const { title } = Astro.props;
                    `
                    return `---\n${await formatCode(jsCode, "typescript")}---\n${e.slice(1)}`
                  })
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
            className="!rounded-b-xl relative z-20 h-full w-full overflow-hidden rounded-br-3xl p-4"
            dangerouslySetInnerHTML={{
              __html: use(formatCode(nuxtjsSnippet, "vue").then((e) => highlightCode(e, "vue"))),
            }}
          />
        </TabPanel>
      </Tabs>
    </div>
  )
}
