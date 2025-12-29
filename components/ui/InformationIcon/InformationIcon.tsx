'use client';

import { InformationContentObject } from '@/data/information/InformationContent';
import { InformationContent, InformationPageKey } from '@/types/information';
import Image from 'next/image';
import { ModalBase } from '../ModalBase/ModalBase';
import { useState } from 'react';

type InformationIconProps = {
  pageKey: InformationPageKey;
};

export const InformationIcon = ({ pageKey }: InformationIconProps) => {
  const content = InformationContentObject[pageKey];
  const modalType = 'read-only';

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!content) {
    return null;
  }

  const modalContent = (pageContent: InformationContent | undefined) => {
    return (
      pageContent && (
        <div className='information-icon'>
          <h1>{pageContent.title}</h1>
          <Image
            src={pageContent.imageSrc}
            alt={`${pageContent.title} Icon`}
            width={125}
            height={125}
          />
          <div>{pageContent.content}</div>
        </div>
      )
    );
  };

  return (
    <div className='informationIconButton-container'>
      <button
        className={`flex flex-row justify-center items-center hover:cursor-pointer `}
        onClick={() => setIsModalOpen(true)}
      >
        <Image
          src={'/homescreen_icons/backStep_image.png'}
          alt={'Information Icon'}
          width={125}
          height={125}
          className='flex items-center justify-center'
        />
      </button>
      <ModalBase
        isOpen={isModalOpen}
        type={modalType}
        closeModal={setIsModalOpen}
        title={'Inventory Item'}
      >
        {modalContent(content)}
      </ModalBase>
    </div>
  );
};
