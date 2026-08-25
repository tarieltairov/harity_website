import type { ReactNode } from 'react';

import { Drawer } from 'vaul';

import styles from './BottomSheet.module.scss';

interface BottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  className?: string;
}

export function BottomSheet({ open, onOpenChange, children, className }: BottomSheetProps) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className={styles.overlay} />
        <Drawer.Content className={`${styles.content} ${className ?? ''}`}>
          <div className={styles.handle} />
          {children}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
