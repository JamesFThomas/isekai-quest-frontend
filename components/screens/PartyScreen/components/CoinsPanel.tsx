import { Coins } from "@/types/character";
import Image from "next/image";


export function formatCoinsForDisplay(coins?: Coins) {
    const order: Array<keyof Coins> = ['gold', 'silver', 'copper'];

    return order.map((key) => ({
        icon: `/inventory_icons/${key}Coin_icon.png',`,
        title: key.charAt(0).toUpperCase() + key.slice(1),
        count: coins ? (coins[key] ?? 0) : 0, // shows negatives to allow me to detect logic error later
    }));
}

interface CoinsPanelProps {
    coins: Coins | undefined
}


const CoinsPanel = ({ coins }: CoinsPanelProps) => {

    const coinData = formatCoinsForDisplay(coins)

    return (
        <div
            id="CoinPanel-wrapper"
            className=" flex flex-row md:flex-col md:items-stretch p-2"
        >
            {coinData.map((coin) => (
                <>
                    <figure className='CoinPanel-image w-full'>
                        <Image
                            alt={`${coin.title}Coin-image`}
                            src={coin.icon ?? ''}
                            width={100}
                            height={100}
                        />
                    </figure>
                    <div
                        id="CoinPanel-count"
                        className="w-full text-white flex flex-col justify-center gap-1 p-1"
                    >
                        <div className=''>
                            <label className='block text-white text-sm font-bold'>
                                {coin.title} - {coin.count}
                            </label>
                        </div>
                    </div>
                </>
            ))}

        </div>
    )
}

export default CoinsPanel;