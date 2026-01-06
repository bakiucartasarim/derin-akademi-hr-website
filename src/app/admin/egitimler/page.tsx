'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Training {
  id: string
  title: string
  description: string
  features: string[]
  duration: string
  iconColor: string
}

export default function AdminTrainings() {
  const [trainings, setTrainings] = useState<Training[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const router = useRouter()

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    features: ['', '', ''],
    duration: '',
    iconColor: 'blue'
  })

  const colorOptions = [
    { value: 'blue', label: 'Mavi', class: 'bg-blue-100 text-blue-600' },
    { value: 'green', label: 'Yeşil', class: 'bg-green-100 text-green-600' },
    { value: 'purple', label: 'Mor', class: 'bg-purple-100 text-purple-600' },
    { value: 'red', label: 'Kırmızı', class: 'bg-red-100 text-red-600' },
    { value: 'yellow', label: 'Sarı', class: 'bg-yellow-100 text-yellow-600' },
    { value: 'indigo', label: 'İndigo', class: 'bg-indigo-100 text-indigo-600' },
  ]

  useEffect(() => {
    // Admin girişi kontrolü
    const adminLoggedIn = localStorage.getItem('adminLoggedIn')
    if (adminLoggedIn !== 'true') {
      router.push('/admin')
      return
    }
    setIsAuthenticated(true)

    // Mevcut eğitimleri yükle
    loadTrainings().then(() => setLoading(false))
  }, [router])

  const loadTrainings = async () => {
    try {
      const response = await fetch('/api/trainings')
      if (response.ok) {
        const data = await response.json()
        setTrainings(data)
      } else {
        console.error('Failed to load trainings')
        setTrainings([])
      }
    } catch (error) {
      console.error('Error loading trainings:', error)
      setTrainings([])
    }
  }

  const saveTraining = async (training: Training, isEdit: boolean = false) => {
    try {
      const method = isEdit ? 'PUT' : 'POST'
      const response = await fetch('/api/trainings', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(training),
      })
      
      if (response.ok) {
        loadTrainings()
        return true
      } else {
        console.error('Failed to save training')
        return false
      }
    } catch (error) {
      console.error('Error saving training:', error)
      return false
    }
  }

  const deleteTraining = async (id: string) => {
    try {
      const response = await fetch(`/api/trainings?id=${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        loadTrainings()
        return true
      } else {
        console.error('Failed to delete training')
        return false
      }
    } catch (error) {
      console.error('Error deleting training:', error)
      return false
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn')
    router.push('/admin')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const trainingData: Training = {
      ...formData,
      id: editingId || '',
      features: formData.features.filter(f => f.trim() !== '')
    }

    const success = await saveTraining(trainingData, !!editingId)
    if (success) {
      resetForm()
    } else {
      alert('Kayıt sırasında hata oluştu!')
    }
  }

  const handleEdit = (training: Training) => {
    setFormData({
      ...training,
      features: [...training.features, '', '', ''].slice(0, 3) // Ensure 3 features
    })
    setEditingId(training.id)
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Bu eğitimi silmek istediğinizden emin misiniz?')) {
      const success = await deleteTraining(id)
      if (!success) {
        alert('Silme sırasında hata oluştu!')
      }
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      features: ['', '', ''],
      duration: '',
      iconColor: 'blue'
    })
    setEditingId(null)
    setShowModal(false)
  }

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData({...formData, features: newFeatures})
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>
  }

  if (!isAuthenticated) {
    return <div>Yetkiniz yok...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Eğitimler Yönetimi</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Yeni Eğitim Ekle
            </button>
            <button
              onClick={() => router.push('/admin/egitim-icerikleri')}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Eğitim İçerikleri
            </button>
            <button
              onClick={() => router.push('/admin/referanslar')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Referanslar
            </button>
            <button
              onClick={() => router.push('/admin/iletisim')}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            >
              İletişim
            </button>
            <button
              onClick={() => router.push('/egitimler')}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Siteyi Görüntüle
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Çıkış
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainings.map((training) => (
            <div key={training.id} className="bg-white rounded-xl shadow-lg p-6 relative">
              <div className={`w-16 h-16 ${colorOptions.find(c => c.value === training.iconColor)?.class} rounded-xl flex items-center justify-center mb-6`}>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{training.title}</h3>
              <p className="text-gray-600 mb-6 text-sm">{training.description}</p>
              
              <ul className="space-y-2 mb-6">
                {training.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className={`text-${training.iconColor}-600 font-semibold mb-4`}>
                {training.duration}
              </div>
              
              {/* Actions */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={() => handleEdit(training)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(training.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">
                {editingId ? 'Eğitimi Düzenle' : 'Yeni Eğitim Ekle'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Eğitim Başlığı</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Açıklama</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Özellikler (En fazla 3)</label>
                  {formData.features.map((feature, index) => (
                    <div key={index} className="mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        placeholder={`Özellik ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Süre</label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      placeholder="örn: 16 Saat • Sertifikalı"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">İkon Rengi</label>
                    <select
                      value={formData.iconColor}
                      onChange={(e) => setFormData({...formData, iconColor: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    >
                      {colorOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    {editingId ? 'Güncelle' : 'Ekle'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}