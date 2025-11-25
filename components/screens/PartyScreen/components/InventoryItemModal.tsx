import { ModalBase } from "@/components/ui/ModalBase/ModalBase";
import { BattleOption } from "@/types/battle";
import { InventoryItemBase } from "@/types/character";
import { Dispatch, SetStateAction } from "react";

type InventoryItemModalProps = {
    isOpen: boolean;
    closeModal: Dispatch<SetStateAction<boolean>>;
    inventoryItem: BattleOption | InventoryItemBase | undefined;
}

export const InventoryItemModal = ({ isOpen, closeModal, inventoryItem }: InventoryItemModalProps) => {

    const handleClose = () => {
        closeModal(false)
    }

    const modalContent = (inventoryItem: BattleOption | InventoryItemBase | undefined) => {
        return (
            inventoryItem &&
            <div>
                <div>
                    < img src={inventoryItem.icon} />
                    <p>

                        {inventoryItem.title}
                    </p>
                    <p>
                        {inventoryItem.description}

                    </p>
                </div>
                <div className="mt-4 flex justify-center gap-4">
                    <button
                        className='rounded-full text-center text-2xl text-white p-4 m-1 hover:cursor-pointer disabled:cursor-not-allowed'
                        style={{
                            backgroundColor: '#8E9CC9',

                        }}
                    >
                        Use/Equip
                    </button>
                    <button
                        onClick={handleClose}
                        className='rounded-full text-center text-2xl text-white p-4 m-1 hover:cursor-pointer disabled:cursor-not-allowed'
                        style={{
                            backgroundColor: '#8E9CC9',
                        }}
                    >
                        Close
                    </button>
                </div>
            </div>
        )
    }

    if (!inventoryItem) null;

    return (
        <ModalBase
            isOpen={isOpen}
            type={"action"}
            closeModal={closeModal}
            title={"Inventory Item"}
            children={modalContent(inventoryItem)}
        />)
};