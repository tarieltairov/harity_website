import type { NewsArticle, NewsCategory, NewsPreview, ShareTarget } from '@/types';

import image1 from '@assets/jpeg/image1.jpeg';
import image2 from '@assets/jpeg/image2.jpeg';
import image3 from '@assets/jpeg/image3.jpeg';
import image4 from '@assets/jpeg/image4.jpeg';
import image5 from '@assets/jpeg/image5.jpeg';
import image6 from '@assets/jpeg/image6.jpeg';
import image7 from '@assets/jpeg/image7.jpeg';
import image8 from '@assets/jpeg/image8.jpeg';
import news9 from '@assets/jpeg/keyprojects4.jpg';
import news10 from '@assets/jpeg/keyprojects5.jpg';

export const NEWS_CATEGORIES: Array<NewsCategory | 'Все'> = [
  'Все',
  'Проекты',
  'Отчёты',
  'Мероприятия',
  'Партнёрство',
  'Пресс-релизы',
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 1,
    category: 'Проекты',
    date: '3 июля 2026',
    title: 'В Оше открылся новый центр поддержки семей',
    excerpt:
      'Центр будет оказывать психологическую и юридическую помощь многодетным и малообеспеченным семьям региона.',
    image: image1,
    // Деталка (патч 2, экран 08)
    imageCaption: 'Открытие центра, Ош, июль 2026 · фото фонда',
    lead: 'Третий по счёту центр поддержки семей открылся в Ошской области. Здесь бесплатно принимают юрист, психолог и социальный работник — в первый месяц за помощью обратились 62 семьи.',
    body: [
      'Центр разместился в отремонтированном здании в центре города и рассчитан на работу с 400 семьями в год. В нём будут вести приём юрист, психолог и социальный работник, а по вторникам и четвергам — детский педагог.',
      'Помощь бесплатная и доступна без направления: достаточно записаться по телефону или прийти в приёмные часы. Отдельная комната отведена под занятия с детьми, пока родители на консультации.',
      'Проект реализован при поддержке партнёров фонда и городской администрации, которая передала помещение в безвозмездное пользование на пять лет.',
    ],
    quote: {
      text: 'Мы хотим, чтобы за помощью приходили до того, как ситуация становится критической. Для этого она должна быть рядом и бесплатной.',
      author: 'Айгуль Садыкова, директор фонда',
    },
    gallery: [image5, image6, image7, image8, image5, image6, image7, image8],
    documents: [
      {
        type: 'PDF',
        title: 'Пресс-релиз об открытии центра',
        size: '420 КБ',
        file: '/files/july-report.pdf',
      },
      {
        type: 'DOCX',
        title: 'Перечень услуг и приёмные часы',
        size: '96 КБ',
        file: '/files/july-report.pdf',
      },
    ],
    relatedIds: [2, 3, 4],
  },
  {
    id: 2,
    category: 'Отчёты',
    date: '29 июня 2026',
    title: 'Опубликован финансовый отчёт фонда за 2025 год',
    excerpt:
      'В отчёте - подробная информация о расходах, грантах и реализованных проектах прошлого года.',
    image: image2,
  },
  {
    id: 3,
    category: 'Мероприятия',
    date: '24 июня 2026',
    title: 'Волонтёры собрали более тонны вещей для многодетных семей',
    excerpt: 'Акция прошла в трёх городах при поддержке местных сообществ и партнёров фонда.',
    image: image4,
  },
  {
    id: 4,
    category: 'Партнёрство',
    date: '24 июня 2026',
    title: 'Фонд подписал меморандум с международной организацией',
    excerpt:
      'Соглашение предполагает совместную работу над программами образования и здравоохранения.',
    image: image3,
  },
  {
    id: 5,
    category: 'Пресс-релизы',
    date: '12 июня 2026',
    title: 'Запущена программа стипендий для студентов из регионов',
    excerpt: 'В 2026 году стипендии получат 40 студентов из малообеспеченных семей.',
    image: image5,
  },
  {
    id: 6,
    category: 'Проекты',
    date: '5 июня 2026',
    title: 'Стартовал образовательный курс для сельских учителей',
    excerpt: 'Курс повышения квалификации пройдут более 100 педагогов из отдалённых школ.',
    image: image6,
  },
  {
    id: 7,
    category: 'Мероприятия',
    date: '1 июня 2026',
    title: 'Благотворительный забег собрал более 500 участников',
    excerpt:
      'Средства, вырученные с регистрационных взносов, направят на строительство детской площадки.',
    image: image7,
  },
  {
    id: 8,
    category: 'Отчёты',
    date: '29 мая 2026',
    title: 'Годовой отчёт о проектах в сфере здравоохранения',
    excerpt: 'Фонд подвёл итоги трёх лет работы мобильных медицинских бригад в отдалённых сёлах.',
    image: image8,
  },
  // Новости проекта «Мобильные медицинские бригады» (патч 2, экран 09)
  {
    id: 9,
    category: 'Проекты',
    date: '3 июля 2026',
    title: 'Бригады завершили выезды в Алайском районе',
    excerpt: 'За две недели работы врачи приняли более 400 жителей из 12 отдалённых сёл района.',
    image: news9,
  },
  {
    id: 10,
    category: 'Партнёрство',
    date: '12 июня 2026',
    title: 'Проект получил второй автомобиль от партнёров',
    excerpt: 'Новый оснащённый автомобиль позволит добавить в маршрут бригад ещё восемь сёл.',
    image: news10,
  },
];

export function getNewsById(id: number): NewsArticle | undefined {
  return NEWS_ARTICLES.find((article) => article.id === id);
}

function toPreview(article: NewsArticle): NewsPreview {
  return { title: article.title, date: article.date, image: article.image };
}

/** Блок «Популярное» в сайдбаре новостей */
export const POPULAR_NEWS: NewsPreview[] = [1, 3, 5]
  .map(getNewsById)
  .filter((article) => article !== undefined)
  .map(toPreview);

/** Кнопки «Поделиться» на деталке новости (патч 2, экран 08) */
export const SHARE_TARGETS: ShareTarget[] = [
  { label: 'TG', name: 'Telegram' },
  { label: 'WA', name: 'WhatsApp' },
  { label: 'FB', name: 'Facebook' },
  { label: '⧉', name: 'Копировать ссылку' },
];
