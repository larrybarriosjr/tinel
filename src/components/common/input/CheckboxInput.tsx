import { CheckIcon } from "assets/icons"
import clsx from "clsx"
import { FieldHookConfig, useField } from "formik"
import React, { useRef } from "react"
import styles from "./Input.module.scss"

type CheckboxInputProps = FieldHookConfig<boolean> &
  React.ComponentPropsWithoutRef<"input"> & {
    label: string
  }

const CheckboxInput = ({ label, ...props }: CheckboxInputProps) => {
  const [field, meta, { setValue }] = useField(props)

  const inputRef = useRef<HTMLInputElement>(null)

  const errorClasses = clsx([styles.checkbox__error, "semi"])
  const inputClasses = clsx([
    styles.checkbox__element,
    { [styles.checkbox__true]: field.value },
    { [styles.error]: meta.touched && meta.error }
  ])

  const handleClick = () => {
    setValue(!field.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " || e.key === "Enter") setValue(!field.value)
  }

  return (
    <div className={styles.checkbox__container}>
      <div className={styles.checkbox__input_container}>
        <input
          id={field.name}
          ref={inputRef}
          type="checkbox"
          name={field.name}
          checked={field.value}
          readOnly
          hidden
        />
        <div
          role="checkbox"
          tabIndex={0}
          className={inputClasses}
          onKeyDown={handleKeyDown}
          onClick={handleClick}
          aria-checked={Boolean(inputRef.current?.checked)}
        >
          <CheckIcon />
        </div>
        <label htmlFor={field.name} className={styles.checkbox__label}>
          <h6>{label}</h6>
        </label>
      </div>
      {meta.touched && meta.error ? <h6 className={errorClasses}>{meta.error}</h6> : null}
    </div>
  )
}

export default CheckboxInput
