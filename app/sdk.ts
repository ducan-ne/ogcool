import type { Modification } from "bannerify-js"
import { isEmpty, omit } from "remeda"
import pkg from "../package.json"
import { templates } from "./templates"

type Templates = typeof templates

type TemplateId = Templates[number]["name"]

const baseUrl =
  process.env.NODE_ENV === "production" ? "https://ogcool.vercel.app" : "http://localhost:3000"

export function nonTypedOgcool(templateName: string, options?: any) {
  return ogcool(templateName as any, options)
}

export default function ogcool<T extends TemplateId>(
  templateName: T,
  options?: {
    modifications?: Array<
      Modification & { name: Templates[number]["modifications"][number]["name"] }
    >
    format?: "svg" | "png" // default is png
    sdk?: boolean
    disableTelemetry?: boolean
  },
) {
  const templateId = templates.find((template) => template.name === templateName)?.id
  const url = new URL(`/templates/v1/${templateId}`, baseUrl)
  if (
    options &&
    Object.keys(options).length > 0 &&
    !Object.values(options).every((v) => isEmpty(v as any))
  ) {
    const refinedOpts = omit(options, ["sdk", "disableTelemetry"])
    if (!isEmpty(refinedOpts)) {
      url.searchParams.set(
        "d",
        btoa(
          JSON.stringify(refinedOpts).replace(
            /[^\x20-\x7F]/g,
            // biome-ignore lint/style/useTemplate: <explanation>
            (x) => "\\u" + `000${x.codePointAt(0)!.toString(16)}`.slice(-4),
          ),
        ),
      )
    }
  }
  if (!options?.disableTelemetry && !(options?.sdk ?? false)) {
    url.searchParams.set("sdk", `ogcool@${pkg.version}`)
  }
  return url.toString()
}
