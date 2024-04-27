import useSWR from 'swr'
import { ComboBoxItem, ComboBox } from './combobox'
import { useFilter } from 'react-aria'
import { useDeferredValue, useMemo, useState } from 'react'
import * as Iconoir from 'iconoir-react'

const size = 100

export const IconRenderer = () => {
  const { data: icons } = useSWR('iconoir', () =>
    import('iconoir-react').then((i) =>
      Object.keys(i).map((i) => ({
        name: i,
        component: Iconoir[i as keyof typeof Iconoir],
      }))
    )
  )

  let { startsWith } = useFilter({ sensitivity: 'base' })
  let [filterValue, setFilterValue] = useState('')
  const deferredFilterValue = useDeferredValue(filterValue)
  let filteredItems = useMemo(
    () => icons?.filter((item) => startsWith(item.name, deferredFilterValue)).slice(0, size) ?? [],
    [icons, deferredFilterValue]
  )

  return (
    <ComboBox items={filteredItems} inputValue={filterValue} onInputChange={setFilterValue}>
      {filteredItems.map((icon) => (
        <ComboBoxItem key={icon.name} textValue={icon.name} icon={icon.name}>
          {icon.name}
        </ComboBoxItem>
      ))}
    </ComboBox>
  )
}
