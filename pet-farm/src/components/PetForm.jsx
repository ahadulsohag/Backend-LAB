import { useState } from 'react';
import { petAPI } from '../services/api';

const PetForm = ({ onPetAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        species: 'Dog',
        breed: '',
        age: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await petAPI.create(formData);
            setFormData({ name: '', species: 'Dog', breed: '', age: '', description: '' });
            onPetAdded();
            setIsOpen(false);
        } catch (err) {
            alert('Error adding pet: ' + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                style={{
                    padding: '1rem 2rem',
                    background: 'var(--primary)',
                    color: 'white',
                    marginBottom: '2rem',
                    borderRadius: '12px',
                    boxShadow: '0 4px 14px 0 rgba(45, 90, 39, 0.39)'
                }}
            >
                + Register New Resident
            </button>
        );
    }

    return (
        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '3rem', border: '1px solid var(--primary-light)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.5rem' }}>Resident Registration</h3>
                <button onClick={() => setIsOpen(false)} style={{ background: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', padding: '0.5rem' }}>&times;</button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.85rem' }}>Animal Name</label>
                        <input
                            placeholder="e.g. Bella"
                            style={{ width: '100%' }}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.85rem' }}>Species</label>
                        <select
                            style={{ width: '100%' }}
                            value={formData.species}
                            onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                        >
                            <option value="Dog">Dog</option>
                            <option value="Cat">Cat</option>
                            <option value="Rabbit">Rabbit</option>
                            <option value="Bird">Bird</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.85rem' }}>Breed (Optional)</label>
                        <input
                            placeholder="e.g. Golden Retriever"
                            style={{ width: '100%' }}
                            value={formData.breed}
                            onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.85rem' }}>Age (Years)</label>
                        <input
                            type="number"
                            placeholder="e.g. 2"
                            style={{ width: '100%' }}
                            value={formData.age}
                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.85rem' }}>Description & Biography</label>
                    <textarea
                        placeholder="Tell us about the animal's personality and needs..."
                        style={{ width: '100%', minHeight: '100px', resize: 'vertical' }}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{ flex: 2, padding: '1rem', background: 'var(--primary)', color: 'white' }}
                    >
                        {loading ? 'Adding to Records...' : 'Complete Registration'}
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        style={{ flex: 1, padding: '1rem', background: '#fff', border: '1px solid #ddd' }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PetForm;
