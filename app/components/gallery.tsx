import ogcool from '@/app/sdk'
import { templates } from '@/app/templates'
import { cn } from '@/app/utils'
import { ArrowLeft, ArrowRight, X } from '@phosphor-icons/react'
import type { EmblaCarouselType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { Album } from 'iconoir-react'
import Image from 'next/image'
import { Suspense, useCallback, useEffect, useState } from 'react'
import { Button, Dialog, DialogTrigger, Heading, Modal, ModalOverlay } from 'react-aria-components'
import { toast } from 'sonner'

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean
  nextBtnDisabled: boolean
  onPrevButtonClick: () => void
  onNextButtonClick: () => void
}

const usePrevNextButtons = (emblaApi: EmblaCarouselType | undefined): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) {
      return
    }
    emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) {
      return
    }
    emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) {
      return
    }

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  }
}

export const Gallery = ({
  onSelect,
}: {
  onSelect: (id: string) => void
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
  })

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi)

  return (
    <>
      <div className='flex justify-end md:hidden'>
        <DialogTrigger>
          <Button className='mr-2 inline-flex items-center gap-1 rounded-lg border bg-white px-5 py-2.5 text-center font-medium text-black text-xs hover:bg-[#eee]/90 focus:outline-none focus:ring-4 focus:ring-[#999]/50'>
            <Album className='h-3 w-3' />
            Templates
          </Button>
          <ModalOverlay
            isDismissable
            className={({ isEntering, isExiting }) =>
              cn(
                'fixed inset-0 z-10 flex min-h-full items-center justify-center overflow-y-auto bg-black/25 p-4 text-center',
                {
                  'fade-in animate-in duration-300 ease-out': isEntering,
                  'fade-out animate-out duration-200 ease-in': isExiting,
                },
              )
            }
          >
            <Modal
              className={({ isEntering, isExiting }) =>
                cn(
                  'w-full max-w-[800px] overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl',
                  {
                    'zoom-in-95 animate-in duration-300 ease-out': isEntering,
                    'zoom-out-95 animate-out duration-200 ease-in': isExiting,
                  },
                )
              }
            >
              <Dialog role='alertdialog' className='relative outline-none'>
                {({ close }) => (
                  <>
                    <div className='flex justify-between pb-4'>
                      <Heading className='text-2xl' slot='title'>
                        Browse og template
                      </Heading>
                      <Button onPress={close} className='h-4 w-4'>
                        <X className='fill-gray-500' />
                      </Button>
                    </div>
                    <div className='flex cursor-default'>
                      <span />
                      <div className='ml-auto flex gap-2'>
                        <Button
                          type='button'
                          isDisabled={prevBtnDisabled}
                          onPress={onPrevButtonClick}
                        >
                          <ArrowLeft
                            className={cn('h-5 w-5 text-gray-600', {
                              'hover:text-black': !prevBtnDisabled,
                              'text-gray-300': prevBtnDisabled,
                            })}
                          />
                        </Button>
                        <Button
                          type='button'
                          isDisabled={nextBtnDisabled}
                          onPress={onNextButtonClick}
                        >
                          <ArrowRight
                            className={cn('h-5 w-5 text-gray-600', {
                              'hover:text-black': !nextBtnDisabled,
                              'text-gray-300': nextBtnDisabled,
                            })}
                          />
                        </Button>
                      </div>
                    </div>
                    <div className='overflow-hidden' ref={emblaRef}>
                      <div className='scrollbar-hide flex gap-6 scroll-smooth p-4'>
                        {Object.values(templates).map(({ id, name }, key) => (
                          <button
                            key={String(key)}
                            className='aspect-[1.9/1] h-[190px] w-[300px] rounded-xl pr-3 outline-0 min-w-0 flex-[0_0_100%]'
                            type='button'
                            onClick={() => {
                              onSelect(id)
                              close()
                            }}
                          >
                            <Image
                              fetchPriority='low'
                              loading='lazy'
                              src={ogcool(name, {
                                sdk: false,
                                format: 'svg',
                              })}
                              alt='preview'
                              className='aspect-[1.9/1] cursor-pointer rounded-xl shadow-lg transition-all hover:scale-110'
                              placeholder='data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM8Xw8AAiMBUBHOEisAAAAASUVORK5CYII='
                              unoptimized={true}
                              width={400}
                              height={200}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </Dialog>
            </Modal>
          </ModalOverlay>
        </DialogTrigger>
      </div>
      <div className='hidden flex-col md:flex'>
        <div className='flex cursor-default'>
          <h5 className='text-slate-800 text-xl'>Templates</h5>
          <div className='ml-auto flex gap-2'>
            <Button type='button' isDisabled={prevBtnDisabled} onPress={onPrevButtonClick}>
              <ArrowLeft
                className={cn('h-5 w-5 text-gray-600', {
                  'hover:text-black': !prevBtnDisabled,
                  'text-gray-300': prevBtnDisabled,
                })}
              />
            </Button>
            <Button type='button' isDisabled={nextBtnDisabled} onPress={onNextButtonClick}>
              <ArrowRight
                className={cn('h-5 w-5 text-gray-600', {
                  'hover:text-black': !nextBtnDisabled,
                  'text-gray-300': nextBtnDisabled,
                })}
              />
            </Button>
          </div>
        </div>
        <div className='overflow-hidden' ref={emblaRef}>
          <div className='scrollbar-hide embla__container flex scroll-px-10 gap-6 scroll-smooth p-4 w-full'>
            {Object.values(templates).map(({ id, name }, key) => (
              <button
                key={String(key)}
                className='embla__slide aspect-[1.9/1] rounded-xl pr-3 outline-0 h-[190px] min-w-[300px]'
                type='button'
                onClick={() => {
                  onSelect(id)
                  if (/Mobi/i.test(window.navigator.userAgent)) {
                    toast(`Selected template ${name}`)
                  }
                }}
              >
                <Image
                  fetchPriority='low'
                  loading='lazy'
                  src={ogcool(name, {
                    sdk: false,
                    // format: 'svg',
                  })}
                  alt='preview'
                  className='aspect-[1.9/1] cursor-pointer rounded-xl shadow-lg transition-all hover:scale-110'
                  placeholder='data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM8Xw8AAiMBUBHOEisAAAAASUVORK5CYII='
                  unoptimized={true}
                  width={400}
                  height={200}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
