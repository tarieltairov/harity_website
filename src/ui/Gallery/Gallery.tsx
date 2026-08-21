import { useState } from 'react';
import styles from './Gallery.module.scss';

interface GalleryProps {
  images: string[];
  maxVisible?: number;
}

export function Gallery({ images, maxVisible = 4 }: GalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images?.length) return null;

  const visibleImages = images.slice(0, maxVisible);
  const remainingCount = Math.max(images.length - maxVisible, 0);

  const openGallery = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeGallery = () => setIsOpen(false);

  const nextImage = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <>
      <section className={styles.gallery}>
        <h2 className={styles.title}>ГАЛЕРЕЯ ПРОЕКТА</h2>

        <div className={styles.galleryGrid}>
          {visibleImages.map((image, index) => {
            const isLast = index === maxVisible - 1 && remainingCount > 0;

            return (
              <button
                key={index}
                type="button"
                className={styles.galleryItem}
                onClick={() => openGallery(index)}
              >
                <img src={image} alt={`Фото ${index + 1}`} className={styles.galleryImg} />

                {isLast && <div className={styles.overlay}>+{remainingCount}</div>}
              </button>
            );
          })}
        </div>
      </section>

      {isOpen && (
        <div className={styles.modal} onClick={closeGallery}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button type="button" className={styles.closeBtn} onClick={closeGallery}>
              ✕
            </button>

            <img
              src={images[currentIndex]}
              alt={`Фото ${currentIndex + 1}`}
              className={styles.modalImg}
            />

            <div className={styles.modalControls}>
              <button type="button" onClick={prevImage} disabled={currentIndex === 0}>
                ← Назад
              </button>

              <span>
                {currentIndex + 1} / {images.length}
              </span>

              <button
                type="button"
                onClick={nextImage}
                disabled={currentIndex === images.length - 1}
              >
                Вперёд →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
