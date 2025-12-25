'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

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

export default function Contact() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const defaultContact: ContactInfo = {
      address: 'İstanbul, Türkiye',
      addressDetail: 'Detaylı adres bilgisi için iletişime geçiniz.',
      phone: '+90 XXX XXX XX XX',
      phoneHours: 'Pazartesi - Cuma: 09:00 - 18:00',
      email: 'info@derinakademi.com',
      emailResponse: '24 saat içinde dönüş yapıyoruz',
      workingHours: {
        weekdays: 'Pazartesi - Cuma: 09:00 - 18:00',
        saturday: 'Cumartesi: 10:00 - 14:00',
        sunday: 'Pazar kapalı'
      },
      whatsapp: 'https://wa.me/90XXXXXXXXX'
    }
    
    const defaultFaqs: FAQ[] = [
          {
            id: '1',
            question: 'Eğitim programlarınız ne kadar sürüyor?',
            answer: 'Eğitim programlarımızın süreleri içeriklerine göre değişmektedir. Temel eğitimlerimiz 8-12 saat, kapsamlı programlarımız ise 16-24 saat arasındadır. Detaylı bilgi için iletişime geçebilirsiniz.'
          },
          {
            id: '2',
            question: 'Şirket içi eğitim hizmeti veriyor musunuz?',
            answer: 'Evet, şirket içi eğitim hizmeti vermekteyiz. İhtiyaçlarınıza özel eğitim programları hazırlayarak ekibinize özel çözümler sunabiliriz.'
          },
          {
            id: '3',
            question: 'Danışmanlık süreçleriniz nasıl işliyor?',
            answer: 'Öncelikle ücretsiz bir ön görüşme yapıyoruz. Ardından ihtiyaç analizi gerçekleştiriyor ve size özel çözüm önerileri sunuyoruz. Proje boyunca sürekli destek ve takip sağlıyoruz.'
          },
          {
            id: '4',
            question: 'Eğitim sonrası sertifika veriliyor mu?',
            answer: 'Tüm eğitim programlarımızı başarıyla tamamlayan katılımcılara Derin Akademi sertifikası verilmektedir.'
          }
    ]
    
    const loadContactData = async () => {
      try {
        // İletişim bilgilerini yükle
        const contactResponse = await fetch('/api/contact')
        if (contactResponse.ok) {
          const contactData = await contactResponse.json()
          setContactInfo(contactData)
        } else {
          setContactInfo(defaultContact)
        }
        
        // FAQ'ları yükle
        const faqsResponse = await fetch('/api/faqs')
        if (faqsResponse.ok) {
          const faqsData = await faqsResponse.json()
          setFaqs(faqsData)
        } else {
          setFaqs(defaultFaqs)
        }
      } catch (error) {
        console.error('Error loading contact data:', error)
        setContactInfo(defaultContact)
        setFaqs(defaultFaqs)
      } finally {
        setLoading(false)
      }
    }

    loadContactData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">İletişim bilgileri yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (!contactInfo) {
    return <div>Veri yüklenemiyor...</div>
  }
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="Derin Akademi Logo"
                width={60}
                height={60}
                className="mr-3"
              />
              <h1 className="text-2xl font-bold text-blue-800">Derin Akademi</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600">Ana Sayfa</Link>
              <Link href="/hizmetler" className="text-gray-700 hover:text-blue-600">Hizmetlerimiz</Link>
              <Link href="/egitimler" className="text-gray-700 hover:text-blue-600">Eğitimler</Link>
              <Link href="/egitim-icerikleri" className="text-gray-700 hover:text-blue-600">Eğitim İçerikleri</Link>
              <Link href="/referanslar" className="text-gray-700 hover:text-blue-600">Referanslar</Link>
              <Link href="/iletisim" className="text-blue-600 font-semibold">İletişim</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              İletişime Geçin
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              İhtiyaçlarınız için en uygun çözümü birlikte belirleyelim
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Bize Ulaşın
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      Ad*
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Adınız"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Soyad*
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Soyadınız"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta Adresi*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="ornek@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon Numarası
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+90 XXX XXX XX XX"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Şirket Adı
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Şirketinizin adı"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    İlgilendiğiniz Hizmet
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Lütfen seçiniz</option>
                    <option value="ik-danismanligi">İK Danışmanlığı</option>
                    <option value="liderlik-egitimleri">Liderlik Eğitimleri</option>
                    <option value="performans-yonetimi">Performans Yönetimi</option>
                    <option value="iletisim-becerileri">İletişim Becerileri</option>
                    <option value="ik-mevzuati">İK Mevzuatı</option>
                    <option value="ise-alim">İşe Alım ve Seçim</option>
                    <option value="organizasyonel-gelisim">Organizasyonel Gelişim</option>
                    <option value="diger">Diğer</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mesajınız*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="İhtiyaçlarınızı ve beklentilerinizi detaylı olarak açıklayın..."
                  />
                </div>

                <div className="flex items-center">
                  <input
                    id="privacy"
                    name="privacy"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="privacy" className="ml-2 block text-sm text-gray-700">
                    <a href="#" className="text-blue-600 hover:text-blue-800">Gizlilik Politikası</a>&apos;nı okudum ve kabul ediyorum.*
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition duration-300 transform hover:scale-105"
                >
                  Mesajı Gönder
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                İletişim Bilgileri
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Adres</h3>
                    <p className="text-gray-600">
                      {contactInfo.address}<br />
                      {contactInfo.addressDetail}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Telefon</h3>
                    <p className="text-gray-600">
                      {contactInfo.phone}<br />
                      <span className="text-sm text-gray-500">{contactInfo.phoneHours}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">E-posta</h3>
                    <p className="text-gray-600">
                      {contactInfo.email}<br />
                      <span className="text-sm text-gray-500">{contactInfo.emailResponse}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Çalışma Saatleri</h3>
                    <p className="text-gray-600">
                      {contactInfo.workingHours.weekdays}<br />
                      {contactInfo.workingHours.saturday}<br />
                      <span className="text-sm text-gray-500">{contactInfo.workingHours.sunday}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="mt-12 p-8 bg-blue-50 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Hızlı İletişim
                </h3>
                <p className="text-gray-600 mb-6">
                  Acil durumlar için WhatsApp üzerinden bize ulaşabilirsiniz.
                </p>
                <a
                  href={contactInfo.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Sıkça Sorulan Sorular
            </h2>
            <p className="text-lg text-gray-600">
              En çok merak edilenler
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <Image
                  src="/logo.png"
                  alt="Derin Akademi Logo"
                  width={40}
                  height={40}
                  className="mr-3"
                />
                <h3 className="text-xl font-bold">Derin Akademi</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Profesyonel İnsan Kaynakları eğitimi ve danışmanlığında uzman ekibimizle yanınızdayız.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Hizmetler</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/egitimler" className="hover:text-white">İK Eğitimleri</Link></li>
                <li><Link href="/hizmetler" className="hover:text-white">Danışmanlık</Link></li>
                <li><Link href="/hizmetler" className="hover:text-white">Performans Yönetimi</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">İletişim</h4>
              <ul className="space-y-2 text-gray-400">
                <li>{contactInfo.email}</li>
                <li>{contactInfo.phone}</li>
                <li>{contactInfo.address}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Derin Akademi. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}