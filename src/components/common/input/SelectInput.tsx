import clsx from "clsx"
import Flex from "components/container/Flex"
import { FieldHookConfig, useField } from "formik"
import { DropDownItemType } from "types/component"
import styles from "./Input.module.scss"

type SelectInputProps = FieldHookConfig<string> &
  React.ComponentPropsWithoutRef<"select"> & {
    items: DropDownItemType[]
    label: string
  }

const SelectInput = ({ items, label, ...props }: SelectInputProps) => {
  const [field, meta] = useField(props)

  const errorClasses = clsx([styles.input__error, "semi"])
  const inputClasses = clsx([
    styles.input__element,
    { [(styles.error, styles.select__empty)]: meta.touched && meta.error }
  ])

  return (
    <Flex className={styles.input__container}>
      <Flex className={styles.input__label_container}>
        <label htmlFor={field.name}>
          <h6>{label}</h6>
        </label>
        {meta.touched && meta.error ? <h6 className={errorClasses}>{meta.error}</h6> : null}
      </Flex>
      <select className={inputClasses} placeholder={props.placeholder} {...field}>
        <option value="" selected className={styles.select__placeholder}>
          {props.placeholder}
        </option>
        {items.map((item, idx) => (
          <option key={idx} value={item.value} className={styles.select__option}>
            {item.label}
          </option>
        ))}
      </select>
    </Flex>
  )
}

export default SelectInput
