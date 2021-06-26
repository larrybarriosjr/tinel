import { DropDownItemType } from "types/component"

export const quantityItems: DropDownItemType[] = Array.from({ length: 10 }, (_, idx) => idx).map(id => ({
  label: (id + 1).toString(),
  value: (id + 1).toString()
}))
