import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { BreadCrumbs } from '@components/BreadCrumbs';
import { ContentCard } from '@components/ContentCard';
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
import { BottomSheet } from '@ui/BottomSheet';
import { Input, Textarea, SearchField } from '@ui/form';
import { Download } from '@ui/Download';
import { Modal } from '@ui/Modal';
import { SubscriptionStatus } from '@ui/SubscriptionStatus';
import { SkeletonBlock, SkeletonCircle, SkeletonText } from '@ui/Skeleton';
import { SegmentedControl } from '@ui/SegmentedControl';
import {
  getFundDocuments,
  getFundStats,
  getNewsArticles,
  getPartners,
  getProjects,
  getTeamMembers,
} from '@/mocks';
import { getDetailPath, ROUTES } from '@/config/routes';
import { LANG_LABELS, LANGS, useFormat, useLanguage } from '@/i18n';

import styles from './UiKit.module.scss';

const buttonVariants = ['primary', 'secondary', 'ghost', 'outline', 'noborder'] as const;
const chipLabels = ['Все', 'Активные', 'Завершённые'];

export function UiKit() {
  const { t } = useTranslation();
  const { formatDate } = useFormat();
  const { lang, setLang } = useLanguage();

  // Примеры данных для карточек — из общих моков, на текущем языке
  const newsExample = getNewsArticles(lang)[0];
  const projectExample = getProjects(lang)[1];
  const documentExample = getFundDocuments(lang)[0];

  const [activeChip, setActiveChip] = useState(chipLabels[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 768px)').matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    const handleViewportChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);

      if (!event.matches) {
        setIsBottomSheetOpen(false);
      }
    };

    mediaQuery.addEventListener('change', handleViewportChange);

    return () => {
      mediaQuery.removeEventListener('change', handleViewportChange);
    };
  }, []);

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
        <h2 className={styles.section__title}>SegmentedControl (переключатель языка)</h2>
        <div className={styles.row}>
          {LANGS.map((code) => (
            <SegmentedControl
              key={code}
              label={LANG_LABELS[code]}
              lang={code}
              active={lang === code}
              onClick={() => setLang(code)}
            />
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
        <h2 className={styles.section__title}>ContentCard (новость / проект)</h2>
        <div className={styles.row}>
          <div className={styles.cardExample}>
            <ContentCard
              image={newsExample.image}
              badgeTitle={t(`news.categories.${newsExample.category}`)}
              date={formatDate(newsExample.publishedAt)}
              title={newsExample.title}
              description={newsExample.excerpt}
              to={getDetailPath(ROUTES.newsDetail, newsExample.id)}
              showReadMore
            />
          </div>
          <div className={styles.cardExample}>
            <ContentCard
              image={projectExample.image}
              badgeTitle={t(`projects.status.${projectExample.status}`)}
              to={getDetailPath(ROUTES.project, projectExample.id)}
              title={projectExample.title}
              description={projectExample.excerpt}
            />
          </div>
          {/* Состояние загрузки рядом с настоящими карточками — должно совпадать с ними по высоте */}
          <div className={styles.cardExample}>
            <ContentCard isLoading showReadMore />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>Gallery</h2>
        <Gallery
          images={projectExample.gallery ?? []}
          sectionTitle={t('projects.detail.gallery')}
        />
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>Pagination</h2>
        <Pagination currentPage={currentPage} totalPages={5} onPageChange={setCurrentPage} />

        <h3 className={styles.section__title}>Pagination · со стрелкой «назад» (поиск)</h3>
        <Pagination
          currentPage={currentPage}
          totalPages={5}
          onPageChange={setCurrentPage}
          showPrevArrow
        />
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>StatsBlock</h2>
        <StatsBlock items={getFundStats(lang)} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>PersonCard</h2>
        <PersonCard items={getTeamMembers(lang).slice(0, 2)} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>PartnerCardList</h2>
        <PartnerCardList items={getPartners(lang).slice(0, 4)} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>Download (DocumentRow)</h2>
        <Download
          title={documentExample.title}
          type={documentExample.type}
          sizeBytes={documentExample.sizeBytes}
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
        <h2 className={styles.section__title}>BottomSheet</h2>
        <Button onClick={() => setIsBottomSheetOpen(true)} disabled={!isMobile}>
          Открыть BottomSheet
        </Button>
        {!isMobile ? (
          <p className={styles.bottomSheetHint}>
            Демонстрация доступна только на мобильной версии.
          </p>
        ) : null}
      </section>

      {isMobile ? (
        <BottomSheet open={isBottomSheetOpen} onOpenChange={setIsBottomSheetOpen}>
          <div className={styles.bottomSheetContent}>
            <h3 className={styles.bottomSheetTitle}>Образец</h3>
            <p className={styles.bottomSheetRole}>Образец</p>
            <p className={styles.bottomSheetText}>Образец</p>
            <Button variant="outline" onClick={() => setIsBottomSheetOpen(false)}>
              Закрыть
            </Button>
          </div>
        </BottomSheet>
      ) : null}
      <section>
        <h2 className={styles.section__title}>Modal</h2>
        <Button onClick={onOpenModal}>Открыть модальное окно</Button>

        <Modal isOpen={modalOpen} onClose={onCloseModal}>
          Это тестовая модалка
        </Modal>
      </section>
      <section className={styles.section}>
        <h2 className={styles.section__title}>Skeleton</h2>
        <div className={styles.row}>
          <SkeletonBlock width={200} height={100} />
          <SkeletonText width={200} />
          <SkeletonCircle />
        </div>
      </section>
    </div>
  );
}
