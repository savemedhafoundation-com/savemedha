import './OrganModal.css'

const OrganModal = ({ organ, onClose }) => {
  if (!organ) return null

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`${organ.name} details`}
      onClick={onClose}
    >
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <div>
            <p className="modal-label">Selected Organ</p>
            <h3>{organ.name}</h3>
          </div>
          <button className="close-button" type="button" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="info-block">
            <p className="block-label">Function</p>
            <p className="block-text">{organ.function}</p>
          </div>

          <div className="info-block two-col">
            <div>
              <p className="block-label">Natural Immunotherapy</p>
              <p className="block-text">{organ.nit_reason}</p>
            </div>
            <div>
              <p className="block-label">Support Tips</p>
              <p className="block-text">{organ.nit_support}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrganModal
