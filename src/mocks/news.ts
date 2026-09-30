import type { Lang } from '@/i18n';
import type { NewsArticle, NewsCategory, NewsPreview, ShareTarget } from '@/types';
import { kb } from '@/utils/bytes';
import { createLocalized } from './localize';

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

/** Слаги категорий в порядке фильтров; подписи — в словаре `news.categories` */
export const NEWS_CATEGORIES: NewsCategory[] = [
  'projects',
  'reports',
  'events',
  'partnership',
  'press',
];

export const getNewsArticles = createLocalized<NewsArticle[]>([
  {
    id: 1,
    category: 'projects',
    publishedAt: '2026-07-03',
    title: {
      ru: 'В Оше открылся новый центр поддержки семей',
      ky: 'Ош шаарында үй-бүлөлөрдү колдоо боюнча жаңы борбор ачылды',
      en: 'A new family support center opens in Osh',
    },
    excerpt: {
      ru: 'Центр будет оказывать психологическую и юридическую помощь многодетным и малообеспеченным семьям региона.',
      ky: 'Борбор аймактагы көп балалуу жана аз камсыз болгон үй-бүлөлөргө психологиялык жана юридикалык жардам көрсөтөт.',
      en: 'The center will provide psychological and legal assistance to large and low-income families in the region.',
    },
    image: image1,
    // Деталка (патч 2, экран 08)
    imageCaption: {
      ru: 'Открытие центра, Ош, июль 2026 · фото фонда',
      ky: 'Борбордун ачылышы, Ош, 2026-жылдын июлу · фонддун сүрөтү',
      en: 'Center opening, Osh, July 2026 · photo by the fund',
    },
    lead: {
      ru: 'Третий по счёту центр поддержки семей открылся в Ошской области. Здесь бесплатно принимают юрист, психолог и социальный работник — в первый месяц за помощью обратились 62 семьи.',
      ky: 'Үй-бүлөлөрдү колдоонун үчүнчү борбору Ош облусунда ачылды. Бул жерде юрист, психолог жана социалдык кызматкер акысыз кабыл алышат — биринчи айда жардам сурап 62 үй-бүлө кайрылды.',
      en: 'The third family support center has opened in the Osh region. A lawyer, a psychologist and a social worker see visitors free of charge — 62 families asked for help in the first month.',
    },
    body: [
      {
        ru: 'Центр разместился в отремонтированном здании в центре города и рассчитан на работу с 400 семьями в год. В нём будут вести приём юрист, психолог и социальный работник, а по вторникам и четвергам — детский педагог.',
        ky: 'Борбор шаардын борборундагы оңдолгон имаратта жайгашкан жана жылына 400 үй-бүлө менен иштөөгө эсептелген. Бул жерде юрист, психолог жана социалдык кызматкер, ал эми шейшемби жана бейшемби күндөрү балдар педагогу кабыл алат.',
        en: 'The center is located in a renovated building in the city center and is designed to serve 400 families a year. A lawyer, a psychologist and a social worker will see visitors, with a children’s teacher available on Tuesdays and Thursdays.',
      },
      {
        ru: 'Помощь бесплатная и доступна без направления: достаточно записаться по телефону или прийти в приёмные часы. Отдельная комната отведена под занятия с детьми, пока родители на консультации.',
        ky: 'Жардам акысыз жана жолдомосуз көрсөтүлөт: телефон аркылуу жазылуу же кабыл алуу сааттарында келүү жетиштүү. Ата-энелер кеңеш алып жатканда балдар менен сабак өтүү үчүн өзүнчө бөлмө бөлүнгөн.',
        en: 'Help is free and available without a referral: just book by phone or come during office hours. A separate room is set aside for activities with children while parents are in consultations.',
      },
      {
        ru: 'Проект реализован при поддержке партнёров фонда и городской администрации, которая передала помещение в безвозмездное пользование на пять лет.',
        ky: 'Долбоор фонддун өнөктөштөрүнүн жана имаратты беш жылга акысыз пайдаланууга берген шаар мэриясынын колдоосу менен ишке ашырылды.',
        en: 'The project was carried out with the support of the fund’s partners and the city administration, which provided the premises free of charge for five years.',
      },
    ],
    quote: {
      text: {
        ru: 'Мы хотим, чтобы за помощью приходили до того, как ситуация становится критической. Для этого она должна быть рядом и бесплатной.',
        ky: 'Адамдар абал оорлоп кете электе жардам сурап келишин каалайбыз. Ал үчүн жардам жакын жана акысыз болушу керек.',
        en: 'We want people to come for help before the situation becomes critical. For that, help has to be close by and free.',
      },
      author: {
        ru: 'Айгуль Садыкова, директор фонда',
        ky: 'Айгүл Садыкова, фонддун директору',
        en: 'Aigul Sadykova, Director of the Fund',
      },
    },
    gallery: [image5, image6, image7, image8, image5, image6, image7, image8],
    documents: [
      {
        type: 'PDF',
        title: {
          ru: 'Пресс-релиз об открытии центра',
          ky: 'Борбордун ачылышы тууралуу пресс-релиз',
          en: 'Press release on the center opening',
        },
        sizeBytes: kb(420),
        file: '/files/july-report.pdf',
      },
      {
        type: 'DOCX',
        title: {
          ru: 'Перечень услуг и приёмные часы',
          ky: 'Кызматтардын тизмеси жана кабыл алуу сааттары',
          en: 'List of services and office hours',
        },
        sizeBytes: kb(96),
        file: '/files/july-report.pdf',
      },
    ],
    relatedIds: [2, 3, 4],
  },
  {
    id: 2,
    category: 'reports',
    publishedAt: '2026-06-29',
    title: {
      ru: 'Опубликован финансовый отчёт фонда за 2025 год',
      ky: 'Фонддун 2025-жыл үчүн каржылык отчету жарыяланды',
      en: 'The fund’s 2025 financial report is published',
    },
    excerpt: {
      ru: 'В отчёте - подробная информация о расходах, грантах и реализованных проектах прошлого года.',
      ky: 'Отчетто өткөн жылдагы чыгымдар, гранттар жана ишке ашырылган долбоорлор тууралуу толук маалымат бар.',
      en: 'The report contains detailed information on last year’s expenses, grants and completed projects.',
    },
    image: image2,
  },
  {
    id: 3,
    category: 'events',
    publishedAt: '2026-06-24',
    title: {
      ru: 'Волонтёры собрали более тонны вещей для многодетных семей',
      ky: 'Ыктыярчылар көп балалуу үй-бүлөлөр үчүн бир тоннадан ашык буюм чогултушту',
      en: 'Volunteers collect over a ton of goods for large families',
    },
    excerpt: {
      ru: 'Акция прошла в трёх городах при поддержке местных сообществ и партнёров фонда.',
      ky: 'Акция жергиликтүү жамааттардын жана фонддун өнөктөштөрүнүн колдоосу менен үч шаарда өттү.',
      en: 'The campaign took place in three cities with the support of local communities and the fund’s partners.',
    },
    image: image4,
  },
  {
    id: 4,
    category: 'partnership',
    publishedAt: '2026-06-24',
    title: {
      ru: 'Фонд подписал меморандум с международной организацией',
      ky: 'Фонд эл аралык уюм менен меморандумга кол койду',
      en: 'The fund signs a memorandum with an international organization',
    },
    excerpt: {
      ru: 'Соглашение предполагает совместную работу над программами образования и здравоохранения.',
      ky: 'Макулдашуу билим берүү жана саламаттыкты сактоо программалары боюнча биргелешкен ишти караштырат.',
      en: 'The agreement provides for joint work on education and healthcare programs.',
    },
    image: image3,
  },
  {
    id: 5,
    category: 'press',
    publishedAt: '2026-06-12',
    title: {
      ru: 'Запущена программа стипендий для студентов из регионов',
      ky: 'Аймактардан келген студенттер үчүн стипендиялык программа ишке кирди',
      en: 'Scholarship program launched for students from the regions',
    },
    excerpt: {
      ru: 'В 2026 году стипендии получат 40 студентов из малообеспеченных семей.',
      ky: '2026-жылы аз камсыз болгон үй-бүлөлөрдөн 40 студент стипендия алат.',
      en: 'In 2026, 40 students from low-income families will receive scholarships.',
    },
    image: image5,
  },
  {
    id: 6,
    category: 'projects',
    publishedAt: '2026-06-05',
    title: {
      ru: 'Стартовал образовательный курс для сельских учителей',
      ky: 'Айыл мугалимдери үчүн билим берүү курсу башталды',
      en: 'Training course for rural teachers begins',
    },
    excerpt: {
      ru: 'Курс повышения квалификации пройдут более 100 педагогов из отдалённых школ.',
      ky: 'Алыскы мектептердин 100дөн ашык мугалими квалификациясын жогорулатуу курсунан өтөт.',
      en: 'More than 100 teachers from remote schools will take the professional development course.',
    },
    image: image6,
  },
  {
    id: 7,
    category: 'events',
    publishedAt: '2026-06-01',
    title: {
      ru: 'Благотворительный забег собрал более 500 участников',
      ky: 'Кайрымдуулук чуркоосуна 500дөн ашык катышуучу чогулду',
      en: 'Charity run brings together more than 500 participants',
    },
    excerpt: {
      ru: 'Средства, вырученные с регистрационных взносов, направят на строительство детской площадки.',
      ky: 'Каттоо төлөмдөрүнөн түшкөн каражат балдар аянтчасын курууга жумшалат.',
      en: 'Funds raised from registration fees will go toward building a playground.',
    },
    image: image7,
  },
  {
    id: 8,
    category: 'reports',
    publishedAt: '2026-05-29',
    title: {
      ru: 'Годовой отчёт о проектах в сфере здравоохранения',
      ky: 'Саламаттыкты сактоо тармагындагы долбоорлор боюнча жылдык отчет',
      en: 'Annual report on healthcare projects',
    },
    excerpt: {
      ru: 'Фонд подвёл итоги трёх лет работы мобильных медицинских бригад в отдалённых сёлах.',
      ky: 'Фонд алыскы айылдардагы мобилдик медициналык бригадалардын үч жылдык ишинин жыйынтыгын чыгарды.',
      en: 'The fund has summed up three years of mobile medical teams working in remote villages.',
    },
    image: image8,
  },
  // Новости проекта «Мобильные медицинские бригады» (патч 2, экран 09)
  {
    id: 9,
    category: 'projects',
    publishedAt: '2026-07-03',
    title: {
      ru: 'Бригады завершили выезды в Алайском районе',
      ky: 'Бригадалар Алай районуна чыгууларын аякташты',
      en: 'Medical teams complete visits to Alai district',
    },
    excerpt: {
      ru: 'За две недели работы врачи приняли более 400 жителей из 12 отдалённых сёл района.',
      ky: 'Эки жумалык иштин ичинде дарыгерлер райондун 12 алыскы айылынан 400дөн ашык тургунду кабыл алышты.',
      en: 'In two weeks, doctors saw more than 400 residents from 12 remote villages in the district.',
    },
    image: news9,
  },
  {
    id: 10,
    category: 'partnership',
    publishedAt: '2026-06-12',
    title: {
      ru: 'Проект получил второй автомобиль от партнёров',
      ky: 'Долбоор өнөктөштөрдөн экинчи унааны алды',
      en: 'The project receives a second vehicle from partners',
    },
    excerpt: {
      ru: 'Новый оснащённый автомобиль позволит добавить в маршрут бригад ещё восемь сёл.',
      ky: 'Жаңы жабдылган унаа бригадалардын каттамына дагы сегиз айылды кошууга мүмкүнчүлүк берет.',
      en: 'The new equipped vehicle will add eight more villages to the teams’ route.',
    },
    image: news10,
  },
]);

export function getNewsById(id: number, lang: Lang): NewsArticle | undefined {
  return getNewsArticles(lang).find((article) => article.id === id);
}

function toPreview(article: NewsArticle): NewsPreview {
  return {
    id: article.id,
    title: article.title,
    publishedAt: article.publishedAt,
    image: article.image,
  };
}

const POPULAR_NEWS_IDS = [1, 3, 5];

/** Блок «Популярное» в сайдбаре новостей */
export function getPopularNews(lang: Lang): NewsPreview[] {
  return POPULAR_NEWS_IDS.map((id) => getNewsById(id, lang))
    .filter((article) => article !== undefined)
    .map(toPreview);
}

/** Кнопки «Поделиться» на деталке новости (патч 2, экран 08) */
export const getShareTargets = createLocalized<ShareTarget[]>([
  { label: 'TG', name: 'Telegram' },
  { label: 'WA', name: 'WhatsApp' },
  { label: 'FB', name: 'Facebook' },
  { label: '⧉', name: { ru: 'Копировать ссылку', ky: 'Шилтемени көчүрүү', en: 'Copy link' } },
]);
