import style from './PartnerCard.module.scss';

export interface Partner {
  name: string;
  fullName: string;
}

interface PartnerCardProp {
  items: Partner[];
}

export const PartnerCard = ({ items }: PartnerCardProp) => (
  <div className={style.items}>
    {items.map((item) => (
      <div className={style.items_container} key={item.fullName}>
        <div className={style.items_container_name}>{item.name}</div>
        <span className={style.items_container_fullName}>{item.fullName}</span>
      </div>
    ))}
  </div>
);
