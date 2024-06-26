import { Checkbox } from "@/app/components/checkbox"
import type { Modification, Template } from "@/app/templates"
import { cn } from "@/app/utils"
import type { Modification as Mod } from "bannerify-js"
import { useFocus } from "react-aria"
import { Input, Label, TextArea, TextField } from "react-aria-components"
import { IconRenderer } from "./icon-renderer"

export const ModificationEdit = ({
  data,
  modification,
  onUpdate,
}: {
  modification: Modification
  data: {
    modifications?: Mod[]
    templateId: string
  }
  onUpdate: () => void
  template: Template
}) => {
  const defaultVisible = modification.visible ?? true
  const field = !modification.type || modification.type === 'text' ? 'text' : 'src'
  const inData = data.modifications?.find((i) => i.name === modification.name)
  const isReadOnly = inData && typeof inData.visible !== 'undefined' ? !inData.visible : !defaultVisible
  const { focusProps } = useFocus({})
  const InputType = modification.meta?.textarea ? TextArea : modification.meta?.icon ? IconRenderer : Input

  return (
    <TextField
      name={`[${modification.name}][${field}]`}
      className='relative flex items-center justify-between gap-2 py-2 flex-wrap'
      type={modification.type || 'text'}
      defaultValue={data.modifications?.find((i) => i.name === modification.name)?.text ?? modification.defaultValue}
      isReadOnly={isReadOnly}
    >
      <Label
        className='order-none md:order-1 md:w-20 truncate break-words font-medium text-gray-700 text-sm'
        title={modification.name}
      >
        {modification.name}
      </Label>
      <Checkbox
        name={`[${modification.name}][visible]`}
        defaultSelected={data.modifications?.find((i) => i.name === modification.name)?.visible ?? defaultVisible}
        onChange={onUpdate}
        className='order-none md:order-3'
      />
      <div
        className={cn('relative h-10 w-full flex-1 order-none md:order-2 basis-full md:basis-0', {
          'mb-2 md:mb-0': modification.meta?.textarea,
        })}
      >
        <InputType
          {...focusProps}
          className={cn(
            'flex w-full resize-none overflow-x-hidden rounded-md border border-gray-300 px-3 py-2 text-[16px] shadow-sm read-only:pointer-events-none focus:border-indigo-500 md:text-xs read-only:text-gray-400 focus:ring-indigo-500',
            {
              'px-2 py-0.5 focus:absolute focus:top-0 focus:z-10 focus:h-24': modification.meta?.textarea,
            }
          )}
        >
        </InputType>
      </div>
    </TextField>
  )
}
