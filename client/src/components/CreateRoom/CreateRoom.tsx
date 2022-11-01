import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Select from 'react-select'

import { Toggle } from '@/stories/components'

type CreateRoomFormInputs = {
  userOwnerId: number
  userIds: string[]
  isPrivate: boolean
  name: string
  profanityWords: string[]
}

const CreateRoom = () => {
  const [apiErrorMessage, setApiErrorMessage] = useState<string>('')
  const [isPrivate, setIsPrivate] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRoomFormInputs>()

  const onSubmit: SubmitHandler<CreateRoomFormInputs> = async (data) => {}

  const colourOptions = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
    { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
  ]

  return (
    <form
      action="POST"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center"
    >
      <div className="w-full flex flex-col">
        <div className="flex w-full">
          <div className="w-full">
            <input
              type="text"
              className="mt-2 outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Room name"
              {...register('name', { required: true })}
            />

            {errors.name && (
              <p className="mt-5 mb-5 text-red-500">This field is required</p>
            )}
          </div>

          <div className="w-full">
            <input
              type="text"
              className="mt-2 outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Profanity Words"
              {...register('profanityWords', { required: true })}
            />

            {errors.profanityWords && (
              <p className="mt-5 mb-5 text-red-500">This field is required</p>
            )}
          </div>
        </div>

        <div className="flex w-full">
          <div className="w-full">
            <Select
              defaultValue={[colourOptions[2], colourOptions[3]]}
              isMulti
              name="colors"
              options={colourOptions}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>

          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-900 dark:text-gray-100">Private</p>
            <Toggle isOn={isPrivate} setIsOn={setIsPrivate} />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-5 mb-5 bg-white p-2 text-black rounded-xl	w-24"
      >
        submit
      </button>
    </form>
  )
}

export default CreateRoom
