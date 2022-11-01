/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Select from 'react-select'

import {
  useAddConversationMutation,
  useConversationsQuery,
} from '@/store/services/conversations'
import { useGetUsersQuery } from '@/store/services/users'
import { Toggle } from '@/stories/components'

import { ApiState } from '..'

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

  const [addRoom, { error: addRoomError }] = useAddConversationMutation()

  const { refetch } = useConversationsQuery(null, {
    refetchOnMountOrArgChange: true,
  })

  const createRoom = () => {
    // try {
    //   await addRoom({
    //     userIds: ['2'],
    //     name: 'Room From Frontend 2',
    //     profanityWords: ['drugs', 'drug'],
    //     isPrivate: true,
    //   })
    //   refetch()
    // } catch (error) {
    //   console.log(error)
    // }
  }

  const onSubmit: SubmitHandler<CreateRoomFormInputs> = async (data) => {}

  const usersOptions =
    users?.map((user) => ({
      value: user.username || user.email,
      label: user.username || user.email,
    })) ?? []

  const randomColor = (): string =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`

  const selectStyle = {
    option: (provided: any, state: any) => ({
      ...provided,
      fontWeight: state.isSelected ? 'bold' : 'normal',
      color: 'white',
      backgroundColor: '#03a9f1 ',
      fontSize: 18,
    }),
    multiValue: (provided, state) => ({
      ...provided,
      color: '#fff',
      fontSize: 18,
      background: randomColor(),
    }),
  }

  if (error)
    return (
      <ApiState
        errorMessage={error?.data?.message || addRoomError?.data?.message}
      />
    )

  if (isLoading) return <ApiState />

  return (
    <form
      action="POST"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-end"
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

        <div className="flex w-full mt-5">
          <div className="w-full">
            <Select
              defaultValue={[usersOptions[2], usersOptions[3]]}
              isMulti
              name="colors"
              options={usersOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              styles={selectStyle}
            />
          </div>

          <div className="w-full flex justify-center items-center">
            <p className="text-gray-900 dark:text-gray-100 mr-5 text-lg">
              Private
            </p>
            <Toggle isOn={isPrivate} setIsOn={setIsPrivate} />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <button
          type="submit"
          className="mt-5 mb-5 bg-white p-2 text-black rounded-xl	w-24"
          onClick={createRoom}
        >
          Create
        </button>
      </div>
    </form>
  )
}

export default CreateRoom
