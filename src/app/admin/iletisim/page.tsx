'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface ContactInfo {
  address: string
  addressDetail: string
  phone: string
  phoneHours: string
  email: string
  emailResponse: string
  workingHours: {
    weekdays: string
    saturday: string
    sunday: string
  }
  whatsapp: string
}

interface FAQ {
  id: string
  question: string
  answer: string
}

export default function AdminContact() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    address: '',
    addressDetail: '',
    phone: '',
    phoneHours: '',
    email: '',
    emailResponse: '',
    workingHours: {
      weekdays: '',
      saturday: '',
      sunday: ''
    },
    whatsapp: ''
  })
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showFaqModal, setShowFaqModal] = useState(false)
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null)
  const router = useRouter()

  // FAQ Form state
  const [faqFormData, setFaqFormData] = useState({
    question: '',
    answer: ''
  })

  useEffect(() => {
    // Admin girişi kontrolü
    const adminLoggedIn = localStorage.getItem('adminLoggedIn')
    if (adminLoggedIn !== 'true') {
      router.push('/admin')
      return
    }
    setIsAuthenticated(true)

    // Mevcut verileri yükle
    loadContactData().then(() => setLoading(false))
  }, [router])

  const loadContactData = async () => {
    // İletişim bilgileri yükle
    try {
      const contactResponse = await fetch('/api/contact')
      if (contactResponse.ok) {
        const contactData = await contactResponse.json()
        setContactInfo(contactData)
      }
    } catch (error) {
      console.error('Error loading contact info:', error)
    }

    // FAQ'ları yükle
    try {
      const faqsResponse = await fetch('/api/faqs')
      if (faqsResponse.ok) {
        const faqsData = await faqsResponse.json()
        setFaqs(faqsData)
      }
    } catch (error) {
      console.error('Error loading FAQs:', error)
    }
  }

  const saveContactInfo = async (data: ContactInfo) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      if (response.ok) {
        setContactInfo(data)
        return true
      } else {
        console.error('Failed to save contact info')
        return false
      }
    } catch (error) {
      console.error('Error saving contact info:', error)
      return false
    }
  }

  const saveFAQ = async (faq: FAQ, isEdit: boolean = false) => {
    try {
      const method = isEdit ? 'PUT' : 'POST'
      const response = await fetch('/api/faqs', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(faq),
      })
      
      if (response.ok) {
        loadContactData()
        return true
      } else {
        console.error('Failed to save FAQ')
        return false
      }
    } catch (error) {
      console.error('Error saving FAQ:', error)
      return false
    }
  }

  const deleteFAQ = async (id: string) => {
    try {
      const response = await fetch(`/api/faqs?id=${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        loadContactData()
        return true
      } else {
        console.error('Failed to delete FAQ')
        return false
      }
    } catch (error) {
      console.error('Error deleting FAQ:', error)
      return false
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn')
    router.push('/admin')
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await saveContactInfo(contactInfo)
    if (success) {
      alert('İletişim bilgileri güncellendi!')
    } else {
      alert('Güncelleme sırasında hata oluştu!')
    }
  }

  const handleFaqSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const faqData: FAQ = {
      ...faqFormData,
      id: editingFaqId || '',
    }

    const success = await saveFAQ(faqData, !!editingFaqId)
    if (success) {
      resetFaqForm()
    } else {
      alert('Kayıt sırasında hata oluştu!')
    }
  }

  const handleEditFaq = (faq: FAQ) => {
    setFaqFormData({
      question: faq.question,
      answer: faq.answer
    })
    setEditingFaqId(faq.id)
    setShowFaqModal(true)
  }

  const handleDeleteFaq = async (id: string) => {
    if (confirm('Bu FAQ\'ı silmek istediğinizden emin misiniz?')) {
      const success = await deleteFAQ(id)
      if (!success) {
        alert('Silme sırasında hata oluştu!')
      }
    }
  }

  const resetFaqForm = () => {
    setFaqFormData({
      question: '',
      answer: ''
    })
    setEditingFaqId(null)
    setShowFaqModal(false)
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
          <h1 className="text-2xl font-bold text-gray-900">İletişim Yönetimi</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/admin/referanslar')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Referanslar
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
              onClick={() => router.push('/iletisim')}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* İletişim Bilgileri */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">İletişim Bilgileri</h2>
            
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Adres</label>
                <input
                  type="text"
                  value={contactInfo.address}
                  onChange={(e) => setContactInfo({...contactInfo, address: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Adres Detayı</label>
                <textarea
                  value={contactInfo.addressDetail}
                  onChange={(e) => setContactInfo({...contactInfo, addressDetail: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Telefon</label>
                  <input
                    type="text"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Telefon Saatleri</label>
                  <input
                    type="text"
                    value={contactInfo.phoneHours}
                    onChange={(e) => setContactInfo({...contactInfo, phoneHours: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">E-posta</label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">E-posta Yanıt Süresi</label>
                  <input
                    type="text"
                    value={contactInfo.emailResponse}
                    onChange={(e) => setContactInfo({...contactInfo, emailResponse: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Çalışma Saatleri</label>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Hafta içi"
                    value={contactInfo.workingHours.weekdays}
                    onChange={(e) => setContactInfo({
                      ...contactInfo, 
                      workingHours: {...contactInfo.workingHours, weekdays: e.target.value}
                    })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Cumartesi"
                    value={contactInfo.workingHours.saturday}
                    onChange={(e) => setContactInfo({
                      ...contactInfo, 
                      workingHours: {...contactInfo.workingHours, saturday: e.target.value}
                    })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Pazar"
                    value={contactInfo.workingHours.sunday}
                    onChange={(e) => setContactInfo({
                      ...contactInfo, 
                      workingHours: {...contactInfo.workingHours, sunday: e.target.value}
                    })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">WhatsApp Linki</label>
                <input
                  type="url"
                  value={contactInfo.whatsapp}
                  onChange={(e) => setContactInfo({...contactInfo, whatsapp: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700"
              >
                İletişim Bilgilerini Kaydet
              </button>
            </form>
          </div>

          {/* FAQ Yönetimi */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">FAQ Yönetimi</h2>
              <button
                onClick={() => setShowFaqModal(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Yeni FAQ Ekle
              </button>
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {faqs.map((faq) => (
                <div key={faq.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                      <p className="text-gray-600 text-sm">{faq.answer}</p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEditFaq(faq)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeleteFaq(faq.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Modal */}
      {showFaqModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">
                {editingFaqId ? 'FAQ Düzenle' : 'Yeni FAQ Ekle'}
              </h2>
              
              <form onSubmit={handleFaqSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Soru</label>
                  <input
                    type="text"
                    value={faqFormData.question}
                    onChange={(e) => setFaqFormData({...faqFormData, question: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Cevap</label>
                  <textarea
                    value={faqFormData.answer}
                    onChange={(e) => setFaqFormData({...faqFormData, answer: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-32"
                    required
                  />
                </div>
                
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={resetFaqForm}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    {editingFaqId ? 'Güncelle' : 'Ekle'}
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