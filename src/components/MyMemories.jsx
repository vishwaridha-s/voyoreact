import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import UserNavBar from './UserNavBar';

function MyMemories() {
  const [places, setPlaces] = useState([]);
  const [memories, setMemories] = useState([]);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    title: '',
    notes: '',
    review: '',
    mood: '',
    favoriteMoment: '',
    placeId: ''
  });
  const [image, setImage] = useState(null);
  const [saving, setSaving] = useState(false);
  const userId = localStorage.getItem('userId');

  const apiBase = 'https://voyoge.onrender.com';

  useEffect(() => {
    if (userId) {
      loadPlaces();
      loadMemories();
    }
  }, [userId]);

  const loadPlaces = () => {
    axios.get(`${apiBase}/user-places/places`)
      .then(res => setPlaces(res.data))
      .catch(err => console.error('Failed to load place list', err));
  };

  const loadMemories = () => {
    setError(null);
    axios.get(`${apiBase}/memories/user/${userId}`)
      .then(res => setMemories(res.data))
      .catch(err => {
        console.error('Failed to load memories', err);
        setError(err.response?.data || err.message || 'Unable to reach backend');
      });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.title || !form.placeId || !image) {
      alert('Please select a place, choose an image, and add a title.');
      return;
    }

    setSaving(true);
    const formData = new FormData();
    formData.append('memory', new Blob([JSON.stringify(form)], { type: 'application/json' }));
    formData.append('image', image);

    try {
      await axios.post(`${apiBase}/memories/add/${userId}/${form.placeId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setForm({ title: '', notes: '', review: '', mood: '', favoriteMoment: '', placeId: '' });
      setImage(null);
      loadMemories();
      alert('Memory saved — your travel story is now living in the gallery.');
    } catch (error) {
      console.error('Failed to save memory', error);
      alert('Could not save memory. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const deleteMemory = (id) => {
    if (!window.confirm('Remove this memory from your journal?')) return;
    axios.delete(`${apiBase}/memories/delete/${id}`)
      .then(() => loadMemories())
      .catch(err => console.error('Failed to delete memory', err));
  };

  const blobToDataURL = (blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

  const downloadMemory = async (memory) => {
    try {
      const response = await axios.get(`${apiBase}/memories/image/${memory.id}`, {
        responseType: 'blob'
      });
      const dataUrl = await blobToDataURL(response.data);
      const doc = new jsPDF({ unit: 'mm', format: 'a4' });
      const pageWidth = 190;
      const pageHeight = 297;
      let cursor = 20;

      doc.setFillColor(255, 204, 229); 
      doc.roundedRect(0, 0, pageWidth + 20, 35, 5, 5, 'F');
      doc.setTextColor(102, 0, 102); 
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('My Cute Travel Memory', 15, 22);
      doc.setFontSize(12);
      doc.text('A pastel travel keepsake', 15, 32);
      cursor = 45;

      doc.setTextColor(204, 0, 102);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text(memory.title || 'Sweet Memory', 15, cursor);
      cursor += 15;

      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(153, 0, 153);
      doc.text('Destination:', 15, cursor);
      doc.setTextColor(0, 0, 0);
      doc.text(memory.place?.location || 'Mysterious Place', 55, cursor);
      cursor += 10;

      doc.setTextColor(153, 0, 153);
      doc.text('Mood:', 15, cursor);
      doc.setTextColor(0, 0, 0);
      doc.text(memory.mood || 'Joyful', 55, cursor);
      cursor += 10;

      doc.setTextColor(153, 0, 153);
      doc.text('Favorite Moment:', 15, cursor);
      doc.setTextColor(0, 0, 0);
      doc.text(memory.favoriteMoment || 'A heartwarming memory', 65, cursor);
      cursor += 15;

      doc.setFillColor(255, 235, 242); 
      doc.roundedRect(10, cursor - 5, pageWidth - 10, 40, 3, 3, 'F');
      doc.setTextColor(153, 0, 153);
      doc.setFontSize(12);
      doc.text('Review:', 15, cursor);
      cursor += 8;
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);
      const splitReview = doc.splitTextToSize(memory.review || memory.notes || 'No words can describe this moment.', pageWidth - 40);
      doc.text(splitReview, 15, cursor);
      cursor += splitReview.length * 6 + 15;

      if (dataUrl && dataUrl.startsWith('data:image/')) {
        const imgWidth = 160;
        const imgHeight = 90;
        if (cursor + imgHeight > pageHeight - 30) {
          doc.addPage();
          cursor = 20;
        }
        doc.setDrawColor(204, 0, 102);
        doc.setLineWidth(1.5);
        doc.roundedRect(15, cursor - 5, imgWidth + 10, imgHeight + 10, 5, 5);
        doc.addImage(dataUrl, memory.imageType?.includes('png') ? 'PNG' : 'JPEG', 20, cursor, imgWidth, imgHeight);
        cursor += imgHeight + 20;
      } else {
        doc.setTextColor(204, 0, 102);
        doc.text('Image not available', 15, cursor);
        cursor += 10;
      }

      doc.setFontSize(10);
      doc.setTextColor(170, 51, 102);
      doc.text('Made with love by Voyo', 15, pageHeight - 10);

      doc.save(`${memory.title ? memory.title.replace(/\W+/g, '_') : 'cute_memory'}.pdf`);
    } catch (error) {
      console.error('PDF generation failed', error);
      alert('Unable to generate PDF for this memory.');
    }
  };

  return (
    <div className="animate-fade-in">
      <UserNavBar />
      <div className="page-wrapper">
        <header className="mb-8">
          <h1 className="text-3xl title-gradient">My Travel Memories 📸</h1>
          <p className="text-muted">Preserve the magic of your journeys forever...</p>
        </header>

        <section className="card mb-12 animate-fade-in">
          <h2 className="text-xl mb-4" style={{ color: 'var(--primary-dark)' }}>Capture a New Moment ✨</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="form-label">Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Memory title (e.g. Sunset in Kyoto)"
                className="input-field"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="form-label">Destination</label>
              <select
                name="placeId"
                value={form.placeId}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Where did this happen?</option>
                {places.map(place => (
                  <option key={place.id} value={place.id}>{place.location}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="form-label">Mood</label>
              <input
                name="mood"
                value={form.mood}
                onChange={handleChange}
                placeholder="How did you feel? (e.g. Peaceful)"
                className="input-field"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="form-label">Favorite Moment</label>
              <input
                name="favoriteMoment"
                value={form.favoriteMoment}
                onChange={handleChange}
                placeholder="The highlight of your trip"
                className="input-field"
              />
            </div>
            <div className="col-span-full flex flex-col gap-1">
              <label className="form-label">Review</label>
              <textarea
                name="review"
                value={form.review}
                onChange={handleChange}
                placeholder="What would you tell others about this place?"
                rows={3}
                className="input-field"
              />
            </div>
            <div className="col-span-full flex flex-col gap-1">
              <label className="form-label">Notes</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Add your personal notes and stories..."
                rows={3}
                className="input-field"
              />
            </div>
            <div className="col-span-full flex flex-col gap-2">
              <label className="form-label">Memory Photo</label>
              <input type="file" accept="image/*" onChange={handleImage} className="input-field" style={{ padding: '0.6rem' }} required />
            </div>
            <button
              type="submit"
              disabled={saving}
              className="col-span-full btn btn-primary py-4"
              style={{ marginTop: '1rem' }}
            >
              {saving ? 'Saving your story...' : 'Publish to Diary 📔'}
            </button>
          </form>
        </section>

        <section>
          <h2 className="text-2xl mb-6 title-gradient">My Travel Diary</h2>
          {memories.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
              <p style={{ fontSize: '3rem' }}>🍃</p>
               <p className="text-muted">No memories recorded yet. Start sharing your adventures!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-8">
              {memories.map(memory => (
                <div key={memory.id} className="card animate-fade-in" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'relative' }}>
                    {memory.imageType ? (
                      <img
                        src={`${apiBase}/memories/image/${memory.id}`}
                        alt={memory.title}
                        style={{ width: '100%', height: '280px', objectFit: 'cover' }}
                      />
                    ) : (
                      <div className="flex h-72 items-center justify-center bg-slate-100 text-muted">
                        No image available
                      </div>
                    )}
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem' }} className="badge badge-pink">
                       {memory.mood || 'Inspired'}
                    </div>
                  </div>
                  
                  <div style={{ padding: '1.5rem' }}>
                    <div className="mb-4">
                      <h2 className="text-2xl" style={{ color: 'var(--primary-dark)' }}>{memory.title}</h2>
                      <p className="text-muted">📍 {memory.place?.location || 'Unknown place'}</p>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      {memory.favoriteMoment && (
                         <div className="card" style={{ background: 'var(--bg-main)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: 'none' }}>
                            <p style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--primary-dark)' }}>Favorite Moment</p>
                            <p className="text-muted">{memory.favoriteMoment}</p>
                         </div>
                      )}
                      
                      <p className="text-muted" style={{ fontStyle: 'italic' }}>"{memory.review || memory.notes || 'A journey of a thousand miles begins with a single step.'}"</p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => downloadMemory(memory)}
                        className="btn btn-secondary flex-1"
                      >
                        Download PDF 📄
                      </button>
                      <button
                        onClick={() => deleteMemory(memory.id)}
                        className="btn btn-outline"
                        style={{ borderColor: '#ff6b6b', color: '#ff6b6b' }}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default MyMemories;
