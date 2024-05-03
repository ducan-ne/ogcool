'use client'
import ogcool from '@/app/sdk'
import { cn } from '@/app/utils'
import { X } from '@phosphor-icons/react'
import type { Modification } from 'bannerify-js'
import serialize from 'form-serialize'
import { Code, Edit, MediaImage, Send } from 'iconoir-react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import {
  Suspense,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  Button,
  Dialog,
  DialogTrigger,
  Form,
  Heading,
  Modal,
  ModalOverlay,
} from 'react-aria-components'
import { isDeepEqual, omit } from 'remeda'
import { Toaster, toast } from 'sonner'
import { useDebounce } from 'use-debounce'
import { Gallery } from './components/gallery'
import { ModificationEdit } from './components/modification'
import { type Modification as RefinedModifications, templates } from './templates'

const ConnectDynamic = dynamic(() => import('@/app/components/connect').then((m) => m.Connect), {
  ssr: false,
  loading: () => <span>Loading...</span>,
})

function Home() {
  const searchParams = useSearchParams()
  const [data, setData] = useState<{
    modifications?: Modification[]
    templateId: string
  }>(searchParams.get('d') ? JSON.parse(atob(searchParams.get('d')!)) : {})
  const [templateId, setTemplateId] = useState(
    searchParams.get('templateId') ?? data.templateId ?? 'tpl_0ybILPlWHj',
  )
  const template = useMemo(
    () => templates.find((template) => template.id === templateId)!,
    [templateId],
  )
  const [isLoading, setIsLoading] = useState(false)
  const deferredData = useDeferredValue(data)
  const previewUrl = useMemo(() => {
    const url = new URL('https://ogcool.vercel.app/preview')
    url.searchParams.set('name', template.name)
    url.searchParams.set(
      'd',
      btoa(
        JSON.stringify(deferredData).replace(
          /[^\x20-\x7F]/g,
          (x) => `\\u${`000${x.codePointAt(0)!.toString(16)}`.slice(-4)}`,
        ),
      ),
    )
    return `https://dub.co/tools/metatags?url=${encodeURIComponent(url.toString())}`
  }, [deferredData])
  const urlData = useMemo(() => {
    return `${ogcool(template.name as any, {
      modifications: deferredData.modifications as any,
      format: 'svg',
      sdk: false,
      disableTelemetry: true,
    })}&t=${Date.now()}`
  }, [deferredData, template.name])
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
          const isVisible = info.visible === 'on'
          const modification = template.modifications.find(
            (item) => item.name === name,
          ) as RefinedModifications
          const inData = data.modifications?.find((item) => item.name === name)
          const valueKey = !modification?.type || modification?.type === 'text' ? 'text' : 'src'
          const previousValue = {
            name,
            visible: inData?.visible ?? modification?.visible ?? true,
            [valueKey]: inData?.[valueKey] ?? modification?.defaultValue,
          } as Modification

          // remove visible key if it's not changed to reduce payload
          const visible =
            typeof info.visible === 'undefined'
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
              (newValue[valueKey] || typeof newValue.visible !== 'undefined'),
          } as Modification & { _ok: boolean }
        })
        .filter((m) => m._ok)
        .map((m) => omit(m, ['_ok']))

      setData({ modifications: newModifications, templateId })
    }, 0)
  }, [template, data])

  return (
    <main className='h-max min-h-screen bg-slate-50'>
      <Toaster position='top-center' />
      <div className='flex h-screen flex-col md:flex-row'>
        <div className='flex h-[50vh] flex-1 flex-col gap-2 overflow-scroll p-6 md:h-screen'>
          <Gallery
            onSelect={(id) => {
              setTemplateId(id)
              setData({ templateId: id, modifications: [] })
            }}
          />
          <div className='flex h-full flex-1 shrink-0 flex-col items-center justify-center overflow-hidden'>
            <div className='flex flex-col gap-2'>
              <Button
                onPress={() => {
                  navigator.clipboard.writeText(window.location.href)
                  toast('Copied')
                }}
                className='w-fit outline-0'
              >
                <h2 className='select-none font-medium text-base text-gray-900'>{template.name}</h2>
              </Button>
              <Image
                suppressHydrationWarning
                fetchPriority='high'
                src={imageUrl}
                alt='preview'
                width={760}
                height={250}
                className={cn(
                  'aspect-[1.9/1] max-h-[40vh] rounded-xl border border-gray-200 opacity-100 shadow-lg lg:max-h-[400px] md:min-w-[760px]',
                  {
                    'opacity-60': isLoading,
                  },
                )}
                loading='eager'
                onLoad={() => {
                  setIsLoading(false)
                }}
                placeholder='data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM8Xw8AAiMBUBHOEisAAAAASUVORK5CYII='
                unoptimized={true}
              />
            </div>
            <div className='h-[30%]' />
          </div>
        </div>
        <div className='flex h-[50vh] flex-col divide-y overflow-scroll bg-white shadow-lg md:h-screen'>
          <div className='grid grid-cols-2 items-center gap-2 p-6'>
            <Button
              type='button'
              className='!bg-black mr-2 inline-flex items-center rounded-lg px-5 py-2.5 text-center font-medium text-white text-xs hover:bg-[#333]/90 focus:outline-none focus:ring-4 focus:ring-[#999]/50'
              onPress={() => {
                navigator.clipboard.writeText(
                  ogcool(template!.name, {
                    modifications: data?.modifications as any,
                    disableTelemetry: true,
                    sdk: false,
                  }),
                )
                toast('Copied to clipboard')
              }}
            >
              <MediaImage className='-ml-1 mr-2 h-4 w-4' />
              Copy (URL)
            </Button>
            <Button
              className='mr-2 inline-flex items-center rounded-lg border bg-white px-5 py-2.5 text-center font-medium text-black text-xs hover:bg-[#eee]/90 focus:outline-none focus:ring-4 focus:ring-[#999]/50'
              onPress={() => {
                const url = new URL(
                  ogcool(template!.name, {
                    modifications: data?.modifications as any,
                    disableTelemetry: true,
                    sdk: false,
                    templateId,
                  } as any),
                )
                url.pathname = '/'
                navigator.clipboard.writeText(url.toString())
                toast('Copied to clipboard')
              }}
            >
              <Edit className='-ml-1 mr-2 h-4 w-4' />
              Copy (editor)
            </Button>

            <DialogTrigger>
              <Button className='mr-2 inline-flex items-center rounded-lg border bg-white px-5 py-2.5 text-center font-medium text-black text-xs hover:bg-[#eee]/90 focus:outline-none focus:ring-4 focus:ring-[#999]/50'>
                <Code className='-ml-1 mr-2 h-4 w-4' />
                Embed
              </Button>
              <ModalOverlay
                isDismissable
                className={({ isEntering, isExiting }) =>
                  `fixed inset-0 z-10 flex min-h-full items-center justify-center overflow-y-auto bg-black/25 p-4 text-center${
                    isEntering ? 'fade-in animate-in duration-300 ease-out' : ''
                  }${isExiting ? 'fade-out animate-out duration-200 ease-in' : ''}`
                }
              >
                <Modal
                  className={({ isEntering, isExiting }) =>
                    `min-h-[60vh] w-full max-w-[800px] overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl${
                      isEntering ? 'zoom-in-95 animate-in duration-300 ease-out' : ''
                    }${isExiting ? 'zoom-out-95 animate-out duration-200 ease-in' : ''}`
                  }
                >
                  <Dialog role='alertdialog' className='relative outline-none'>
                    {({ close }) => (
                      <>
                        <div className='flex justify-between pb-4'>
                          <Heading className='text-2xl' slot='title'>
                            Embed to code using SDK
                          </Heading>
                          <Button onPress={close} className='h-4 w-4'>
                            <X className='fill-gray-500' />
                          </Button>
                        </div>
                        <p className='pb-4 font-normal text-slate-800 text-sm'>
                          The SDK provides a sugar syntax to embed ogcool to your codebase.
                          Typesafe, delightful, easy to use 💫.
                        </p>
                        <Suspense fallback='Loading...'>
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
              className='mr-2 inline-flex items-center rounded-lg border bg-white px-5 py-2.5 text-center font-medium text-black text-xs hover:bg-[#eee]/90 focus:outline-none focus:ring-4 focus:ring-[#999]/50'
              href={previewUrl}
              target='_blank'
              rel='noreferrer'
            >
              <Send className='-ml-1 mr-2 h-4 w-4' />
              Preview
            </a>
          </div>
          <div className='p-6'>
            <div className='font-medium text-base text-gray-900'>Modifications</div>
            <div className='mt-4 flex flex-col gap-3'>
              <Form
                ref={formRef}
                key={template.id}
                // @ts-expect-error - RAC does not have a type for this
                onChange={onFormUpdate}
                className='flex flex-col'
              >
                {template.modifications.map((modification) => {
                  return (
                    <ModificationEdit
                      key={template.id + modification.name}
                      data={data}
                      template={template}
                      modification={modification}
                      onUpdate={onFormUpdate}
                    />
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
