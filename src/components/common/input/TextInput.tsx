import clsx from "clsx"
import Flex from "components/container/Flex"
import { FieldHookConfig, useField } from "formik"
import styles from "./Input.module.scss"

type TextInputProps = FieldHookConfig<string> & {
  label: string
}

const TextInput = ({ label, ...props }: TextInputProps) => {
  const [field, meta] = useField(props)

  const errorClasses = clsx([styles.text__error_text, "semi"])
  const inputClasses = clsx([styles.text__input, { [styles.error]: meta.error }])

  return (
    <Flex className={styles.text__container}>
      <Flex className={styles.text__label_container}>
        <h6>
          <label htmlFor={props.id || props.name}>{label}</label>
        </h6>
        {meta.touched && meta.error ? <h6 className={errorClasses}>{meta.error}</h6> : null}
      </Flex>
      <input className={inputClasses} placeholder={props.placeholder} {...field} />
    </Flex>
  )
}

export default TextInput
