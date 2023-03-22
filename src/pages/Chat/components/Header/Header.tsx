/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { ChangeEvent, useLayoutEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'

import { MultiSelect } from 'components'
import {
  ConversationType,
  UpdateConversationType,
} from 'components/ChatList/types'
import { CreateRoomFormInputs } from 'components/CreateRoom/CreateRoom'
import {
  useDeleteConversationMutation,
  useGetConversationQuery,
  useUpdateConversationMutation,
} from 'store/services/conversations'
import { useCurrentUserQuery, useGetUsersQuery } from 'store/services/users'
import { Icon, Modal } from 'stories/components'
import { type ReduxQueryType, type User } from 'types'

import { type ModalContentType } from './types'

const Header = () => {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isEditModal, setIsEditModal] = useState<boolean>(false)
  const [roomNameValue, setRoomNameValue] =
    useState<ConversationType['name']>('')
  const [chatroomName, setChatroomName] = useState<ConversationType['name']>('')

  const { control } = useForm<CreateRoomFormInputs>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const parsedRoomId = roomId ? +roomId : -1

  const { data: user } = useCurrentUserQuery<ReduxQueryType<User>>()

  const { data: conversation, refetch } = useGetConversationQuery<
    ReduxQueryType<ConversationType>
  >({
    roomId: parsedRoomId,
  })

  const { data: me } = useCurrentUserQuery<ReduxQueryType<User>>()

  const { data: users } = useGetUsersQuery<ReduxQueryType<User[]>>()

  const joinedUsers =
    conversation?.users
      ?.filter((user) => user?.username !== me?.username)
      ?.map((user) => ({
        value: user.username || user.email,
        label: user.username || user.email,
      })) ?? []

  const allUsers =
    users?.map((user) => ({
      value: user.username || user.email,
      label: user.username || user.email,
    })) ?? []

  const [selectedUsers, setSelectedUsers] = useState<string[]>(
    joinedUsers.map((user) => user.value)
  )

  const [updateRoom] =
    useUpdateConversationMutation<ReduxQueryType<UpdateConversationType>>()

  const [deleteRoom] =
    useDeleteConversationMutation<ReduxQueryType<ConversationType['id']>>()

  const onDeleteRoom = async (): Promise<void> => {
    await deleteRoom(parsedRoomId)
    setIsModalOpen(false)
    navigate('/')
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setRoomNameValue(e.target.value)

  const onUpdateRoom = async (): Promise<void> => {
    setIsEditModal(false)
    setIsModalOpen(false)
    setChatroomName(roomNameValue)

    await updateRoom({
      id: parsedRoomId,
      name: roomNameValue ?? conversation?.name,
      profanityWords: conversation?.profanityWords,
      isPrivate: conversation?.isPrivate,
      users: selectedUsers,
    })

    refetch()
  }

  const onToggleModal = (
    _e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    mode?: 'edit' | 'delete'
  ): void => {
    const isEdit = mode === 'edit'

    setIsEditModal(isEdit)

    setIsModalOpen(!isModalOpen)
  }

  const deleteModalContent: ModalContentType = {
    title: 'Delete room',
    content: 'Are you sure you want to delete this room?',
    confirmText: 'Delete',
    onConfirm: onDeleteRoom,
  }

  const editModalContent: ModalContentType = {
    title: 'Edit room',
    content: 'Please enter you new room name',
    confirmText: 'Save',
    onConfirm: onUpdateRoom,
  }

  const modalContent: ModalContentType = isEditModal
    ? editModalContent
    : deleteModalContent

  useLayoutEffect(() => {
    setRoomNameValue(conversation?.name)
    setChatroomName(conversation?.name)
  }, [conversation?.name])

  return (
    <>
      {isModalOpen && (
        <Modal
          title={modalContent.title}
          onClose={onToggleModal}
          isSmall
          hasFooter
          footerContent={
            <>
              <button
                className="px-4 py-2 text-white bg-gray-500 rounded-md mr-4"
                onClick={onToggleModal}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 text-white ${
                  isEditModal ? 'bg-emerald-500' : 'bg-red-500'
                } rounded-md`}
                onClick={modalContent.onConfirm}
              >
                {modalContent.confirmText}
              </button>
            </>
          }
        >
          <p className="text-center">{modalContent.content}</p>
          {isEditModal && (
            <>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 mt-4 text-red-700"
                placeholder="Room name"
                value={roomNameValue}
                onChange={onChange}
              />
              <div className="w-full">
                <MultiSelect
                  defaultValue={joinedUsers}
                  options={allUsers}
                  control={control}
                  setState={setSelectedUsers}
                />
              </div>
            </>
          )}
        </Modal>
      )}
      <div className="conversation-header flex items-center justify-evenly xl:w-3/12 hide-mobile">
        <h1 className="mr-2">{chatroomName}</h1>
        {conversation?.userOwnerId === user?.id && (
          <div className="actions flex">
            <Icon
              icon={<FaTrashAlt />}
              // @ts-ignore
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                onToggleModal(e, 'delete')
              }
              classes="mx-4 text-[22px]"
            />
            <Icon
              icon={<FaEdit />}
              // @ts-ignore
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                onToggleModal(e, 'edit')
              }
              classes="text-[22px]"
            />
          </div>
        )}
      </div>
    </>
  )
}

export default Header
