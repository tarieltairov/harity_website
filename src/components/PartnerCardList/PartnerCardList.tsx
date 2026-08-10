import style from './PartnerCardList.module.scss';

export interface Partner {
  name: string;
  fullName: string;
}

interface PartnerCardListProp {
  items: Partner[];
}

export const PartnerCardList = ({ items }: PartnerCardListProp) => (
  <div className={style.items}>
    {items.map((item) => (
      <div className={style.items_container} key={item.fullName}>
        <div className={style.items_container_name}>{item.name}</div>
        <span className={style.items_container_fullName}>{item.fullName}</span>
      </div>
    ))}
  </div>
);
