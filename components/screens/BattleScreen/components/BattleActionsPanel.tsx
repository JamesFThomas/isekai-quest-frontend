
interface BattleActionsPanelProps {
    isVisible: boolean
    className?: string
}


const BattleActionsPanel = ({ isVisible, className }: BattleActionsPanelProps) => {
    return (
        <div
            id="BattleActions-panel"
            className={`flex flex-col items-center ${isVisible ? '' : 'hidden'} ${className ?? ''}`}
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