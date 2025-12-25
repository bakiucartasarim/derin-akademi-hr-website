'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface Training {
  id: string
  title: string
  description: string
  features: string[]
  duration: string
  iconColor: string
}

export default function Training() {
  const [trainings, setTrainings] = useState<Training[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const defaultTrainings: Training[] = [
          {
            id: '1',
            title: 'Liderlik Eğitimleri',
            description: 'Etkili liderlik becerileri kazanmak ve takım yönetiminde başarılı olmak için kapsamlı programlar.',
            features: ['Stratejik Liderlik', 'Takım Yönetimi', 'Motivasyon Teknikleri'],
            duration: '16 Saat • Sertifikalı',
            iconColor: 'blue'
          },
          {
            id: '2',
            title: 'İletişim Becerileri',
            description: 'Etkili iletişim kurma, çatışma çözme ve müzakere becerilerinizi geliştirin.',
            features: ['Etkili İletişim Teknikleri', 'Çatışma Yönetimi', 'Müzakere Becerileri'],
            duration: '12 Saat • Sertifikalı',
            iconColor: 'green'
          },
          {
            id: '3',
            title: 'Performans Yönetimi',
            description: 'Çalışan performansını değerlendirme, geliştirme ve optimize etme yöntemlerini öğrenin.',
            features: ['Performans Değerlendirme', 'Hedef Belirleme', 'Gelişim Planları'],
            duration: '20 Saat • Sertifikalı',
            iconColor: 'purple'
          },
          {
            id: '4',
            title: 'İK Mevzuatı',
            description: 'İş hukuku, sosyal güvenlik mevzuatı ve İK uygulamalarında yasal gereklilikler.',
            features: ['İş Kanunu', 'Sosyal Güvenlik', 'İK Uygulamaları'],
            duration: '24 Saat • Sertifikalı',
            iconColor: 'red'
          },
          {
            id: '5',
            title: 'İşe Alım ve Seçim',
            description: 'Doğru adayı bulma, değerlendirme ve seçim süreçlerini etkin şekilde yönetme.',
            features: ['Aday Bulma Yöntemleri', 'Mülakat Teknikleri', 'Değerlendirme Yöntemleri'],
            duration: '18 Saat • Sertifikalı',
            iconColor: 'yellow'
          },
          {
            id: '6',
            title: 'Çalışan Gelişimi',
            description: 'Çalışan potansiyelini keşfetme, geliştirme ve kariyer planlama stratejileri.',
            features: ['Yetenek Yönetimi', 'Kariyer Planlama', 'Mentoring ve Koçluk'],
            duration: '14 Saat • Sertifikalı',
            iconColor: 'indigo'
          }
    ]
    
    const loadTrainings = async () => {
      try {
        const response = await fetch('/api/trainings')
        if (response.ok) {
          const data = await response.json()
          setTrainings(data)
        } else {
          // Fallback to default trainings if API fails
          setTrainings(defaultTrainings)
        }
      } catch (error) {
        console.error('Error loading trainings:', error)
        setTrainings(defaultTrainings)
      } finally {
        setLoading(false)
      }
    }

    loadTrainings()
  }, [])

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      red: 'bg-red-100 text-red-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      indigo: 'bg-indigo-100 text-indigo-600'
    }
    return colorMap[color] || 'bg-blue-100 text-blue-600'
  }

  const getTextColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      purple: 'text-purple-600',
      red: 'text-red-600',
      yellow: 'text-yellow-600',
      indigo: 'text-indigo-600'
    }
    return colorMap[color] || 'text-blue-600'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Eğitimler yükleniyor...</p>
        </div>
      </div>
    )
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
              <Link href="/egitimler" className="text-blue-600 font-semibold">Eğitimler</Link>
              <Link href="/egitim-icerikleri" className="text-gray-700 hover:text-blue-600">Eğitim İçerikleri</Link>
              <Link href="/referanslar" className="text-gray-700 hover:text-blue-600">Referanslar</Link>
              <Link href="/iletisim" className="text-gray-700 hover:text-blue-600">İletişim</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Eğitim Programları
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Profesyonel gelişiminizi destekleyen kapsamlı İK eğitim programları
            </p>
          </div>
        </div>
      </section>

      {/* Training Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Eğitim Alanlarımız
            </h2>
            <p className="text-lg text-gray-600">
              İnsan kaynakları alanında uzmanlaşmak için gereken tüm becerileri kazanın
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {trainings.map((training) => (
              <div key={training.id} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition duration-300">
                <div className={`w-16 h-16 ${getColorClasses(training.iconColor)} rounded-xl flex items-center justify-center mb-6`}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{training.title}</h3>
                <p className="text-gray-600 mb-6">
                  {training.description}
                </p>
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
                <div className={`${getTextColorClasses(training.iconColor)} font-semibold`}>{training.duration}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Eğitim Avantajlarımız
            </h2>
            <p className="text-lg text-gray-600">
              Neden Derin Akademi eğitimlerini tercih etmelisiniz?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Uzman Eğitmenler</h3>
              <p className="text-gray-600">Alanında deneyimli uzman eğitmenlerle öğrenin</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sertifika</h3>
              <p className="text-gray-600">Tüm eğitimlerimiz sona erdiğinde sertifika alın</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Uygulamalı Öğrenme</h3>
              <p className="text-gray-600">Gerçek vakalar ve uygulamalarla pekiştirin</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sürekli Destek</h3>
              <p className="text-gray-600">Eğitim sonrası sürekli destek ve takip</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Eğitim Programlarımız Hakkında Detaylar
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Size özel eğitim planı için uzmanlarımızla görüşün
          </p>
          <Link 
            href="/iletisim"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 mr-4"
          >
            İletişime Geçin
          </Link>
          <Link 
            href="/referanslar"
            className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300"
          >
            Referanslarımızı İnceleyin
          </Link>
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
                <li>info@derinakademi.com</li>
                <li>+90 XXX XXX XX XX</li>
                <li>İstanbul, Türkiye</li>
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