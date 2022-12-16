/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react'
import { Control, Controller } from 'react-hook-form'
import Select from 'react-select'

import { CreateRoomFormInputs } from '../CreateRoom/CreateRoom'

type OptionsType = {
  value: string
  label: string
}

type CustomSelectProps = {
  options: OptionsType[]
  selectStyle?: unknown
  control: Control<CreateRoomFormInputs, any>
  defaultValue?: OptionsType[]
  setSelectedUsers?: React.Dispatch<React.SetStateAction<string[]>>
}

const CustomSelect: FC<CustomSelectProps> = ({
  options,
  selectStyle,
  control,
  defaultValue,
  setSelectedUsers,
}) => {
  const defaultSelectStyle = {
    option: (provided: any, state: any) => ({
      ...provided,
      fontWeight: state.isSelected ? 'bold' : 'normal',
      color: 'white',
      backgroundColor: '#03a9f1 ',
      fontSize: 18,
    }),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    multiValue: (provided: any, _state: any) => ({
      ...provided,
      color: '#fff',
      fontSize: 18,
    }),
  }

  const style = selectStyle ? selectStyle : defaultSelectStyle

  const defaultOptions: OptionsType[] = defaultValue ?? []

  return (
    <>
      <Controller
        name="userUsernames"
        control={control}
        render={({ field: { onChange, onBlur } }) => {
          return (
            <Select
              styles={style}
              options={options}
              isMulti={true}
              onChange={(options) => {
                const userValues = options?.map((option) => option.value)
                onChange(userValues)

                setSelectedUsers && setSelectedUsers(userValues)
              }}
              onBlur={onBlur}
              defaultValue={defaultOptions}
            />
          )
        }}
      />
    </>
  )
}

export default CustomSelect
