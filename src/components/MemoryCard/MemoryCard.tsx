import styles from './MemoryCard.module.css';
import { useState } from 'react';

export const MemoryCard = ({ imgUrl = null, name, team }) => {
	const [selected, setSelected] = useState(false);

	const handleClick = () => {
		if (selected) {
			// reset current score
		} else {
			setSelected(true);
		}
	};

	return (
		<div className={styles.cardCtn}>
			<button className={styles.button} onClick={handleClick}>
				<div className={styles.imgCtn}>
					<img className={styles.image} src={imgUrl} />
				</div>
				<h3 className={styles.name}>{name}</h3>
				<p className={styles.team}>{team}</p>
			</button>
		</div>
	);
};
