import { FC } from 'react'
import { Control, Controller } from 'react-hook-form'
import Select from 'react-select'

import { CreateRoomFormInputs } from '../CreateRoom/CreateRoom'

import { defaultSelectStyle } from './constants'

type OptionsType = {
  value: string
  label: string
}

type MultiSelectProps<T> = {
  options: OptionsType[]
  selectStyle?: unknown
  control: Control<CreateRoomFormInputs, CreateRoomFormInputs>
  defaultValue?: OptionsType[]
  setState?: React.Dispatch<React.SetStateAction<T[]>>
  selectClassName?: string
  placeholder?: string
}

const MultiSelect: FC<MultiSelectProps<string>> = ({
  options,
  selectStyle,
  control,
  defaultValue,
  setState,
  selectClassName,
  placeholder,
}) => {
  const style = selectStyle ? selectStyle : defaultSelectStyle
  const defaultOptions: MultiSelectProps<string>['options'] = defaultValue ?? []

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
              isMulti
              onChange={(options) => {
                const userValues = options?.map((option) => option.value)
                onChange(userValues)

                return setState && setState(userValues)
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

export default MultiSelect
