import React, { FC } from 'react'
import { CgCloseO } from 'react-icons/cg'

import styles from './modal.module.css'

type ModalProps = {
  children: React.ReactNode
  title: string
  onClose: () => void
  hasFooter?: boolean
  footerContent?: React.ReactNode
}

export const Modal: FC<ModalProps> = ({
  children,
  title,
  onClose,
  hasFooter,
  footerContent,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.content}>
          {children}
          <span className={styles.closeIcon} onClick={onClose}>
            <CgCloseO />
          </span>
        </div>
        {hasFooter && <div className={styles.footer}>{footerContent}</div>}
      </div>
    </div>
  )
}
