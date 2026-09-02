import style from './SegmentedControl.module.scss';

interface SegmentedControlProps {
  lang: string;
  active: boolean;
  onClick: () => void;
}

export const SegmentedControl = ({ lang, active, onClick }: SegmentedControlProps) => {
  return (
    <button onClick={onClick} className={`${style.lang} ${active ? style.active_btn : ''}`}>
      {lang}
    </button>
  );
};
