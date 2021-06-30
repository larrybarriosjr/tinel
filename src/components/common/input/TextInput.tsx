import clsx from "clsx"
import Flex from "components/container/Flex"
import { FieldHookConfig, useField } from "formik"
import styles from "./Input.module.scss"

type TextInputProps = FieldHookConfig<string> &
  React.ComponentPropsWithoutRef<"input"> & {
    label: string
  }

const TextInput = ({ label, ...props }: TextInputProps) => {
  const [field, meta] = useField(props)

  const errorClasses = clsx([styles.input__error, "semi"])
  const inputClasses = clsx([
    styles.input__element,
    { [styles.error]: meta.touched && meta.error },
    { [styles.number]: props.type === "number" }
  ])

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (props.type === "number" && !/\d/.test(e.key)) {
      e.preventDefault()
    }
  }

  return (
    <Flex className={styles.input__container}>
      <Flex className={styles.input__label_container}>
        <label htmlFor={field.name}>
          <h6>{label}</h6>
        </label>
        {meta.touched && meta.error ? <h6 className={errorClasses}>{meta.error}</h6> : null}
      </Flex>
      <input
        id={field.name}
        type={props.type}
        min={props.min}
        className={inputClasses}
        placeholder={props.placeholder}
        onKeyPress={handleKeyPress}
        {...field}
      />
    </Flex>
  )
}

export default TextInput
