import PetCard from './PetCard'
import './PetList.css'

function PetList({ pets, onAdopt, onFeed, onPlay }) {
  return (
    <div className="pet-list">
      <h2 className="section-title">Our Pets</h2>
      <div className="pets-grid">
        {pets.map(pet => (
          <PetCard
            key={pet.id}
            pet={pet}
            onAdopt={onAdopt}
            onFeed={onFeed}
            onPlay={onPlay}
          />
        ))}
      </div>
    </div>
  )
}

export default PetList