'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Testimonial {
  id: string
  companyName: string
  companyInitials: string
  sector: string
  testimonialText: string
  authorName: string
  authorTitle: string
  rating: number
  bgColor: string
}

export default function AdminReferences() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const router = useRouter()

  // Form state
  const [formData, setFormData] = useState({
    companyName: '',
    companyInitials: '',
    sector: '',
    testimonialText: '',
    authorName: '',
    authorTitle: '',
    rating: 5,
    bgColor: 'blue'
  })

  const colorOptions = [
    { value: 'blue', label: 'Mavi', class: 'bg-blue-100 text-blue-600' },
    { value: 'green', label: 'Yeşil', class: 'bg-green-100 text-green-600' },
    { value: 'purple', label: 'Mor', class: 'bg-purple-100 text-purple-600' },
    { value: 'red', label: 'Kırmızı', class: 'bg-red-100 text-red-600' },
    { value: 'indigo', label: 'İndigo', class: 'bg-indigo-100 text-indigo-600' },
    { value: 'yellow', label: 'Sarı', class: 'bg-yellow-100 text-yellow-600' },
  ]

  useEffect(() => {
    // Admin girişi kontrolü
    const adminLoggedIn = localStorage.getItem('adminLoggedIn')
    if (adminLoggedIn !== 'true') {
      router.push('/admin')
      return
    }
    setIsAuthenticated(true)

    // Mevcut referansları yükle
    loadTestimonials().then(() => setLoading(false))
  }, [router])

  const loadTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials')
      if (response.ok) {
        const data = await response.json()
        setTestimonials(data)
      } else {
        console.error('Failed to load testimonials')
        setTestimonials([])
      }
    } catch (error) {
      console.error('Error loading testimonials:', error)
      setTestimonials([])
    }
  }

  const saveTestimonial = async (testimonial: Testimonial, isEdit: boolean = false) => {
    try {
      const method = isEdit ? 'PUT' : 'POST'
      const response = await fetch('/api/testimonials', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testimonial),
      })
      
      if (response.ok) {
        loadTestimonials()
        return true
      } else {
        console.error('Failed to save testimonial')
        return false
      }
    } catch (error) {
      console.error('Error saving testimonial:', error)
      return false
    }
  }

  const deleteTestimonial = async (id: string) => {
    try {
      const response = await fetch(`/api/testimonials?id=${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        loadTestimonials()
        return true
      } else {
        console.error('Failed to delete testimonial')
        return false
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error)
      return false
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn')
    router.push('/admin')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const testimonialData: Testimonial = {
      ...formData,
      id: editingId || '',
    }

    const success = await saveTestimonial(testimonialData, !!editingId)
    if (success) {
      resetForm()
    } else {
      alert('Kayıt sırasında hata oluştu!')
    }
  }

  const handleEdit = (testimonial: Testimonial) => {
    setFormData(testimonial)
    setEditingId(testimonial.id)
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Bu referansı silmek istediğinizden emin misiniz?')) {
      const success = await deleteTestimonial(id)
      if (!success) {
        alert('Silme sırasında hata oluştu!')
      }
    }
  }

  const resetForm = () => {
    setFormData({
      companyName: '',
      companyInitials: '',
      sector: '',
      testimonialText: '',
      authorName: '',
      authorTitle: '',
      rating: 5,
      bgColor: 'blue'
    })
    setEditingId(null)
    setShowModal(false)
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
          <h1 className="text-2xl font-bold text-gray-900">Referanslar Yönetimi</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Yeni Referans Ekle
            </button>
            <button
              onClick={() => router.push('/admin/egitimler')}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Eğitimler
            </button>
            <button
              onClick={() => router.push('/admin/egitim-icerikleri')}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Eğitim İçerikleri
            </button>
            <button
              onClick={() => router.push('/admin/iletisim')}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            >
              İletişim
            </button>
            <button
              onClick={() => router.push('/referanslar')}
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
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-xl shadow-lg p-6 relative">
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 ${colorOptions.find(c => c.value === testimonial.bgColor)?.class} rounded-full flex items-center justify-center mr-4`}>
                  <span className="font-bold text-lg">{testimonial.companyInitials}</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{testimonial.companyName}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.sector}</p>
                </div>
              </div>
              
              <blockquote className="text-gray-700 mb-4 text-sm">
                &quot;{testimonial.testimonialText}&quot;
              </blockquote>
              
              <div className="flex items-center justify-between">
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
              </div>
              
              <p className="text-gray-600 text-xs mt-2">- {testimonial.authorName}, {testimonial.authorTitle}</p>
              
              {/* Actions */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={() => handleEdit(testimonial)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(testimonial.id)}
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
                {editingId ? 'Referansı Düzenle' : 'Yeni Referans Ekle'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Şirket Adı</label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Şirket Kısaltması</label>
                    <input
                      type="text"
                      value={formData.companyInitials}
                      onChange={(e) => setFormData({...formData, companyInitials: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      placeholder="örn: AŞ"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Sektör</label>
                  <input
                    type="text"
                    value={formData.sector}
                    onChange={(e) => setFormData({...formData, sector: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Referans Metni</label>
                  <textarea
                    value={formData.testimonialText}
                    onChange={(e) => setFormData({...formData, testimonialText: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Yetkili Adı</label>
                    <input
                      type="text"
                      value={formData.authorName}
                      onChange={(e) => setFormData({...formData, authorName: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Yetkili Ünvanı</label>
                    <input
                      type="text"
                      value={formData.authorTitle}
                      onChange={(e) => setFormData({...formData, authorTitle: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Puan (1-5)</label>
                    <select
                      value={formData.rating}
                      onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    >
                      {[1,2,3,4,5].map(n => (
                        <option key={n} value={n}>{n} Yıldız</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Renk</label>
                    <select
                      value={formData.bgColor}
                      onChange={(e) => setFormData({...formData, bgColor: e.target.value})}
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
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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