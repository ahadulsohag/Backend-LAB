import { useState, useEffect } from 'react'
import Header from './components/Header'
import PetList from './components/PetList'
import Auth from './components/Auth'
import PetForm from './components/PetForm'
import { petAPI } from './services/api'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'))
    if (savedUser) {
      setUser(savedUser)
    }
    fetchPets()
  }, [])

  const fetchPets = async () => {
    try {
      setLoading(true)
      const { data } = await petAPI.getAll()
      setPets(data)
    } catch (err) {
      console.error('Error fetching pets:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAuthSuccess = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  const handleAdopt = async (petId) => {
    try {
      await petAPI.updateStatus(petId, 'Adopted')
      fetchPets()
    } catch (err) {
      alert('Must be logged in to adopt!')
    }
  }

  if (!user) {
    return (
      <div className="app">
        <Header user={null} />
        <div style={{ padding: '4rem 2rem' }}>
          <Auth onAuthSuccess={handleAuthSuccess} />
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="hero-section" style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("/hero-bg.png")',
        height: '400px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <h1 style={{ color: 'white', fontSize: '3.5rem', marginBottom: '1rem', textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>Modern Animal Farm</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Welcome to GreenPastures - our premium sustainable animal haven. Join us in providing elite care for our furry friends.</p>
      </div>

      <Header user={user} onLogout={handleLogout} />

      <main>
        {user.role === 'admin' && <PetForm onPetAdded={fetchPets} />}

        <div className="content-header" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '2rem' }}>Meet Our Residents</h2>
            <p style={{ color: 'var(--text-muted)' }}>{pets.length} animals currently in our care</p>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <p className="loader">Loading farm data...</p>
          </div>
        ) : (
          <PetList
            pets={pets}
            onAdopt={handleAdopt}
            onFeed={(id) => alert('Feeding pet... Successful!')}
            onPlay={(id) => alert('Playing with pet... Happiness increased!')}
          />
        )}
      </main>

      <footer style={{ padding: '4rem 2rem', textAlign: 'center', background: '#f0f2f0', color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4rem' }}>
        <p>&copy; 2026 GreenPastures Animal Farm. All rights reserved.</p>
        <p style={{ marginTop: '0.5rem' }}>Fostering love and sustainability in every paw print.</p>
      </footer>
    </div>
  )
}

export default App