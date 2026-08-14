import type { Partner } from '@/types';
import style from './PartnerCardList.module.scss';

interface PartnerCardListProp {
  items: Partner[];
}

export const PartnerCardList = ({ items }: PartnerCardListProp) => (
  <div className={style.items}>
    {items.map((item) => (
      <div className={style.items_container} key={item.id}>
        <div className={style.items_container_name}>{item.abbr}</div>
        <span className={style.items_container_fullName}>{item.fullName}</span>
      </div>
    ))}
  </div>
);
