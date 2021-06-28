import { ReactComponent as CalendarIcon } from "assets/icons/calendar.svg"
import clsx from "clsx"
import Flex from "components/container/Flex"
import dayjs from "dayjs"
import { FieldHookConfig, useField } from "formik"
import React, { useState } from "react"
import DayPicker from "react-day-picker/DayPicker"
import "react-day-picker/lib/style.css"
import styles from "./Input.module.scss"

type DateInputProps = FieldHookConfig<string> &
  React.ComponentPropsWithoutRef<"input"> & {
    label: string
  }

const FORMAT = "DD.MM.YYYY"

const DateInput = ({ label, ...props }: DateInputProps) => {
  const [field, meta, { setValue }] = useField(props)

  const [inputDate, setInputDate] = useState(new Date())
  const [dateDisplay, setDateDisplay] = useState(false)

  const errorClasses = clsx([styles.input__error, "semi"])
  const inputClasses = clsx([
    styles.input__element,
    styles.date__input,
    { [styles.error]: meta.touched && meta.error }
  ])

  const setDate = (day: Date) => {
    setValue(dayjs(day).format(FORMAT))
    setInputDate(day)
    setDateDisplay(false)
  }

  const handleDisplayDate = () => {
    setDateDisplay(true)
  }

  const handleToggleDisplayDate = () => {
    setDateDisplay(state => !state)
  }

  const handleDeleteDate = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" || e.key === "Delete") setValue("")
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
        <CalendarIcon className={styles.date__calendar} onMouseDown={handleToggleDisplayDate} />
        <input
          onMouseDown={handleToggleDisplayDate}
          onFocus={handleDisplayDate}
          onKeyDown={handleDeleteDate}
          placeholder={props.placeholder}
          className={inputClasses}
          {...field}
          readOnly
        />
      </div>
      {dateDisplay ? (
        <DayPicker
          className={styles.date__datepicker}
          onDayClick={setDate}
          selectedDays={inputDate}
          month={inputDate}
        />
      ) : null}
    </Flex>
  )
}

export default DateInput
