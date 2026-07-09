import styles from './CardContainer.module.css';

interface ContainerProps {
	children: React.ReactNode;
}

export const CardContainer = ({ children }: ContainerProps) => {
	return <section className={styles.section}>{children}</section>;
};
