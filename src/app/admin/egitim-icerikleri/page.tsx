'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface LinkedInContent {
  id: string
  title: string
  description: string
  url: string
  embedUrl: string
  thumbnail?: string
}

export default function AdminLinkedInContents() {
  const [contents, setContents] = useState<LinkedInContent[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const router = useRouter()

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    embedUrl: ''
  })

  useEffect(() => {
    // Admin girişi kontrolü
    const adminLoggedIn = localStorage.getItem('adminLoggedIn')
    if (adminLoggedIn !== 'true') {
      router.push('/admin')
      return
    }
    setIsAuthenticated(true)

    // Mevcut içerikleri yükle
    loadContents().then(() => setLoading(false))
  }, [router])

  const loadContents = async () => {
    try {
      const response = await fetch('/api/linkedin-contents')
      if (response.ok) {
        const data = await response.json()
        setContents(data)
      } else {
        console.error('Failed to load contents')
        setContents([])
      }
    } catch (error) {
      console.error('Error loading contents:', error)
      setContents([])
    }
  }

  const saveContent = async (content: LinkedInContent, isEdit: boolean = false) => {
    try {
      const method = isEdit ? 'PUT' : 'POST'
      const response = await fetch('/api/linkedin-contents', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      })

      if (response.ok) {
        loadContents()
        return true
      } else {
        console.error('Failed to save content')
        return false
      }
    } catch (error) {
      console.error('Error saving content:', error)
      return false
    }
  }

  const deleteContent = async (id: string) => {
    try {
      const response = await fetch(`/api/linkedin-contents?id=${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        loadContents()
        return true
      } else {
        console.error('Failed to delete content')
        return false
      }
    } catch (error) {
      console.error('Error deleting content:', error)
      return false
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn')
    router.push('/admin')
  }

  // LinkedIn URL'den embed URL'i oluştur
  const extractEmbedUrl = (linkedinUrl: string): string => {
    // URL'den activity ID'sini çıkar
    const activityMatch = linkedinUrl.match(/activity-(\d+)/)
    if (activityMatch) {
      const activityId = activityMatch[1]
      return `https://www.linkedin.com/embed/feed/update/urn:li:activity:${activityId}`
    }
    return ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Embed URL'i otomatik oluştur
    const embedUrl = formData.embedUrl || extractEmbedUrl(formData.url)

    if (!embedUrl) {
      alert('Geçersiz LinkedIn URL formatı!')
      return
    }

    const contentData: LinkedInContent = {
      ...formData,
      embedUrl,
      id: editingId || ''
    }

    const success = await saveContent(contentData, !!editingId)
    if (success) {
      resetForm()
    } else {
      alert('Kayıt sırasında hata oluştu!')
    }
  }

  const handleEdit = (content: LinkedInContent) => {
    setFormData({
      title: content.title,
      description: content.description,
      url: content.url,
      embedUrl: content.embedUrl
    })
    setEditingId(content.id)
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Bu içeriği silmek istediğinizden emin misiniz?')) {
      const success = await deleteContent(id)
      if (!success) {
        alert('Silme sırasında hata oluştu!')
      }
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      url: '',
      embedUrl: ''
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
          <h1 className="text-2xl font-bold text-gray-900">Eğitim İçerikleri Yönetimi</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Yeni İçerik Ekle
            </button>
            <button
              onClick={() => router.push('/admin/egitimler')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Eğitimler
            </button>
            <button
              onClick={() => router.push('/admin/referanslar')}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            >
              Referanslar
            </button>
            <button
              onClick={() => router.push('/egitim-icerikleri')}
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
        {contents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">Henüz içerik eklenmemiş</p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
            >
              İlk İçeriği Ekle
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {contents.map((content) => (
              <div key={content.id} className="bg-white rounded-xl shadow-lg p-6 relative">
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(content)}
                    className="text-blue-600 hover:text-blue-800 text-2xl"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(content.id)}
                    className="text-red-600 hover:text-red-800 text-2xl"
                  >
                    🗑️
                  </button>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 pr-20">{content.title}</h3>
                <p className="text-gray-600 mb-3 text-sm">{content.description}</p>

                <div className="bg-gray-100 rounded-lg p-2 mb-3">
                  <p className="text-xs text-gray-600 truncate">
                    <strong>URL:</strong> {content.url}
                  </p>
                </div>

                {/* LinkedIn Preview */}
                <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                  <iframe
                    src={content.embedUrl}
                    height="300"
                    width="100%"
                    frameBorder="0"
                    allowFullScreen
                    title={content.title}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">
                {editingId ? 'İçeriği Düzenle' : 'Yeni İçerik Ekle'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">İçerik Başlığı</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="örn: İnsan Kaynakları - Kara Kutusu"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Açıklama</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24"
                    placeholder="İçerik hakkında kısa açıklama"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData({...formData, url: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="https://www.linkedin.com/posts/..."
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    LinkedIn post URL'ini buraya yapıştırın. Embed URL otomatik oluşturulacak.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Embed URL (Opsiyonel)</label>
                  <input
                    type="text"
                    value={formData.embedUrl}
                    onChange={(e) => setFormData({...formData, embedUrl: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="Otomatik oluşturulacak, elle de girebilirsiniz"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Boş bırakırsanız LinkedIn URL'inden otomatik oluşturulur.
                  </p>
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
