/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { CustomSelect } from 'components'
import { useGetConversationsQuery } from 'store/services/conversations'
import { useAddPunishmentMutation } from 'store/services/punishment'
import { useCurrentUserQuery, useGetUsersQuery } from 'store/services/users'
import { Modal } from 'stories'
import { PunishmentEnum } from 'types'

export type ConfirmationPropsType = {
  onClose: () => void
  punishment: PunishmentEnum | undefined
}

const Confirmation: FC<ConfirmationPropsType> = ({ onClose, punishment }) => {
  const { username } = useParams()
  const [punishmentTime, setPunishmentTime] = useState<string[]>([''])
  const [selectedRoom, setSelectedRoom] = useState<string[]>([''])
  const [reason, setReason] = useState<string>('')

  const { data: me } = useCurrentUserQuery()
  const { data: users } = useGetUsersQuery()
  const { data: conversations } = useGetConversationsQuery(null)

  const [addPunishment] = useAddPunishmentMutation()

  const { control } = useForm<any>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const punishOptions = [
    {
      label: '5 minutes',
      value: '5',
    },
    {
      label: '10 minutes',
      value: '10',
    },
    {
      label: '15 minutes',
      value: '15',
    },
    {
      label: '30 minutes',
      value: '30',
    },
    {
      label: '60 minutes',
      value: '60',
    },
    {
      label: '120 minutes',
      value: '120',
    },
    {
      label: '24 hours',
      value: '1440',
    },
    {
      label: 'Permanent',
      value: '9999999999999999999999999999',
    },
  ]

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setReason(e.target.value)

  const onSubmit = async () => {
    if (punishment && me) {
      await addPunishment({
        chatroomId: parseInt(selectedRoom[0]),
        currentUser: me,
        userId: users?.find((user) => user.username === username)?.id ?? -1,
        reason: reason,
        type: punishment,
        duration: parseInt(punishmentTime[0]),
      })

      onClose()
    }
  }

  return (
    <Modal
      title="Are you sure?"
      onClose={onClose}
      hasFooter
      footerContent={
        <div>
          <button
            className="btn btn-secondary bg-green-700 px-4 py-2 text-white rounded-md mr-4"
            onClick={onClose}
          >
            No
          </button>
          <button
            className="btn btn-primary bg-red-700 px-4 py-2 text-white rounded-md"
            onClick={onSubmit}
          >
            Yes
          </button>
        </div>
      }
    >
      <p className="text-center">
        Are you want to{' '}
        <strong className="text-red-500">{punishment?.toLowerCase()}</strong>{' '}
        user <strong>{username}</strong>?
      </p>
      <CustomSelect
        options={punishOptions}
        control={control}
        selectClassName="w-1/5 text-left block my-4 mx-auto bg-red-500"
        placeholder="Select duration"
        setSelectedUsers={setPunishmentTime}
      />
      <CustomSelect
        placeholder="Select room"
        options={
          conversations?.map((conversation) => ({
            label: conversation.name,
            value: conversation.id.toString(),
          })) ?? []
        }
        control={control}
        selectClassName="w-1/5 text-left block my-4 mx-auto bg-red-500"
        setSelectedUsers={setSelectedRoom}
      />
      <input
        placeholder="Reason"
        type="text"
        name="reason"
        required
        className="w-1/5 outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block my-4 mx-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        value={reason}
        onChange={onChange}
      />
    </Modal>
  )
}

export default Confirmation
