import Image from 'next/image';

import BackButton from "@/components/ui/BackButton/BackButton"
// import styles from '../styles/paladin.module.css'

const Battlefield = () => {
    return (
        <div
            id='Battlefield'
            className="basis-3/4"
        >
            <BackButton />
            {/* <div className={`${styles.paladin} ${styles.paladinAttack}`} /> */}
            <div
                id='image-rail'
                className="h-full flex flex-col md:flex-row md:justify-between items-center p-6"
            >

                <Image
                    alt='Chosen player avatar'
                    src={'/character_avatars/paladin_avatar3.png'}
                    width={125}
                    height={125}
                />
                <Image
                    alt='Chosen player avatar'
                    src={'/opponent_avatars/goblin_avatar.png'}
                    className='transform -scale-x-100'
                    width={125}
                    height={125}
                />
            </div>
        </div>
    )
}

export default Battlefield;