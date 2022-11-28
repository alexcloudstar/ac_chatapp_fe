/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react'
import { Control, Controller } from 'react-hook-form'
import Select from 'react-select'

import { randomColor } from 'utils/generateRandomColor'

import { CreateRoomFormInputs } from '../CreateRoom/CreateRoom'

type CustomSelectProps = {
  options: { value: string; label: string }[]
  selectStyle?: unknown
  control: Control<CreateRoomFormInputs, any>
}

const CustomSelect: FC<CustomSelectProps> = ({
  options,
  selectStyle,
  control,
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
      background: randomColor(),
    }),
  }

  const style = selectStyle ? selectStyle : defaultSelectStyle

  return (
    <>
      <Controller
        name="userUsernames"
        control={control}
        render={({ field: { value, onChange, onBlur } }) => {
          return (
            <Select
              styles={style}
              options={options}
              isMulti={true}
              onChange={(options) =>
                onChange(options?.map((option) => option.value))
              }
              onBlur={onBlur}
              value={options.filter((option) => value?.includes(option.value))}
              defaultValue={[options[2], options[3]]}
            />
          )
        }}
      />
    </>
  )
}

export default CustomSelect
