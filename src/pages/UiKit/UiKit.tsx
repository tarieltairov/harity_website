import { useState } from 'react';

import { NewsCard } from '@components/NewsCard';
import { StatsBlock } from '@components/StatsBlock';

import { Badge } from '@ui/Badge';
import { Button } from '@ui/Button';
import { CTABanner } from '@ui/CTABanner';
import { FilterChip } from '@ui/FilterChip';
import { Pagination } from '@ui/Pagination';
import { Input, Textarea, SearchField } from '@ui/form';

import styles from './UiKit.module.scss';
import { Download } from '@ui/Download';

const buttonVariants = ['primary', 'secondary', 'ghost', 'outline', 'noborder'] as const;

const statItems = [
  { value: '12 лет', label: 'Работы фонда' },
  { value: '48', label: 'Проектов реализовано' },
  { value: '9', label: 'Регионов охвачено' },
];

export function UiKit() {
  const [activeChip, setActiveChip] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>UI Kit — все компоненты</h1>

      <section className={styles.section}>
        <h2 className={styles.section__title}>Button</h2>
        <div className={styles.row}>
          {buttonVariants.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>Badge</h2>
        <div className={styles.row}>
          <Badge>Новости</Badge>
          <Badge>Проекты</Badge>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>FilterChip</h2>
        <div className={styles.row}>
          {['all', 'news', 'projects'].map((chip) => (
            <FilterChip
              key={chip}
              isActive={activeChip === chip}
              onClick={() => setActiveChip(chip)}
            >
              {chip}
            </FilterChip>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>Form (Input / Textarea / SearchField)</h2>
        <div className={styles.row}>
          <Input placeholder="Введите текст" />
          <SearchField placeholder="Поиск" />
          <Textarea placeholder="Сообщение" />
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>Pagination</h2>
        <Pagination currentPage={currentPage} totalPages={5} onPageChange={setCurrentPage} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>CTABanner</h2>
        <CTABanner
          title="Присоединяйтесь к нам"
          description="Помогите сохранить культурное наследие"
          buttonText="Стать партнёром"
          onBtnClick={() => alert('CTA click')}
        />
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>StatsBlock</h2>
        <StatsBlock items={statItems} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>NewsCard</h2>
        <div className={styles.row}>
          <NewsCard
            image="https://placehold.co/400x240"
            badgeTitle="Новости"
            date="24 июля 2026"
            title="Заголовок новости"
            description="Краткое описание новости для примера отображения карточки."
            showBtn
          />
        </div>
      </section>

      <section>
        <Download
          type="PDF"
          title="Финансовый отчет за 2025"
          size="28 КБ"
          file="/files/sample.pdf"
        />
      </section>
    </div>
  );
}
