import { useState } from 'react';

import { BreadCrumbs } from '@components/BreadCrumbs';
import { NewsCard } from '@components/NewsCard';
import { PartnerCardList } from '@components/PartnerCardList';
import { PersonCard } from '@components/PersonCard';
import { StatsBlock } from '@components/StatsBlock';

import { Badge } from '@ui/Badge';
import { Button } from '@ui/Button';
import { CTABanner } from '@ui/CTABanner';
import { FilterChip } from '@ui/FilterChip';
import { Gallery } from '@ui/Gallery';
import { Loader } from '@ui/Loader';
import { Pagination } from '@ui/Pagination';
import { Input, Textarea, SearchField } from '@ui/form';
import { Download } from '@ui/Download';
import { Modal } from '@ui/Modal';
import { SubscriptionStatus } from '@ui/SubscriptionStatus';

import {
  FUND_DOCUMENTS,
  FUND_STATS,
  NEWS_ARTICLES,
  PARTNERS,
  PROJECTS,
  TEAM_MEMBERS,
} from '@/mocks';
import { PROJECT_STATUS_LABEL } from '@/types';

import styles from './UiKit.module.scss';

const buttonVariants = ['primary', 'secondary', 'ghost', 'outline', 'noborder'] as const;
const chipLabels = ['Все', 'Активные', 'Завершённые'];

// Примеры данных для карточек — из общих моков
const newsExample = NEWS_ARTICLES[0];
const projectExample = PROJECTS[1];
const documentExample = FUND_DOCUMENTS[0];

export function UiKit() {
  const [activeChip, setActiveChip] = useState(chipLabels[0]);
  const [currentPage, setCurrentPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);

  const onOpenModal = () => setModalOpen(true);
  const onCloseModal = () => setModalOpen(false);

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
          <Badge>Проекты</Badge>
          <Badge>Активный</Badge>
          <Badge>Завершён</Badge>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>FilterChip</h2>
        <div className={styles.row}>
          {chipLabels.map((chip) => (
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
        <h2 className={styles.section__title}>BreadCrumbs</h2>
        <BreadCrumbs pathname="/news" />
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
        <h2 className={styles.section__title}>SubscriptionStatus (Статус подписки)</h2>
        <SubscriptionStatus />
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>NewsCard (новость / проект)</h2>
        <div className={styles.row}>
          <div className={styles.cardExample}>
            <NewsCard
              image={newsExample.image}
              badgeTitle={newsExample.category}
              date={newsExample.date}
              title={newsExample.title}
              description={newsExample.excerpt}
              showBtn
            />
          </div>
          <div className={styles.cardExample}>
            <NewsCard
              image={projectExample.image}
              badgeTitle={PROJECT_STATUS_LABEL[projectExample.status]}
              title={projectExample.title}
              description={projectExample.excerpt}
            />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>Gallery</h2>
        <Gallery images={projectExample.gallery ?? []} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>Pagination</h2>
        <Pagination currentPage={currentPage} totalPages={5} onPageChange={setCurrentPage} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>StatsBlock</h2>
        <StatsBlock items={FUND_STATS} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>PersonCard</h2>
        <PersonCard items={TEAM_MEMBERS.slice(0, 2)} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>PartnerCardList</h2>
        <PartnerCardList items={PARTNERS.slice(0, 4)} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>Download (DocumentRow)</h2>
        <Download
          title={documentExample.title}
          type={documentExample.type}
          size={documentExample.size}
          file={documentExample.file}
        />
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>Loader</h2>
        <Loader />
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
        <h2 className={styles.section__title}>Modal</h2>
        <Button onClick={onOpenModal}>Открыть модальное окно</Button>

        <Modal isOpen={modalOpen} onClose={onCloseModal}>
          Это тестовая модалка
        </Modal>
      </section>
    </div>
  );
}
