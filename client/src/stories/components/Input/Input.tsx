import { FC, HTMLInputTypeAttribute } from 'react'
import { useForm } from 'react-hook-form'

type InputProps = {
  placeholder: string
  isRequired: boolean
  type: HTMLInputTypeAttribute | undefined
  name: string
  defaultValue?: string
}

export const Input: FC<InputProps> = ({
  name,
  type = 'text',
  isRequired,
  placeholder,
  defaultValue,
}) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm()

  return (
    <>
      <input
        type={type}
        className="mt-2 outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register(name, { required: isRequired })}
      />
      {errors[name] && (
        <p className="mt-5 mb-5 text-red-500">This field is required</p>
      )}
      Input value: {watch(name)}
    </>
  )
}
