import './PetCard.css'

function PetCard({ pet, onAdopt, onFeed, onPlay }) {
  const isAdopted = pet.status === 'Adopted'

  const getPetEmoji = (species) => {
    const emojis = {
      dog: '🐕',
      cat: '🐈',
      rabbit: '🐰',
      fish: '🐠',
      bird: '🦜',
      turtle: '🐢',
      other: '🐾'
    }
    return emojis[species?.toLowerCase()] || '🐾'
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return '#4CAF50';
      case 'Adopted': return '#2196F3';
      case 'Pending': return '#FF9800';
      default: return '#9E9E9E';
    }
  }

  return (
    <div className={`pet-card glass-panel ${isAdopted ? 'adopted' : ''}`}>
      <div className="pet-image-container">
        {pet.imageUrl ? (
          <img src={pet.imageUrl} alt={pet.name} className="pet-image" />
        ) : (
          <div className="pet-emoji-placeholder">{getPetEmoji(pet.species)}</div>
        )}
        <div className="pet-status-badge" style={{ backgroundColor: getStatusColor(pet.status) }}>
          {pet.status}
        </div>
      </div>

      <div className="pet-body">
        <div className="pet-meta">
          <span className="pet-species-tag">{pet.species}</span>
          {pet.breed && <span className="pet-breed-tag">{pet.breed}</span>}
        </div>

        <h3 className="pet-name">{pet.name}</h3>
        <p className="pet-age-text">{pet.age} {pet.age === 1 ? 'Year' : 'Years'} Old</p>

        <p className="pet-description">
          {pet.description || "A wonderful resident of our farm waiting for a forever home."}
        </p>

        <div className="pet-actions-grid">
          {isAdopted ? (
            <div className="pet-adopted-full">Part of a new family! 🎉</div>
          ) : (
            <>
              <button
                className="btn-primary-small"
                onClick={() => onAdopt(pet._id || pet.id)}
              >
                Adopt Now
              </button>
              <div className="btn-group-row">
                <button
                  className="btn-icon"
                  title="Feed"
                  onClick={() => onFeed(pet._id || pet.id)}
                >
                  🍖
                </button>
                <button
                  className="btn-icon"
                  title="Play"
                  onClick={() => onPlay(pet._id || pet.id)}
                >
                  🎾
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default PetCard