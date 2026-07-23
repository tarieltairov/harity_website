import type { ReactNode } from 'react';
import styles from './Footer.module.scss';

interface FooterColumnProps {
    title: string;
    children: ReactNode;
}

export function FooterColumn({ title, children }: FooterColumnProps) {
    return (
        <div className={styles.column}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
}
