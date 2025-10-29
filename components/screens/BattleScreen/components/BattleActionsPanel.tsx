import { useRouter } from "next/navigation"

interface BattleActionsPanelProps {
    isVisible: boolean
    className?: string
}


const BattleActionsPanel = ({ isVisible, className }: BattleActionsPanelProps) => {
    const router = useRouter();
    return (
        <div
            id="BattleActions-panel"
            className={`grid grid-cols-2 md:grid-cols-1 gap-3 bg-slate-100/30 backdrop-blur-sm rounded-2xl shadow-md p-4 ${isVisible ? '' : 'hidden'} ${className ?? ''}`}
        >
            <h3 className="col-span-2 md:col-span-1 text-center font-semibold">Actions Panel Test</h3>
            <button
                className="w-full px-4 py-3 rounded-xl font-semibold shadow-sm border border-black/10 bg-transparent backdrop-blur-sm hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 active:scale-[0.99] transition"
            > Attack</button>
            <button
                className="w-full px-4 py-3 rounded-xl font-semibold shadow-sm border border-black/10 bg-transparent backdrop-blur-sm hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 active:scale-[0.99] transition"
            > Skill</button>
            <button
                className="w-full px-4 py-3 rounded-xl font-semibold shadow-sm border border-black/10 bg-transparent backdrop-blur-sm hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 active:scale-[0.99] transition"
            > Inventory </button>
            <button
                className="w-full px-4 py-3 rounded-xl font-semibold shadow-sm border border-black/10 bg-transparent backdrop-blur-sm hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 active:scale-[0.99] transition text-red-900 hover:text-red-800"
                onClick={() => router.back()}
            > Flee</button>

        </div >
    )
}

export default BattleActionsPanel