import BackButton from "@/components/ui/BackButton/BackButton"
import styles from '../styles/paladin.module.css'

const Battlefield = () => {
    return (
        <div
            id='Battlefield'
            className="basis-3/4 bg-blue-200"
        >
            <h1 className='text-4xl font-bold'>Battlefield</h1>
            <BackButton />
            <div className={`${styles.paladin} ${styles.paladinAttack}`} />
        </div>
    )
}

export default Battlefield;