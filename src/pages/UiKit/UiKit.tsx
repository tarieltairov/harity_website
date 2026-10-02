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
import { useFundDocuments, useNewsList, usePartners, useProject, useStats, useTeam } from '@/api';
import { getDetailPath, ROUTES } from '@/config/routes';
import { LANG_LABELS, LANGS, useFormat, useLanguage } from '@/i18n';

import styles from './UiKit.module.scss';

const buttonVariants = ['primary', 'secondary', 'ghost', 'outline', 'noborder'] as const;
// Подписи чипсов — из словаря `projects.filters`
const chipFilters = ['all', 'active', 'completed'] as const;

// Эталонный проект с заполненной галереей — «Мобильные медицинские бригады» (экран 09)
const GALLERY_PROJECT_ID = 2;

export function UiKit() {
  const { t } = useTranslation();
  const { formatDate } = useFormat();
  const { lang, setLang } = useLanguage();

  // Примеры данных для карточек — из API, на текущем языке. Витрина вне ErrorBoundary,
  // поэтому ошибки не пробрасываем: секция без данных просто не рендерится
  const { data: newsList } = useNewsList({ pageSize: 1 }, { throwOnError: false });
  const { data: projectExample } = useProject(GALLERY_PROJECT_ID, { throwOnError: false });
  const { data: documents } = useFundDocuments({ throwOnError: false });
  const { data: stats } = useStats({ throwOnError: false });
  const { data: team } = useTeam({ throwOnError: false });
  const { data: partners } = usePartners({ throwOnError: false });

  const newsExample = newsList?.items[0];
  const documentExample = documents?.[0];

  const [activeChip, setActiveChip] = useState<(typeof chipFilters)[number]>('all');
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
      <h1 className={styles.title}>{t('uiKit.title')}</h1>

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
          {newsExample && <Badge>{newsExample.category.title}</Badge>}
          <Badge>{t('projects.status.active')}</Badge>
          <Badge>{t('projects.status.completed')}</Badge>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>FilterChip</h2>
        <div className={styles.row}>
          {chipFilters.map((chip) => (
            <FilterChip
              key={chip}
              isActive={activeChip === chip}
              onClick={() => setActiveChip(chip)}
            >
              {t(`projects.filters.${chip}`)}
            </FilterChip>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>{t('uiKit.languageSwitcher')}</h2>
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
          <Input placeholder={t('uiKit.inputPlaceholder')} />
          <SearchField placeholder={t('uiKit.searchPlaceholder')} />
          <Textarea placeholder={t('uiKit.textareaPlaceholder')} />
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>{t('uiKit.subscriptionStatus')}</h2>
        <SubscriptionStatus />
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>{t('uiKit.contentCard')}</h2>
        <div className={styles.row}>
          <div className={styles.cardExample}>
            {newsExample ? (
              <ContentCard
                image={newsExample.image}
                badgeTitle={newsExample.category.title}
                date={formatDate(newsExample.publishedAt)}
                title={newsExample.title}
                description={newsExample.excerpt}
                to={getDetailPath(ROUTES.newsDetail, newsExample.id)}
                showReadMore
              />
            ) : (
              <ContentCard isLoading showReadMore />
            )}
          </div>
          <div className={styles.cardExample}>
            {projectExample ? (
              <ContentCard
                image={projectExample.image}
                badgeTitle={t(`projects.status.${projectExample.status}`)}
                to={getDetailPath(ROUTES.project, projectExample.id)}
                title={projectExample.title}
                description={projectExample.excerpt}
              />
            ) : (
              <ContentCard isLoading />
            )}
          </div>
          {/* Состояние загрузки рядом с настоящими карточками — должно совпадать с ними по высоте */}
          <div className={styles.cardExample}>
            <ContentCard isLoading showReadMore />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>Gallery</h2>
        {projectExample ? (
          <Gallery images={projectExample.gallery} sectionTitle={t('projects.detail.gallery')} />
        ) : (
          <Loader />
        )}
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>Pagination</h2>
        <Pagination currentPage={currentPage} totalPages={5} onPageChange={setCurrentPage} />

        <h3 className={styles.section__title}>{t('uiKit.paginationWithPrev')}</h3>
        <Pagination
          currentPage={currentPage}
          totalPages={5}
          onPageChange={setCurrentPage}
          showPrevArrow
        />
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>StatsBlock</h2>
        <StatsBlock items={stats} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>PersonCard</h2>
        {team ? <PersonCard items={team.slice(0, 2)} /> : <Loader />}
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>PartnerCardList</h2>
        {partners ? <PartnerCardList items={partners.slice(0, 4)} /> : <Loader />}
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>Download (DocumentRow)</h2>
        {documentExample ? (
          <Download
            title={documentExample.title}
            format={documentExample.format}
            sizeBytes={documentExample.sizeBytes}
            url={documentExample.url}
          />
        ) : (
          <Loader />
        )}
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>Loader</h2>
        <Loader />
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>CTABanner</h2>
        <CTABanner
          title={t('uiKit.cta.title')}
          description={t('uiKit.cta.description')}
          buttonText={t('uiKit.cta.button')}
          onBtnClick={() => {}}
        />
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>BottomSheet</h2>
        <Button onClick={() => setIsBottomSheetOpen(true)} disabled={!isMobile}>
          {t('uiKit.openBottomSheet')}
        </Button>
        {!isMobile ? <p className={styles.bottomSheetHint}>{t('uiKit.bottomSheetHint')}</p> : null}
      </section>

      {isMobile ? (
        <BottomSheet open={isBottomSheetOpen} onOpenChange={setIsBottomSheetOpen}>
          <div className={styles.bottomSheetContent}>
            <h3 className={styles.bottomSheetTitle}>{t('uiKit.sample')}</h3>
            <p className={styles.bottomSheetRole}>{t('uiKit.sample')}</p>
            <p className={styles.bottomSheetText}>{t('uiKit.sample')}</p>
            <Button variant="outline" onClick={() => setIsBottomSheetOpen(false)}>
              {t('common.close')}
            </Button>
          </div>
        </BottomSheet>
      ) : null}
      <section>
        <h2 className={styles.section__title}>Modal</h2>
        <Button onClick={onOpenModal}>{t('uiKit.openModal')}</Button>

        <Modal isOpen={modalOpen} onClose={onCloseModal}>
          {t('uiKit.modalText')}
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
