import { Checkbox } from "@/app/components/checkbox"
import type { Modification, Template } from "@/app/templates"
import { cn } from "@/app/utils"
import type { Modification as Mod } from "bannerify-js"
import { useFocus } from "react-aria"
import { Input, Label, TextArea, TextField } from "react-aria-components"

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
  const field = !modification.type || modification.type === "text" ? "text" : "src"
  const inData = data.modifications?.find((i) => i.name === modification.name)
  const isReadOnly =
    inData && typeof inData.visible !== "undefined" ? !inData.visible : !defaultVisible
  const { focusProps } = useFocus({})
  const InputType = modification.meta?.textarea ? TextArea : Input

  return (
    <TextField
      name={`[${modification.name}][${field}]`}
      className="flex items-center justify-between gap-2 py-2"
      type={modification.type || "text"}
      defaultValue={
        data.modifications?.find((i) => i.name === modification.name)?.text ??
        modification.defaultValue
      }
      isReadOnly={isReadOnly}
    >
      <Label
        className="w-24 gap-3 truncate break-words font-medium text-gray-700 text-sm"
        title={modification.name}
      >
        {modification.name}
      </Label>
      <div className="relative h-8 w-full flex-1">
        <InputType
          {...focusProps}
          className={cn(
            "flex resize-none overflow-x-hidden rounded-md border border-gray-300 px-3 py-2 text-[16px] shadow-sm read-only:pointer-events-none focus:border-indigo-500 md:text-xs read-only:text-gray-400 focus:ring-indigo-500",
            {
              "px-2 py-0.5 focus:absolute focus:top-0 focus:z-10 focus:h-24":
                modification.meta?.textarea,
            },
          )}
        />
      </div>
      <Checkbox
        name={`[${modification.name}][visible]`}
        defaultSelected={
          data.modifications?.find((i) => i.name === modification.name)?.visible ?? defaultVisible
        }
        onChange={onUpdate}
      />
    </TextField>
  )
}
