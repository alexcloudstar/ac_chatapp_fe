import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Select from 'react-select'

import { Toggle } from '@/stories/components'
import { useGetUsersQuery } from '@/store/services/users'

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

  const { data: users, error, isLoading } = useGetUsersQuery()

  const onSubmit: SubmitHandler<CreateRoomFormInputs> = async (data) => {}

  console.table(users)

  const usersOptions =
    users?.map((user) => ({
      value: user.username || user.email,
      label: user.username || user.email,
    })) ?? []

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'red' : 'blue',
      // padding: 20,
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      // width: 200,
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1
      const transition = 'opacity 300ms'

      return { ...provided, opacity, transition }
    },
  }

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
              defaultValue={[usersOptions[2], usersOptions[3]]}
              isMulti
              name="colors"
              options={usersOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              styles={customStyles}
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
