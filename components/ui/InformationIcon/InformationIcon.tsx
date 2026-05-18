"use client";

import { InformationContentObject } from "@/data/information/InformationContent";
import { InformationContent, InformationPageKey } from "@/types/information";
import Image from "next/image";
import { ModalBase } from "../ModalBase/ModalBase";
import { useState } from "react";

type InformationIconProps = {
  pageKey: InformationPageKey;
};

export const InformationIcon = ({ pageKey }: InformationIconProps) => {
  const content = InformationContentObject[pageKey];
  const modalType = "read-only";

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!content) {
    return null;
  }

  const modalContent = (pageContent: InformationContent | undefined) => {
    return (
      pageContent && (
        <div className="information-icon flex flex-col justify-center items-center gap-4 p-4 w-full min-w-[min(80vw,700px)]">
          <Image
            src={pageContent.imageSrc}
            alt={`${pageContent.title} Icon`}
            width={800}
            height={800}
            className="w-full h-auto"
          />
          <div className="whitespace-pre-line leading-snug text-center">
            {pageContent.content}
          </div>
        </div>
      )
    );
  };

  return (
    <div className="informationIconButton-container">
      <button
        className={`flex flex-row justify-center items-center hover:cursor-pointer `}
        onClick={() => setIsModalOpen(true)}
      >
        <Image
          src={"/information_images/information_icon.png"}
          alt={"Information Icon"}
          width={125}
          height={125}
          className="flex items-center justify-center hover:scale-125"
        />
      </button>
      <ModalBase
        isOpen={isModalOpen}
        type={modalType}
        closeModal={setIsModalOpen}
        title={""}
      >
        {modalContent(content)}
      </ModalBase>
    </div>
  );
};
