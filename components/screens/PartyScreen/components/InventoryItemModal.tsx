'use client';

import { ModalBase } from "@/components/ui/ModalBase/ModalBase";
import { BattleOption } from "@/types/battle";
import { InventoryItemBase } from "@/types/character";
import { Dispatch, SetStateAction } from "react";

type InventoryItemModalProps = {
    isOpen: boolean;
    closeModal: Dispatch<SetStateAction<boolean>>;
    inventoryItem: BattleOption | InventoryItemBase | undefined;
    handleInventorySelect: (inventoryOption: BattleOption | InventoryItemBase) => void;
}

export const InventoryItemModal = ({
    isOpen,
    closeModal,
    inventoryItem,
    handleInventorySelect,
}: InventoryItemModalProps) => {

    const handleClose = () => {
        closeModal(false)
    }

    let modalType: string = "";
    let actionButtonLabel: string = "";

    if (inventoryItem?.type === "attack" || inventoryItem?.type === "skill") {
        modalType = "read-only";
    } else if (inventoryItem?.type === "potion" || inventoryItem?.type === "ration") {
        actionButtonLabel = "Use"
        modalType = "action"
    } else if (inventoryItem?.type === "weapon" || inventoryItem?.type === "equipment") {
        actionButtonLabel = "Equip"
        modalType = "action"
    }



    const modalContent = (inventoryItem: BattleOption | InventoryItemBase | undefined) => {
        return (
            inventoryItem &&
            <div>
                <div>
                    < img
                        src={inventoryItem.icon}
                        alt={inventoryItem.title}
                    />
                    <p>

                        {inventoryItem.title}
                    </p>
                    <p>
                        {inventoryItem.description}

                    </p>
                </div>
                {
                    modalType === "action" &&

                    <div className="p-4 flex justify-center gap-4">
                        <button
                            className='rounded-full text-lg text-white px-6 py-3 w-32 m-1 hover:cursor-pointer disabled:cursor-not-allowed'
                            onClick={() => handleInventorySelect(inventoryItem)}
                            style={{
                                backgroundColor: '#8E9CC9',

                            }}
                        >
                            {actionButtonLabel}
                        </button>
                        <button
                            className='rounded-full text-lg text-white px-6 py-3 w-32 m-1 hover:cursor-pointer disabled:cursor-not-allowed'
                            onClick={handleClose}
                            style={{
                                backgroundColor: '#8E9CC9',
                            }}
                        >
                            Close
                        </button>
                    </div>
                }
            </div>
        )
    }

    if (!inventoryItem) return null;

    if (modalType === "read-only") {

        return (
            <ModalBase
                isOpen={isOpen}
                type={modalType}
                closeModal={closeModal}
                title={"Inventory Item"}
            >
                {modalContent(inventoryItem)}
            </ModalBase>
        )
    }


    if (modalType === "action") {
        return (
            <ModalBase
                isOpen={isOpen}
                type={modalType}
                closeModal={closeModal}
                title={"Inventory Item"}
            >
                {modalContent(inventoryItem)}
            </ModalBase>
        )
    }
};