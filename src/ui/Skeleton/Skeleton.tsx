import clsx from 'clsx';
import styles from './Skeleton.module.scss';

interface TextProps {
  fontSize?: string | number;
  width?: string | number;
  className?: string;
}

export const SkeletonText = ({ fontSize = '1rem', width = '100%', className }: TextProps) => {
  return (
    <span
      className={clsx(styles.skeletonBase, styles.text, className)}
      style={{ height: fontSize, width }}
    />
  );
};

interface BlockProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
}

export const SkeletonBlock = ({
  width = '100%',
  height = '100px',
  borderRadius,
  className,
}: BlockProps) => {
  return (
    <div
      className={clsx(styles.skeletonBase, styles.block, className)}
      style={{ width, height, borderRadius }}
    />
  );
};

interface CircleProps {
  size?: string | number;
  className?: string;
}

export const SkeletonCircle = ({ size = 40, className }: CircleProps) => {
  return (
    <div
      className={clsx(styles.skeletonBase, styles.circle, className)}
      style={{ width: size, height: size }}
    />
  );
};
