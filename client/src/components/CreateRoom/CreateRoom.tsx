import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type CreateRoomFormInputs = {
  userOwnerId: number
  userIds: string[]
  isPrivate: boolean
  name: string
  profanityWords: string[]
}

const CreateRoom = () => {
  const [apiErrorMessage, setApiErrorMessage] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRoomFormInputs>()

  const onSubmit: SubmitHandler<CreateRoomFormInputs> = async (data) => {}

  return (
    <form
      action="POST"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center"
    >
      <input
        type="text"
        className="mt-2 outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        placeholder="Room name"
        {...register('name', { required: true })}
      />

      {errors.name && (
        <p className="mt-5 mb-5 text-red-500">This field is required</p>
      )}

      <input
        type="text"
        className="mt-2 outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        placeholder="Profanity Words"
        {...register('profanityWords', { required: true })}
      />

      {errors.profanityWords && (
        <p className="mt-5 mb-5 text-red-500">This field is required</p>
      )}

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
