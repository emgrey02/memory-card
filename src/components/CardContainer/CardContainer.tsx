import styles from './CardContainer.module.css';

export const CardContainer = ({ children }) => {
	return <section className={styles.section}>{children}</section>;
};
