import ogcool from "@/app/sdk"
import { templates } from "@/app/templates"
import { cn } from "@/app/utils"
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react"
import type { EmblaCarouselType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { Button } from "react-aria-components"

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
    emblaApi.on("reInit", onSelect)
    emblaApi.on("select", onSelect)
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
  const [emblaRef, emblaApi] = useEmblaCarousel({})

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi)

  return (
    <div className="flex flex-col">
      <div className="flex cursor-default">
        <h5 className="text-slate-800 text-xl">Templates</h5>
        <div className="ml-auto flex gap-2">
          <Button type="button" isDisabled={prevBtnDisabled} onPress={onPrevButtonClick}>
            <ArrowLeft
              className={cn("h-5 w-5 text-gray-600", {
                "hover:text-black": !prevBtnDisabled,
                "text-gray-300": prevBtnDisabled,
              })}
            />
          </Button>
          <Button type="button" isDisabled={nextBtnDisabled} onPress={onNextButtonClick}>
            <ArrowRight
              className={cn("h-5 w-5 text-gray-600", {
                "hover:text-black": !nextBtnDisabled,
                "text-gray-300": nextBtnDisabled,
              })}
            />
          </Button>
        </div>
      </div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="scrollbar-hide flex scroll-px-10 gap-6 scroll-smooth p-4 embla__container h-[190px] w-[300px]">
          {Object.values(templates).map(({ id, name }, key) => (
            <Button
              key={String(key)}
              className="aspect-[1.9/1] rounded-xl h-full w-full pr-3 embla__slide outline-0"
              type="button"
              onPress={() => onSelect(id)}
            >
              <Image
                fetchPriority="low"
                src={ogcool(name, {
                  sdk: false,
                  format: "svg",
                })}
                alt="preview"
                className="rounded-xl aspect-[1.9/1] shadow-lg cursor-pointer hover:scale-110 transition-all"
                placeholder="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM8Xw8AAiMBUBHOEisAAAAASUVORK5CYII="
                unoptimized={true}
                width={400}
                height={200}
              />
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
