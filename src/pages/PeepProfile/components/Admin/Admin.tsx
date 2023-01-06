/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react'

import { PunishmentEnum } from 'types'

import { Confirmation } from './components'
import { ConfirmationPropsType } from './components/Confirmation/Confirmation'

const Admin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [punishment, setPunishment] =
    useState<ConfirmationPropsType['punishment']>()

  const toggleConfirmationModal = (punishmentType?: PunishmentEnum) => {
    setIsModalOpen(!isModalOpen)
    setPunishment(punishmentType)
  }

  return (
    <>
      {isModalOpen && (
        <Confirmation
          onClose={toggleConfirmationModal}
          punishment={punishment}
        />
      )}
      <div className="flex justify-evenly">
        <button
          className="bg-red-700 p-3 rounded-md"
          onClick={() => toggleConfirmationModal(PunishmentEnum.BAN)}
        >
          ban
        </button>
        <button
          className="bg-orange-700 p-3 rounded-md"
          onClick={() => toggleConfirmationModal(PunishmentEnum.MUTE)}
        >
          mute
        </button>
      </div>
    </>
  )
}

export default Admin
