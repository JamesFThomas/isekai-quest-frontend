import { Character } from "@/types/character";

import Image from "next/image";

interface CharacterDisplayCardProps {
    character: Character;
    isActive?: boolean;
    onClick?: () => void;
}

const CharacterDisplayCard = ({ character, }: CharacterDisplayCardProps) => {
    return (
        <div
            id="CharacterDisplayCard-wrapper"
            className=" flex flex-col md:flex-row md:space-x-6 md:items-stretch bg-[url('/background_images/parchment_paper.png')] bg-cover bg-no-repeat bg-center p-4 border-2 border-white rounded-lg cursor-pointer"
        >
            <figure className='characeter-image w-full md:w-1/3 flex items-center justify-center md:h-auto'>
                <Image
                    alt={character.name || 'Default Avatar'}
                    src={character.avatar || '/default_avatar.png'}
                    width={400}
                    height={400}
                />
            </figure>
            <div
                id="character-stats-display"
                className="w-full md:w-2/3 border-2 border-white rounded-lg bg-black/50 text-white flex flex-col justify-center px-6 py-4 space-y-2"
            >
                { /* Turn these into style bars using MaxHp and MaxMp characetr stats */}
                <div className='mb-4'>
                    <label className='block text-white text-sm font-bold mb-2'>
                        Name: {character.name ?? 'N/A'}
                    </label>
                </div>
                <div className='mb-4'>
                    <label className='block text-white text-sm font-bold mb-2'>
                        HP: {character.hp ?? 'N/A'}
                    </label>
                </div>

                <div className='mb-4'>
                    <label className='block text-white text-sm font-bold mb-2'>
                        MP: {character.mp ?? 'N/A'}
                    </label>
                </div>
            </div>


        </div>
    );
}

export default CharacterDisplayCard;