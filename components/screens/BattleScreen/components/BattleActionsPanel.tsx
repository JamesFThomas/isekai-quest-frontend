import { useRouter } from "next/navigation"

import {
    selectCharacterAttacks,
    selectCharacterSkills,
    selectCharacterPotions
} from "@/lib/features/battle/BattleSlice"

import { useAppSelector } from "@/lib/reduxHooks";
import { useState } from "react";
import BattleActionsModal from "./BattleActionsModal";

interface BattleActionsPanelProps {
    isVisible: boolean
    className?: string
}

const BattleActionsPanel = ({ isVisible, className }: BattleActionsPanelProps) => {
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalOptions, setModalOptions] = useState<string[]>()
    const [modalType, setModalType] = useState<'Attack' | 'Skill' | 'Item'>('Attack');

    const characterAttacks = useAppSelector(selectCharacterAttacks);
    const characterSkills = useAppSelector(selectCharacterSkills);
    const characterPotions = useAppSelector(selectCharacterPotions);

    const handleModalState = () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleAttackClick = () => {
        setModalOptions(characterAttacks ?? []);
        handleModalState();
        setModalType('Attack');
    }

    const handleSkillClick = () => {
        setModalOptions(characterSkills ?? []);
        handleModalState();
        setModalType('Skill');
    }

    const handleItemClick = () => {
        setModalOptions(characterPotions ?? []);
        handleModalState();
        setModalType('Item');
    }

    return (
        <div
            id="BattleActions-panel"
            className={`grid grid-cols-2 md:grid-cols-1 gap-3 bg-slate-100/30 backdrop-blur-sm rounded-2xl shadow-md p-4 ${isVisible ? '' : 'hidden'} ${className ?? ''}`}
        >
            <h3 className="col-span-2 md:col-span-1 text-center font-semibold">Actions Panel Test</h3>
            <button
                className="w-full px-4 py-3 rounded-xl font-semibold shadow-sm border border-black/10 bg-transparent backdrop-blur-sm hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 active:scale-[0.99] transition"
                onClick={handleAttackClick}
            > Attack</button>
            <button
                className="w-full px-4 py-3 rounded-xl font-semibold shadow-sm border border-black/10 bg-transparent backdrop-blur-sm hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 active:scale-[0.99] transition"
                onClick={handleSkillClick}
            > Skill</button>
            <button
                className="w-full px-4 py-3 rounded-xl font-semibold shadow-sm border border-black/10 bg-transparent backdrop-blur-sm hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 active:scale-[0.99] transition"
                onClick={handleItemClick}
            > Item </button>
            <button
                className="w-full px-4 py-3 rounded-xl font-semibold shadow-sm border border-black/10 bg-transparent backdrop-blur-sm hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 active:scale-[0.99] transition text-red-900 hover:text-red-800"
                onClick={() => router.back()}
            > Flee</button>

            <BattleActionsModal
                isOpen={isModalOpen}
                closeModal={setIsModalOpen}
                modalOptions={modalOptions}
                type={modalType}
            />

        </div >
    )
}

export default BattleActionsPanel