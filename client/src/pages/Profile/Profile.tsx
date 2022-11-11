import { useForm } from 'react-hook-form'

import {
  useCurrentUserQuery,
  useUpdateUserMutation,
} from '@/store/services/users'
import { Avatar } from '@/stories'
import { ReduxQueryType, User } from '@/types'

export interface IProfileFormProps {
  username?: User['username']
  avatar?: User['avatar']
  password?: User['password']
  email?: User['email']
  name?: User['name']
}

const Profile = () => {
  const {
    data: me,
    error,
    isLoading,
  } = useCurrentUserQuery<ReduxQueryType<User>>()

  const [updateUser, { error: updateUserError }] =
    useUpdateUserMutation<ReduxQueryType<IProfileFormProps>>()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfileFormProps>()

  // TODO: Check for empty string & exclude from request

  const onSubmit = async (data: IProfileFormProps) => {
    const body = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== '')
    )

    await updateUser({
      id: me.id,
      body,
    })
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Avatar user={me} width={120} height={120} classes="mb-5" />

      <h1 className="text-2xl mb-10">Configure your profile</h1>
      <form
        action="POST"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center w-6/12"
      >
        <input
          type="text"
          className="outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white mb-3"
          placeholder="Name"
          defaultValue={me?.name}
          {...register('name', { required: true })}
        />
        {errors.name && (
          <p className="mt-5 mb-5 text-red-500">This field is required</p>
        )}

        <input
          type="text"
          className="outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white mb-3"
          placeholder="Username"
          defaultValue={me?.username}
          {...register('username', { required: true })}
        />
        {errors.username && (
          <p className="mt-5 mb-5 text-red-500">This field is required</p>
        )}

        <input
          type="text"
          className="outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white mb-3"
          placeholder="Avatar"
          defaultValue={me?.avatar}
          {...register('avatar')}
        />
        {errors.avatar && (
          <p className="mt-5 mb-5 text-red-500">This field is required</p>
        )}

        <input
          type="email"
          className="outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white mb-3"
          placeholder="Email"
          defaultValue={me?.email}
          {...register('email', { required: true })}
        />
        {errors.email && (
          <p className="mt-5 mb-5 text-red-500">This field is required</p>
        )}

        <input
          type="password"
          className="outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white mb-3"
          placeholder="Password"
          {...register('password')}
        />
        {errors.password && (
          <p className="mt-5 mb-5 text-red-500">This field is required</p>
        )}

        <input
          type="password"
          className="outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white mb-3"
          placeholder="Confirm Password"
          {...register('password')}
        />
        {errors.password && (
          <p className="mt-5 mb-5 text-red-500">This field is required</p>
        )}

        <button
          type="submit"
          className="mt-5 mb-5 bg-white p-2 text-black rounded-xl	w-24 ease-in duration-150 hover:bg-slate-400 hover:text-white"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Profile
