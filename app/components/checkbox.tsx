import { Check, Minus } from "@phosphor-icons/react"
import React, { type ReactNode } from "react"
import {
  Checkbox as AriaCheckbox,
  type CheckboxGroupProps as AriaCheckboxGroupProps,
  type CheckboxProps,
  type ValidationResult,
  composeRenderProps,
} from "react-aria-components"
import { tv } from "tailwind-variants"
import { focusRing } from "./utils"

export interface CheckboxGroupProps extends Omit<AriaCheckboxGroupProps, "children"> {
  label?: string
  children?: ReactNode
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
}

const checkboxStyles = tv({
  base: "flex gap-2 items-center group text-sm transition",
  variants: {
    isDisabled: {
      false: "text-gray-800",
      true: "text-gray-300",
    },
  },
})

const boxStyles = tv({
  extend: focusRing,
  base: "w-5 h-5 rounded flex items-center justify-center border-2 transition cursor-pointer",
  variants: {
    isSelected: {
      false: "bg-white",
      true: "bg-[--color] border-[--color] [--color:theme(colors.gray.700)] group-pressed:[--color:theme(colors.gray.800)]",
    },
    isInvalid: {
      true: "[--color:theme(colors.red.700)]",
    },
    isDisabled: {
      true: "[--color:theme(colors.gray.200)]",
    },
  },
})

const iconStyles =
  "w-4 h-4 text-white group-disabled:text-gray-400 forced-colors:text-[HighlightText]"

export function Checkbox(props: CheckboxProps) {
  return (
    <AriaCheckbox
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        checkboxStyles({
          ...renderProps,
          className,
        }),
      )}
    >
      {({ isSelected, isIndeterminate, ...renderProps }) => (
        <>
          <div className={boxStyles({ isSelected: isSelected || isIndeterminate, ...renderProps })}>
            {isIndeterminate ? (
              <Minus aria-hidden className={iconStyles} />
            ) : isSelected ? (
              <Check aria-hidden className={iconStyles} />
            ) : null}
          </div>
          {props.children}
        </>
      )}
    </AriaCheckbox>
  )
}
