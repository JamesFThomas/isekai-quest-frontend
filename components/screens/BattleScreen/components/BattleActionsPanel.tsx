
interface BattleActionsPanelProps {
    isVisible: boolean
}


const BattleActionsPanel = ({ isVisible }: BattleActionsPanelProps) => {
    return (
        <div
            id="BattleActions-panel"
            className={`flex flex-col basis-2/4 shrink-0 bg-purple-200 items-center ${isVisible ? '' : 'hidden'}`}
        >
            <h3>Actions Panel Test</h3>
            <button> Attack</button>
            <button> Skill</button>
            <button> Inventory </button>
            <button> Flee</button>

        </div >
    )
}

export default BattleActionsPanel