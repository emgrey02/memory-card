import styles from './MemoryCard.module.css';

interface MemoryCardProps {
	imgUrl: string;
	name: string;
	team: string;
	handleCardClick: (name: string) => void;
}

export const MemoryCard = ({
	imgUrl,
	name,
	team,
	handleCardClick,
}: MemoryCardProps) => {
	return (
		<div className={styles.cardCtn}>
			<button
				className={styles.button}
				onClick={() => handleCardClick(name)}
			>
				<div className={styles.imgCtn}>
					<img className={styles.image} src={imgUrl} />
				</div>
				<h3 className={styles.name}>{name}</h3>
				<p className={styles.team}>{team}</p>
			</button>
		</div>
	);
};
