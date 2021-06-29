import { DropDownItemType } from "types/component"
import { Genders } from "./enums"

export const quantityItems: DropDownItemType[] = Array.from({ length: 10 }, (_, idx) => idx).map(id => ({
  label: (id + 1).toString(),
  value: (id + 1).toString()
}))

export const genderItems: DropDownItemType[] = [
  { label: "Male", value: Genders.MALE },
  { label: "Female", value: Genders.FEMALE },
  { label: "Other", value: Genders.OTHER }
]
