import { useEffect, useRef } from 'react';

export default function ImageLightbox({
  items,
  activeIndex,
  onClose,
  onNavigate,
  closeLabel = 'Close preview',
  openRawLabel = 'Open original',
}) {
  const dialogRef = useRef(null);
  const isOpen = activeIndex !== null && activeIndex >= 0 && items?.length > 0;
  const current = isOpen ? items[activeIndex] : null;
  const hasMultiple = (items?.length ?? 0) > 1;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !hasMultiple) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        onNavigate((activeIndex + 1) % items.length);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onNavigate((activeIndex - 1 + items.length) % items.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, hasMultiple, activeIndex, items, onNavigate]);

  const handleBackdropClick = (event) => {
    if (event.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="image-lightbox"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={handleBackdropClick}
      aria-label={current?.alt || 'Image preview'}
    >
      {current ? (
        <div className="image-lightbox-shell">
          <div className="image-lightbox-bar">
            <span className="label-text image-lightbox-counter">
              {hasMultiple ? `${String(activeIndex + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}` : 'Preview'}
            </span>
            <div className="image-lightbox-controls">
              <a
                href={current.src}
                target="_blank"
                rel="noopener noreferrer"
                className="image-lightbox-action"
              >
                {openRawLabel} <span aria-hidden="true">↗</span>
              </a>
              <button
                type="button"
                className="image-lightbox-close"
                onClick={onClose}
                aria-label={closeLabel}
              >
                ×
              </button>
            </div>
          </div>

          <div className="image-lightbox-stage">
            {hasMultiple ? (
              <button
                type="button"
                className="image-lightbox-nav image-lightbox-nav--prev"
                onClick={() => onNavigate((activeIndex - 1 + items.length) % items.length)}
                aria-label="Previous image"
              >
                ←
              </button>
            ) : null}

            <figure key={current.src} className="image-lightbox-figure">
              <img src={current.src} alt={current.alt} decoding="async" />
              {current.caption ? <figcaption>{current.caption}</figcaption> : null}
            </figure>

            {hasMultiple ? (
              <button
                type="button"
                className="image-lightbox-nav image-lightbox-nav--next"
                onClick={() => onNavigate((activeIndex + 1) % items.length)}
                aria-label="Next image"
              >
                →
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
