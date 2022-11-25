import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import {
  useAddConversationMutation,
  useConversationsQuery,
} from 'store/services/conversations'
import { useGetUsersQuery } from 'store/services/users'
import { Toggle } from 'stories/components'
import { ReduxQueryType, User } from 'types'

import { CustomSelect } from '..'

export type CreateRoomFormInputs = {
  userOwnerId: number
  userUsernames: string[]
  isPrivate: boolean
  name: string
  profanityWords: string
}

const CreateRoom: FC<{ toggleModal: () => void }> = ({ toggleModal }) => {
  const [isPrivate, setIsPrivate] = useState<boolean>(false)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRoomFormInputs>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const { data: users } = useGetUsersQuery<ReduxQueryType<User[]>>()

  const [addRoom] =
    useAddConversationMutation<ReduxQueryType<CreateRoomFormInputs>>()

  const { refetch } = useConversationsQuery(null, {
    refetchOnMountOrArgChange: true,
  })

  const onSubmit: SubmitHandler<CreateRoomFormInputs> = async (data) => {
    let profanityWords = data.profanityWords.includes(',')
      ? data.profanityWords.split(',')
      : data.profanityWords.split(' ')

    profanityWords = profanityWords.map((word) => word.replace(/\s/g, ''))

    try {
      await addRoom({
        userUsernames: data.userUsernames,
        name: data.name,
        profanityWords,
        isPrivate,
      })
      refetch()
    } catch (error) {
      console.log(error)
    }
    toggleModal()
  }

  const usersOptions =
    users?.map((user) => ({
      value: user.username || user.email,
      label: user.username || user.email,
    })) ?? []

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
            <CustomSelect options={usersOptions} control={control} />
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
        >
          Create
        </button>
      </div>
    </form>
  )
}

export default CreateRoom
