import styles from './ScoreCard.module.css';

interface ScoreCardProps {
	currentScore: number;
	bestScore: number;
}

export const ScoreCard = ({ currentScore, bestScore }: ScoreCardProps) => {
	return (
		<section className={styles.section}>
			<div className={styles.scoreGridCtn}>
				<h2 className={styles.h2}>Score</h2>
				<div className={styles.scoreGrid}>
					<p>Current: </p>
					<p className={styles.currentScore}>{currentScore}</p>
					<p>Best: </p>
					<p className={styles.bestScore}>{bestScore}</p>
				</div>
			</div>
		</section>
	);
};
