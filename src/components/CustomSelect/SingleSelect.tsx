import { FC } from 'react'
import { Control, Controller } from 'react-hook-form'
import Select from 'react-select'

import { CreateRoomFormInputs } from '../CreateRoom/CreateRoom'

import { defaultSelectStyle } from './constants'

type OptionsType = {
  value: string
  label: string
}

type SingleSelectProps<T> = {
  options: OptionsType[]
  selectStyle?: unknown
  control: Control<CreateRoomFormInputs, CreateRoomFormInputs>
  defaultValue?: OptionsType[]
  setState?: React.Dispatch<React.SetStateAction<T>>
  selectClassName?: string
  placeholder?: string
}

const SingleSelect: FC<SingleSelectProps<string>> = ({
  options,
  selectStyle,
  control,
  defaultValue,
  setState,
  selectClassName,
  placeholder,
}) => {
  const style = selectStyle ? selectStyle : defaultSelectStyle

  const defaultOptions: SingleSelectProps<string>['options'] =
    defaultValue ?? []

  return (
    <>
      <Controller
        name="userUsernames"
        control={control}
        render={({ field: { onChange, onBlur } }) => {
          return (
            <Select
              className={selectClassName}
              styles={style}
              options={options}
              onChange={(options) => {
                onChange(options?.value)

                console.log(options)

                return setState && setState(options?.value ?? '')
              }}
              onBlur={onBlur}
              defaultValue={defaultOptions}
              placeholder={placeholder}
            />
          )
        }}
      />
    </>
  )
}

export default SingleSelect
