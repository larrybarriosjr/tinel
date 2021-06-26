import { DropDownItemType } from "types/component"

export const quantityItems: DropDownItemType[] = Array.from({ length: 11 }, (_, idx) => idx).map(id => ({
  label: id.toString(),
  value: id.toString()
}))
