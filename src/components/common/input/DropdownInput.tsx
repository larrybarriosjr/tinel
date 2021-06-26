import { ReactComponent as DownIcon } from "assets/icons/chevron-down.svg"
import Select, { ActionMeta, GroupTypeBase, Styles } from "react-select"
import { DropDownItemType } from "types/component"

type DropdownInputProps = {
  id: string
  items: DropDownItemType[]
  value?: DropDownItemType
  onChange?: (value: DropDownItemType | null, action: ActionMeta<DropDownItemType>) => void
}

const DropdownInput = ({ id, items, value, onChange }: DropdownInputProps) => {
  const styles: Partial<Styles<DropDownItemType, false, GroupTypeBase<DropDownItemType>>> | undefined = {
    control: () => ({
      display: "flex",
      alignItems: "center",
      width: "65px",
      height: "45px",
      borderRadius: "8px",
      border: "1px solid var(--blue)",
      fontWeight: 700,
      fontSize: "18.4px",
      lineHeight: "23px",
      paddingRight: "10px",
      background: "white"
    }),
    valueContainer: () => ({ display: "flex", marginLeft: "auto" }),
    singleValue: () => ({ color: "var(--darker-grey)", whiteSpace: "nowrap" }),
    option: base => ({ ...base, padding: "4px", textAlign: "center" }),
    indicatorSeparator: () => ({}),
    indicatorsContainer: () => ({}),
    dropdownIndicator: () => ({})
  }

  const DropdownIndicator = () => <DownIcon width="24" height="24" />

  return (
    <Select
      menuPlacement="auto"
      options={items}
      value={value}
      isSearchable={false}
      styles={styles}
      components={{ DropdownIndicator }}
      onChange={onChange}
      id={id}
    />
  )
}

export default DropdownInput
