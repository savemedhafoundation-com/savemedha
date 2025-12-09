import './OrganModal.css'

const OrganModal = ({ organ, onClose }) => {
  if (!organ) return null

  const imageSrc = organ.image

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`${organ.name} details`}
      onClick={onClose}
    >
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        <button className="close-button" type="button" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="organ-image-wrapper">
          {imageSrc ? (
            <img src={imageSrc} alt={`${organ.name} illustration`} loading="lazy" />
          ) : (
            <div className="image-placeholder" aria-hidden="true">
              {organ.name?.[0] ?? '?'}
            </div>
          )}
        </div>

        <div className="modal-body">
          <h3 className="modal-title">{organ.name}</h3>

          <div className="highlight-block">
            <p>{organ.function}</p>
          </div>

          <div className="info-row">
            <div className="info-column">
              <p className="column-label">Cause</p>
              <p className="column-text">{organ.nit_reason}</p>
            </div>
            <div className="info-column">
              <p className="column-label">NIT Perspective</p>
              <p className="column-text">{organ.nit_support}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrganModal
