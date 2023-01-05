/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { useDeletePunishmentMutation } from 'store/services/punishment'
import { useCurrentUserQuery, useGetUserQuery } from 'store/services/users'
import { PunishmentType, ReduxQueryType, User } from 'types'

const Punishments: FC<{ punishments: User['punishments'] }> = ({
  punishments,
}) => {
  const { username } = useParams<{ username: string }>()

  const { refetch } = useGetUserQuery(username ?? '')

  const { data: user } = useCurrentUserQuery<ReduxQueryType<User>>()

  const [deletePunishment] = useDeletePunishmentMutation()

  const onDeletePunishment = async (punishmentId: PunishmentType['id']) => {
    await deletePunishment({ punishmentId })
    refetch()
  }

  return (
    <div className="flex flex-col">
      {punishments?.map((punishment) => {
        return (
          <div key={punishment.id} className="ml-4 flex">
            <h3 className="text-sm mb-10 bg-red-700 p-3 rounded-full mr-4">
              type: {punishment.type}
            </h3>
            <h3 className="text-sm mb-10 bg-red-700 p-3 rounded-full mr-4">
              duration: {punishment.duration} minutes
            </h3>
            <h3 className="text-sm mb-10 bg-red-700 p-3 rounded-full mr-4">
              reason: {punishment.reason}
            </h3>
            <h3 className="text-sm mb-10 bg-red-700 p-3 rounded-full mr-4">
              given by: {punishment.givenBy}
            </h3>
            {user?.isAdmin && (
              <button
                className="text-sm mb-10 bg-green-700 p-3 rounded-md"
                onClick={() => onDeletePunishment(punishment.id)}
              >
                Remove
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Punishments
