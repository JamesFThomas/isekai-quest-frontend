'use client';

import { InventoryItemBase } from "@/types/character";
import { ReactNode } from "react";
import { ModalBase, ModalType } from "../../ModalBase/ModalBase";
import Image from "next/image";

type ItemPurchaseModalProps = {
    isOpen: boolean;
    closeModal: () => void;
    boothItem: InventoryItemBase | null;
    handleItemPurchase: (item: InventoryItemBase) => void;
};

export const ItemPurchaseModal = ({
    isOpen,
    closeModal,
    boothItem,
    handleItemPurchase,
}: ItemPurchaseModalProps) => {

    // const handleClose = () => {
    //     closeModal(false);
    //     boothItem = null;
    // };


    let modalType: ModalType = "action";
    let actionButtonLabel: string = "Purchase";
    let modalTitle: string = ""; // devise title based on item type

    switch (boothItem?.type) {
        case 'weapon':
            modalTitle = `Weapons`;
            break;
        case 'equipment':
            modalTitle = `Armor & Equipment`;
            break;
        case 'potion':
            modalTitle = `Potions`;
            break;
        case 'ration':
            modalTitle = `Rations`;
            break;
        default:
            modalTitle = `Sale Item`;
    }

    const modalContent = (boothItem: InventoryItemBase): ReactNode => {
        return (
            boothItem &&
            <div>
                <div className="p-4 flex flex-col items-center justify-center gap-4">
                    < Image
                        src={boothItem.icon}
                        alt={boothItem.title}
                        width={200}
                        height={200}
                    />
                    <p>

                        {boothItem.title}
                    </p>
                    <p>
                        {boothItem.description}

                    </p>
                </div>
                {
                    modalType === "action" &&

                    <div className="p-4 flex justify-center gap-4">
                        <button
                            className='rounded-full text-lg text-white px-6 py-3 w-32 m-1 hover:cursor-pointer disabled:cursor-not-allowed'
                            onClick={() => handleItemPurchase(boothItem)}
                            style={{
                                backgroundColor: '#8E9CC9',
                            }}
                        >
                            {actionButtonLabel}
                        </button>
                        <button
                            className='rounded-full text-lg text-white px-6 py-3 w-32 m-1 hover:cursor-pointer disabled:cursor-not-allowed'
                            onClick={closeModal}
                            style={{
                                backgroundColor: '#8E9CC9',
                            }}
                        >
                            Close
                        </button>
                    </div>
                }
            </div>
        );

    };

    if (!boothItem) return null;

    return (
        <ModalBase
            isOpen={isOpen}
            type={modalType}
            closeModal={closeModal}
            title={modalTitle}
        >
            {modalContent(boothItem)}
        </ModalBase>
    )

};