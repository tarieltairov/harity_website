import style from './SegmentedControl.module.scss';

interface SegmentedControlProps {
  label: string;
  /** Код языка сегмента — атрибут lang, чтобы скринридер читал подпись на своём языке */
  lang?: string;
  active: boolean;
  onClick: () => void;
}

export const SegmentedControl = ({ label, lang, active, onClick }: SegmentedControlProps) => {
  return (
    <button
      type="button"
      lang={lang}
      aria-pressed={active}
      onClick={onClick}
      className={`${style.lang} ${active ? style.active_btn : ''}`}
    >
      {label}
    </button>
  );
};
