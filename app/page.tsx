"use client"
import { Checkbox } from "@/app/components/checkbox"
import ogcool from "@/app/sdk"
import { cn } from "@/app/utils"
import { X } from "@phosphor-icons/react"
import type { Modification } from "bannerify-js"
import serialize from "form-serialize"
import { Code, Edit, Github, MediaImage, Send } from "iconoir-react"
import type { Metadata } from "next"
import dynamic from "next/dynamic"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import {
  Suspense,
  use,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react"
import {
  Button,
  Dialog,
  DialogTrigger,
  Form,
  Heading,
  Input,
  Label,
  Modal,
  ModalOverlay,
  TextField,
} from "react-aria-components"
import { isDeepEqual, omit } from "remeda"
import { Toaster, toast } from "sonner"
import { useDebounce } from "use-debounce"
import { Gallery } from "./components/gallery"
import { templates } from "./templates"

const ConnectDynamic = dynamic(() => import("@/app/components/connect").then((m) => m.Connect), {
  ssr: false,
  loading: () => <span>Loading...</span>,
})

function Home() {
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()
  const [data, setData] = useState<{
    modifications?: Modification[]
    templateId: string
  }>(searchParams.get("d") ? JSON.parse(atob(searchParams.get("d")!)) : {})
  const [templateId, setTemplateId] = useState(
    searchParams.get("templateId") ?? data.templateId ?? "tpl_jNvsOYr0cr",
  )
  const template = useMemo(
    () => templates.find((template) => template.id === templateId)!,
    [templateId],
  )
  const [isLoading, setIsLoading] = useState(false)
  const previewUrl = useMemo(() => {
    const url = new URL("https://ogcool.vercel.app/preview")
    url.searchParams.set("name", template.name)
    url.searchParams.set("d", btoa(JSON.stringify(data)))
    return `https://dub.co/tools/metatags?url=${encodeURIComponent(url.toString())}`
  }, [data])
  const urlData = useMemo(() => {
    return ogcool(template.name as any, {
      modifications: data.modifications as any,
      format: "svg",
      sdk: false,
      disableTelemetry: true,
    })
  }, [data, template.name])
  const [imageUrl] = useDebounce(urlData, 500)

  useEffect(() => {
    if (imageUrl) {
      setIsLoading(true)
    }
  }, [imageUrl])

  const formRef = useRef<HTMLFormElement>(null)

  const onFormUpdate = useCallback(() => {
    // there is an issue with react-aria-components that it doesn't update the form values immediately
    setTimeout(() => {
      const newModifications = Object.entries(
        serialize(formRef.current!, { hash: true }) as Record<string, Record<string, string>>,
      )
        .map(([name, info]) => {
          const isVisible = info.visible === "on"
          const modification = template.modifications.find((item) => item.name === name)
          const inData = data.modifications?.find((item) => item.name === name)
          const valueKey = !modification?.type || modification?.type === "text" ? "text" : "src"
          const previousValue = {
            name,
            visible: inData?.visible ?? modification?.visible ?? true,
            [valueKey]: inData?.[valueKey] ?? modification?.defaultValue,
          } as Modification

          // remove visible key if it's not changed to reduce payload
          const visible =
            typeof info.visible === "undefined"
              ? false
              : isVisible !== previousValue.visible
                ? isVisible
                : undefined

          const newValue = {
            name,
            visible,
            [valueKey]: info[valueKey] !== modification?.defaultValue ? info[valueKey] : undefined,
          } as Modification

          return {
            ...newValue,
            _ok:
              !isDeepEqual(previousValue, newValue) &&
              (newValue[valueKey] || typeof newValue.visible !== "undefined"),
          } as Modification & { _ok: boolean }
        })
        .filter((m) => m._ok)
        .map((m) => omit(m, ["_ok"]))

      startTransition(() => setData({ modifications: newModifications, templateId }))
    }, 0)
  }, [template, data])

  return (
    <main className="min-h-screen h-max bg-slate-50">
      <Toaster position="top-center" />
      <div className="flex flex-col md:flex-row h-screen">
        <div className="flex-1 h-[50vh] md:h-screen overflow-scroll flex flex-col p-6 gap-2">
          <Gallery onSelect={setTemplateId} />
          <div className="flex-1 h-full overflow-hidden flex flex-col items-center justify-center shrink-0">
            <div className="flex flex-col gap-2">
              <Button
                onPress={() => {
                  navigator.clipboard.writeText(window.location.href)
                  toast("Copied")
                }}
                className="w-fit outline-0"
              >
                <h2 className="text-base font-medium text-gray-900 select-none">{template.name}</h2>
              </Button>
              <Image
                fetchPriority="high"
                src={imageUrl}
                alt="preview"
                width={760}
                height={250}
                className={cn(
                  "border max-h-[40vh] lg:max-h-[400px] min-w-[760px] border-gray-200 rounded-xl aspect-[1.9/1] opacity-100 shadow-lg",
                  {
                    "opacity-80": isLoading,
                  },
                )}
                onLoad={() => {
                  setIsLoading(false)
                }}
                placeholder="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM8Xw8AAiMBUBHOEisAAAAASUVORK5CYII="
                unoptimized={true}
              />
            </div>
            <div className="h-[30%]" />
          </div>
        </div>
        <div className="bg-white h-[50vh] md:h-screen overflow-scroll shadow-lg flex flex-col divide-y">
          <div className="p-6 grid items-center grid-cols-2 gap-2">
            <Button
              type="button"
              className="text-white bg-black hover:bg-[#333]/90 focus:ring-4 focus:outline-none focus:ring-[#999]/50 font-medium rounded-lg text-xs px-5 py-2.5 text-center inline-flex items-center mr-2 "
              onPress={() => {
                navigator.clipboard.writeText(
                  ogcool(template!.name, {
                    modifications: data?.modifications as any,
                    disableTelemetry: true,
                    sdk: false,
                  }),
                )
                toast("Copied to clipboard")
              }}
            >
              <MediaImage className="mr-2 -ml-1 w-4 h-4" />
              Copy (URL)
            </Button>
            <Button
              className="text-black bg-white border hover:bg-[#eee]/90 focus:ring-4 focus:outline-none focus:ring-[#999]/50 font-medium rounded-lg text-xs px-5 py-2.5 text-center inline-flex items-center mr-2"
              onPress={() => {
                const url = new URL(
                  ogcool(template!.name, {
                    modifications: data?.modifications as any,
                    disableTelemetry: true,
                    sdk: false,
                    templateId,
                  } as any),
                )
                url.pathname = "/"
                navigator.clipboard.writeText(url.toString())
                toast("Copied to clipboard")
              }}
            >
              <Edit className="mr-2 -ml-1 w-4 h-4" />
              Copy (editor)
            </Button>

            <DialogTrigger>
              <Button className="text-black bg-white border hover:bg-[#eee]/90 focus:ring-4 focus:outline-none focus:ring-[#999]/50 font-medium rounded-lg text-xs px-5 py-2.5 text-center inline-flex items-center mr-2">
                <Code className="mr-2 -ml-1 w-4 h-4" />
                Connect
              </Button>
              <ModalOverlay
                isDismissable
                className={({ isEntering, isExiting }) => `
                  fixed inset-0 z-10 overflow-y-auto bg-black/25 flex min-h-full items-center justify-center p-4 text-center
                  ${isEntering ? "animate-in fade-in duration-300 ease-out" : ""}
                  ${isExiting ? "animate-out fade-out duration-200 ease-in" : ""}
                `}
              >
                <Modal
                  className={({ isEntering, isExiting }) => `
                    w-full max-w-[800px] min-h-[60vh] overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl
                    ${isEntering ? "animate-in zoom-in-95 ease-out duration-300" : ""}
                    ${isExiting ? "animate-out zoom-out-95 ease-in duration-200" : ""}`}
                >
                  <Dialog role="alertdialog" className="outline-none relative">
                    {({ close }) => (
                      <>
                        <div className="flex justify-between pb-4">
                          <Heading className="text-2xl" slot="title">
                            Connect to code using SDK
                          </Heading>
                          <Button onPress={close} className="w-4 h-4">
                            <X className="fill-gray-500" />
                          </Button>
                        </div>
                        <p className="text-sm text-slate-800 font-normal pb-4">
                          The SDK provides a sugar syntax to connect ogcool to your codebase.
                          Typesafe, delightful, easy to use 💫.
                        </p>
                        <Suspense fallback="Loading...">
                          <ConnectDynamic
                            modifications={data?.modifications || []}
                            templateName={template.name}
                          />
                        </Suspense>
                      </>
                    )}
                  </Dialog>
                </Modal>
              </ModalOverlay>
            </DialogTrigger>
            <a
              className="text-black bg-white border hover:bg-[#eee]/90 focus:ring-4 focus:outline-none focus:ring-[#999]/50 font-medium rounded-lg text-xs px-5 py-2.5 text-center inline-flex items-center mr-2"
              href={previewUrl}
              target="_blank"
              rel="noreferrer"
            >
              <Send className="mr-2 -ml-1 w-4 h-4" />
              Preview
            </a>
          </div>
          <div className="p-6">
            <div className="text-base font-medium text-gray-900">Modifications</div>
            <div className="mt-4 flex flex-col gap-3">
              <Form
                ref={formRef}
                // @ts-expect-error - this is a bug in the types
                onChange={onFormUpdate}
              >
                {template.modifications.map((modification) => {
                  const defaultVisible = modification.visible ?? true
                  const field = !modification.type || modification.type === "text" ? "text" : "src"
                  const inData = data.modifications?.find((i) => i.name === modification.name)
                  const isReadOnly =
                    inData && typeof inData.visible !== "undefined"
                      ? !inData.visible
                      : !defaultVisible
                  return (
                    <TextField
                      key={template.id + modification.name}
                      name={`${modification.name}][${field}]`}
                      className="flex justify-between gap-2 py-2 items-center"
                      type={modification.type || "text"}
                      defaultValue={
                        data.modifications?.find((i) => i.name === modification.name)?.text ??
                        modification.defaultValue
                      }
                      isReadOnly={isReadOnly}
                    >
                      <Label
                        className="gap-3 text-sm font-medium text-gray-700 truncate w-24 break-words"
                        title={modification.name}
                      >
                        {modification.name}
                      </Label>
                      <Input className="flex-1 flex rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 read-only:text-gray-400 read-only:pointer-events-none text-[16px] md:text-xs py-2 px-3" />
                      <Checkbox
                        name={`[${modification.name}][visible]`}
                        defaultSelected={
                          data.modifications?.find((i) => i.name === modification.name)?.visible ??
                          defaultVisible
                        }
                        onChange={onFormUpdate}
                      />
                    </TextField>
                  )
                })}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function () {
  return (
    <Suspense>
      <Home />
    </Suspense>
  )
}
