'use client'

export default function ContentList({ contents, onDelete }) {
  if (contents.length === 0) {
    return <div className="card" style={{ textAlign: 'center', color: '#999' }}>No content yet. Create one to get started!</div>
  }

  return (
    <div>
      {contents.map(content => (
        <div key={content.id} className="card">
          <h3>{content.title}</h3>
          <p>{content.description}</p>
          <small style={{ color: '#999' }}>
            {new Date(content.created_at).toLocaleDateString()}
          </small>
          <div style={{ marginTop: '10px' }}>
            <button
              onClick={() => onDelete(content.id)}
              style={{ backgroundColor: '#d32f2f' }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
