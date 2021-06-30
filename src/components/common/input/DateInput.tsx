import { CalendarIcon } from "assets/icons"
import clsx from "clsx"
import Flex from "components/container/Flex"
import { FieldHookConfig, useField } from "formik"
import React from "react"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import styles from "./Input.module.scss"

type DateInputProps = FieldHookConfig<string> &
  React.ComponentPropsWithoutRef<"input"> & {
    label: string
  }

const FORMAT = "dd.MM.yyyy"

const DateInput = ({ label, ...props }: DateInputProps) => {
  const [field, meta, { setValue }] = useField(props)

  const errorClasses = clsx([styles.input__error, "semi"])
  const wrapperClasses = clsx([styles.date__datepicker_wrapper])
  const inputClasses = clsx([
    styles.input__element,
    styles.date__input,
    { [styles.error]: meta.touched && meta.error }
  ])

  const handleChangeDate = (date: Date | null) => {
    return date ? setValue(date.toISOString()) : setValue("")
  }

  return (
    <Flex className={styles.input__container}>
      <Flex className={styles.input__label_container}>
        <label htmlFor={field.name}>
          <h6>{label}</h6>
        </label>
        {meta.touched && meta.error ? <h6 className={errorClasses}>{meta.error}</h6> : null}
      </Flex>
      <div className={styles.date__input_container}>
        <CalendarIcon className={styles.date__calendar} />
        <ReactDatePicker
          id={field.name}
          wrapperClassName={wrapperClasses}
          name={field.name}
          onBlur={field.onBlur}
          onChange={handleChangeDate}
          placeholderText={props.placeholder}
          selected={field.value ? new Date(field.value) : null}
          className={inputClasses}
          showPopperArrow={false}
          maxDate={new Date()}
          dateFormat={FORMAT}
          dropdownMode="select"
          showMonthDropdown
          showYearDropdown
        />
      </div>
    </Flex>
  )
}

export default DateInput
