import { ChangeEvent, useLayoutEffect, useState } from 'react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'

import {
  ConversationType,
  UpdateConversationType,
} from 'components/ChatList/types'
import {
  useDeleteConversationMutation,
  useGetConversationQuery,
  useUpdateConversationMutation,
} from 'store/services/conversations'
import { useCurrentUserQuery } from 'store/services/users'
import { Icon, Modal } from 'stories/components'
import { ReduxQueryType, User } from 'types'

import { ModalContentType } from './types'

const Header = () => {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isEditModal, setIsEditModal] = useState<boolean>(false)
  const [roomNameValue, setRoomNameValue] = useState<ConversationType['name']>(
    ''
  )
  const [chatroomName, setChatroomName] = useState<ConversationType['name']>('')

  const { data: user } = useCurrentUserQuery<ReduxQueryType<User>>()

  const { data: conversation } = useGetConversationQuery<
    ReduxQueryType<ConversationType>
  >({ roomId: roomId ? +roomId : -1 })

  const [updateRoom] = useUpdateConversationMutation<
    ReduxQueryType<UpdateConversationType>
  >()

  const [deleteRoom] = useDeleteConversationMutation<
    ReduxQueryType<ConversationType['id']>
  >()

  const onDeleteRoom = async (): Promise<void> => {
    await deleteRoom(roomId ?? '')
    setIsModalOpen(false)
    navigate('/')
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setRoomNameValue(e.target.value)

  const onChangeName = async (): Promise<void> => {
    setIsEditModal(false)
    setIsModalOpen(false)
    setChatroomName(roomNameValue)

    await updateRoom({
      id: roomId ?? '',
      name: roomNameValue ?? conversation?.name,
      profanityWords: conversation?.profanityWords,
      isPrivate: conversation?.isPrivate,
    })
  }

  const onToggleModal = (mode?: 'edit' | 'delete'): void => {
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
    onConfirm: onChangeName,
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
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 mt-4 text-red-700"
              placeholder="Room name"
              value={roomNameValue}
              onChange={onChange}
            />
          )}
        </Modal>
      )}
      <div className="conversation-header flex items-center justify-center">
        <h1 className="mr-2">{chatroomName}</h1>
        {conversation?.userOwnerId === user?.id && (
          <div className="actions flex">
            <Icon
              icon={<FaTrashAlt />}
              onClick={() => onToggleModal('delete')}
              classes="mx-4 text-[22px]"
            />
            <Icon
              icon={<FaEdit />}
              onClick={() => onToggleModal('edit')}
              classes="text-[22px]"
            />
          </div>
        )}
      </div>
    </>
  )
}

export default Header
