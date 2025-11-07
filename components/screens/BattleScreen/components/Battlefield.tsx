import { selectActiveOpponent } from '@/lib/features/battle/BattleSlice';
import { selectActiveCharacter } from '@/lib/features/character/CharacterSlice';
import { useAppSelector } from '@/lib/reduxHooks';
import Image from 'next/image';


const Battlefield = () => {
    const activeCharacter = useAppSelector(selectActiveCharacter);
    const activeOpponent = useAppSelector(selectActiveOpponent);

    const isBattlefieldActive = activeCharacter && activeOpponent;

    if (!isBattlefieldActive) {
        return null;
    }

    return (
        <div
            id='Battlefield'
            className="flex-1"
        >
            <div
                id='image-rail'
                className="h-full flex flex-col md:flex-row md:justify-between items-center p-6"
            >

                <Image
                    alt='Chosen player avatar'
                    src={activeCharacter.avatar}
                    width={125}
                    height={125}
                />
                <Image
                    alt='Chosen player avatar'
                    src={activeOpponent.avatar}
                    className='transform -scale-x-100'
                    width={125}
                    height={125}
                />
            </div>
        </div>
    )
}

export default Battlefield;