'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface LinkedInContent {
  id: string
  title: string
  description: string
  url: string
  embedUrl: string
  thumbnail?: string
}

export default function EgitimIcerikleri() {
  const [contents, setContents] = useState<LinkedInContent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // İçerikleri yükle
    const loadContents = async () => {
      try {
        const response = await fetch('/api/linkedin-contents')
        if (response.ok) {
          const data = await response.json()
          setContents(data)
        } else {
          console.error('Failed to load contents')
        }
      } catch (error) {
        console.error('Error loading contents:', error)
      } finally {
        setLoading(false)
      }
    }

    loadContents()

    // LinkedIn embed script'ini yükle
    const script = document.createElement('script')
    script.src = 'https://platform.linkedin.com/in.js'
    script.type = 'text/javascript'
    script.async = true
    script.defer = true
    document.body.appendChild(script)

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src="https://platform.linkedin.com/in.js"]')
      if (existingScript) {
        document.body.removeChild(existingScript)
      }
    }
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">İçerikler yükleniyor...</p>
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
              <Link href="/egitimler" className="text-gray-700 hover:text-blue-600">Eğitimler</Link>
              <Link href="/egitim-icerikleri" className="text-blue-600 font-semibold">Eğitim İçerikleri</Link>
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
              Eğitim İçerikleri
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              LinkedIn'de paylaştığımız eğitim videoları ve içeriklerimiz
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Video İçeriklerimiz
            </h2>
            <p className="text-lg text-gray-600">
              İnsan kaynakları ve eğitim alanında hazırladığımız video içerikleri
            </p>
          </div>

          {contents.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg">
              <p className="text-gray-500 text-lg mb-4">Henüz eğitim içeriği eklenmemiş</p>
              <p className="text-gray-400">Yakında yeni içerikler eklenecek...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
              {contents.map((content) => (
              <div key={content.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{content.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{content.description}</p>

                  {/* LinkedIn Embed */}
                  <div className="linkedin-embed-container mb-4">
                    <iframe
                      src={content.embedUrl}
                      height="500"
                      width="100%"
                      frameBorder="0"
                      allowFullScreen
                      title={content.title}
                      className="rounded-lg w-full"
                    />
                  </div>

                  {/* LinkedIn'de Görüntüle Butonu */}
                  <a
                    href={content.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 text-sm"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn'de Görüntüle
                  </a>
                </div>
              </div>
              ))}
            </div>
          )}

          {/* Info Box */}
          <div className="mt-16 bg-blue-50 rounded-xl p-8 border-2 border-blue-200">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Daha Fazla İçerik İçin
              </h3>
              <p className="text-gray-600 mb-6">
                LinkedIn sayfamızı takip ederek yeni eğitim içeriklerimizden haberdar olabilirsiniz
              </p>
              <a
                href="https://www.linkedin.com/in/hakan-selahi-001969/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn Sayfamızı Ziyaret Edin
              </a>
            </div>
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
