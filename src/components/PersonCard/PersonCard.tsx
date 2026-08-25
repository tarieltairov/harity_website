import { useEffect, useState } from 'react';

import type { TeamMember } from '@/types';
import { BottomSheet } from '@ui/BottomSheet';

import styles from './PersonCard.module.scss';

interface PersonCardProp {
  items: TeamMember[];
}

export function PersonCard({ items }: PersonCardProp) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 768px)').matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleViewportChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);

    mediaQuery.addEventListener('change', handleViewportChange);
    return () => mediaQuery.removeEventListener('change', handleViewportChange);
  }, []);

  const closeDetails = () => setSelectedMember(null);

  return (
    <>
      <div className={styles.stats}>
        {items.map((item) => (
          <button
            className={styles.stats__item}
            key={item.id}
            type="button"
            onClick={() => setSelectedMember(item)}
            aria-label={`Подробнее о ${item.name}`}
          >
            <div className={styles.stats__ImgWrapper}>
              <img src={item.photo} alt={item.name} />
            </div>
            <span className={styles.stats__Info}>
              <span className={styles.stats__Info_Name}>{item.name}</span>
              <span className={styles.stats__Info_Role}>{item.role}</span>
            </span>
          </button>
        ))}
      </div>

      {selectedMember && isMobile ? (
        <BottomSheet open onOpenChange={(open) => !open && closeDetails()}>
          <MemberDetails member={selectedMember} onClose={closeDetails} />
        </BottomSheet>
      ) : null}

      {selectedMember && !isMobile ? (
        <div className={styles.dialogOverlay} role="presentation" onClick={closeDetails}>
          <div
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="team-member-name"
            onClick={(event) => event.stopPropagation()}
          >
            <MemberDetails member={selectedMember} onClose={closeDetails} />
          </div>
        </div>
      ) : null}
    </>
  );
}

interface MemberDetailsProps {
  member: TeamMember;
  onClose: () => void;
}

function MemberDetails({ member, onClose }: MemberDetailsProps) {
  return (
    <div className={styles.details}>
      <img className={styles.details__image} src={member.photo} alt="" />
      <div className={styles.details__body}>
        <button
          className={styles.details__close}
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
        >
          ×
        </button>
        <h2 id="team-member-name" className={styles.details__name}>
          {member.name}
        </h2>
        <p className={styles.details__role}>
          {member.role}
          {member.sinceYear ? ` · с ${member.sinceYear} года` : ''}
        </p>
        {member.bio ? <p className={styles.details__text}>{member.bio}</p> : null}
        {member.responsibilities ? (
          <p className={styles.details__text}>{member.responsibilities}</p>
        ) : null}
        {member.email || member.languages?.length ? (
          <div className={styles.details__contacts}>
            {member.email ? <p>{member.email}</p> : null}
            {member.languages?.length ? <p>{member.languages.join(', ')}</p> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
