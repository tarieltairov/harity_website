import clsx from 'clsx';
import styles from './Skeleton.module.scss';

type Size = string | number;

interface TextProps {
  /** Высота полоски. По умолчанию 1em — подстраивается под font-size контекста */
  fontSize?: Size;
  width?: Size;
  className?: string;
}

/** Плейсхолдер строки текста */
export function SkeletonText({ fontSize, width, className }: TextProps) {
  return (
    <span
      className={clsx(styles.skeletonBase, styles.text, className)}
      style={{ height: fontSize, width }}
      aria-hidden="true"
    />
  );
}

interface BlockProps {
  width?: Size;
  height?: Size;
  borderRadius?: Size;
  className?: string;
}

/** Плейсхолдер прямоугольного блока (картинка, кнопка). Размер задаётся пропсами или классом */
export function SkeletonBlock({ width, height, borderRadius, className }: BlockProps) {
  return (
    <div
      className={clsx(styles.skeletonBase, styles.block, className)}
      style={{ width, height, borderRadius }}
      aria-hidden="true"
    />
  );
}

interface CircleProps {
  size?: Size;
  className?: string;
}

/** Плейсхолдер круглого элемента (аватар, иконка) */
export function SkeletonCircle({ size = 40, className }: CircleProps) {
  return (
    <div
      className={clsx(styles.skeletonBase, styles.circle, className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
}
