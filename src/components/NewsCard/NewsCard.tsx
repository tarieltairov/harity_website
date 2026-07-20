import type { ReactNode } from 'react';
import styles from './NewsCard.module.scss'
import { Button } from '@/ui/Button';

interface NewsCardProps {
    image: string;
    category: ReactNode;
    date: string;
    title: string;
    description: string;
    button: ReactNode;
}

export function NewsCard ({
    image,
    category,
    date,
    title,
    description,
    }: NewsCardProps) {
    return (
        <article className={styles.card}>
            <img src={image} className={styles.card__image} />
        <div className={styles.card__content}>
            <div className={styles.card__info}>
                <span className={styles.card__category}>
                    {category}
                </span>
                <span className={styles.card__date}>
                    {date}
                </span>

                <h3 className={styles.card__title}>
                    {title}
                </h3>
                <p className={styles.card__description}>
                    {description}
                </p>
                {<Button variant="noborder" >
                          Читать далее → 
                </Button>}
            </div>
        </div>
        </article>
    )
}

 