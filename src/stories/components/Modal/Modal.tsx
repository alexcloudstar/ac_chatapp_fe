import React, { FC } from 'react';
import { CgCloseO } from 'react-icons/cg';

type ModalProps = {
  children: React.ReactNode;
  title: string;
  onClose: (_e: any, mode?: 'edit' | 'delete') => void;
  hasFooter?: boolean;
  footerContent?: React.ReactNode;
  classes?: string;
  isSmall?: boolean;
};

export const Modal: FC<ModalProps> = ({
  children,
  title,
  onClose,
  hasFooter,
  footerContent,
  isSmall,
}) => {
  return (
    <div className='absolute top-[50%] left-[50%] z-10 flex items-center justify-center w-full h-full text-white translate-y-[-50%] translate-x-[-50%]'>
      <div
        className={`relative flex flex-col h-fit p-[40px] bg-[#4a4a4ae6]/[90%] rounded-[10px]  ${
          isSmall ? 'w-[50%]' : 'w-[70%]'
        }`}
      >
        <h1 className='text-[24px] font-bold text-center'>{title}</h1>
        <div className='mt-6'>
          {children}
          <span
            className='absolute top-10 right-10 text-[24px] cursor-pointer'
            onClick={onClose}
          >
            <CgCloseO />
          </span>
        </div>
        {hasFooter && (
          <div className='flex items-end justify-end mt-5'>{footerContent}</div>
        )}
      </div>
    </div>
  );
};
