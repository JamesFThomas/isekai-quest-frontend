import { Character } from "@/types/character";

import Image from "next/image";

interface CharacterDisplayCardProps {
    character: Character;
    isActive?: boolean;
    onClick?: () => void;
}

const CharacterDisplayCard = ({ character }: CharacterDisplayCardProps) => {
    return (
        <div
            id="CharacterDisplayCard-wrapper"
            className=" flex flex-row md:flex-col md:items-stretch bg-[url('/background_images/parchment_paper.png')] bg-cover bg-no-repeat bg-center p-2 border-1 border-white rounded-lg"
        >
            <figure className='characeter-image w-full'>
                <Image
                    alt={character.name || 'Default Avatar'}
                    src={character.avatar || '/default_avatar.png'}
                    width={100}
                    height={100}
                />
            </figure>
            <div
                id="character-stats"
                className="w-full bg-black/50 text-white flex flex-col justify-center gap-1 p-1"
            >
                { /* Turn these into style bars using MaxHp and MaxMp characetr stats */}
                <div className=''>
                    <label className='block text-white text-sm font-bold'>
                        {character.name ?? 'N/A'}
                    </label>
                </div>
                <div className=''>
                    <label className='block text-white text-sm font-bold'>
                        HP: {character.hp ?? 'N/A'}
                    </label>
                </div>

                <div className=''>
                    <label className='block text-white text-sm font-bold'>
                        MP: {character.mp ?? 'N/A'}
                    </label>
                </div>
            </div>


        </div>
    );
}

export default CharacterDisplayCard;