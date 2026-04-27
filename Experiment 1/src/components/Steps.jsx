// Breadcrumb step indicator
// steps: array of labels, current: index of active step (0-based)
export default function Steps({ steps, current }) {
  return (
    <div className="steps">
      {steps.map((label, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
          <div className={`step ${i < current ? 'done' : i === current ? 'active' : ''}`}>
            <div className="step-num">{i < current ? '✓' : i + 1}</div>
            <div className="step-label">{label}</div>
          </div>
          {i < steps.length - 1 && <div className="step-divider" />}
        </div>
      ))}
    </div>
  )
}
