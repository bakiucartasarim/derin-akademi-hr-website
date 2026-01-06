'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

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

export default function References() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const defaultTestimonials: Testimonial[] = [
      {
        id: '1',
        companyName: 'ABC Şirketi A.Ş.',
        companyInitials: 'AŞ',
        sector: 'Teknoloji Sektörü',
        testimonialText: 'Derin Akademi ile çalışmak şirketimizin İK süreçlerinde devrim yarattı. Özellikle performans yönetimi konusundaki uzmanılıları sayesinde çalışan verimliliğimiz %40 arttı.',
        authorName: 'Ahmet Yılmaz',
        authorTitle: 'İK Müdürü',
        rating: 5,
        bgColor: 'blue'
      },
      {
        id: '2',
        companyName: 'XYZ Holding',
        companyInitials: 'XY',
        sector: 'Finansal Hizmetler',
        testimonialText: 'Liderlik eğitimlerinde aldığımız hizmet mükemmeldi. Yönetici kadromuzun liderlik becerileri gözle görülür şekilde gelişti. Özellikle iletişim modülü çok faydalıydı.',
        authorName: 'Ayşe Demir',
        authorTitle: 'Genel Müdür',
        rating: 5,
        bgColor: 'green'
      }
    ]
    
    const loadTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials')
        if (response.ok) {
          const data = await response.json()
          setTestimonials(data)
        } else {
          // Fallback to default testimonials if API fails
          setTestimonials(defaultTestimonials)
        }
      } catch (error) {
        console.error('Error loading testimonials:', error)
        setTestimonials(defaultTestimonials)
      } finally {
        setLoading(false)
      }
    }

    loadTestimonials()
  }, [])

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      red: 'bg-red-100 text-red-600',
      indigo: 'bg-indigo-100 text-indigo-600',
      yellow: 'bg-yellow-100 text-yellow-600'
    }
    return colorMap[color] || 'bg-blue-100 text-blue-600'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Referanslar yükleniyor...</p>
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
              <Link href="/egitim-icerikleri" className="text-gray-700 hover:text-blue-600">Eğitim İçerikleri</Link>
              <Link href="/referanslar" className="text-blue-600 font-semibold">Referanslar</Link>
              <Link href="/iletisim" className="text-gray-700 hover:text-blue-600">İletişim</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Referanslarımız
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Birlikte çalıştığımız başarılı firmalar ve onların deneyimleri
            </p>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Müşteri Görüşleri
            </h2>
            <p className="text-lg text-gray-600">
              Hizmet verdiğimiz şirketlerin deneyimlerini keşfedin
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition duration-300">
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 ${getColorClasses(testimonial.bgColor)} rounded-full flex items-center justify-center mr-4`}>
                    <span className="font-bold text-lg">{testimonial.companyInitials}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{testimonial.companyName}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.sector}</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 mb-6">
                  &quot;{testimonial.testimonialText}&quot;
                </blockquote>
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                    {[...Array(5 - testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600 text-sm">- {testimonial.authorName}, {testimonial.authorTitle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Rakamlarla Derin Akademi
            </h2>
            <p className="text-lg text-gray-600">
              Başarılarımızı yansıtan istatistikler
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">150+</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Mutlu Müşteri</h3>
              <p className="text-gray-600">Hizmet verdiğimiz şirket sayısı</p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">5000+</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Eğitim Katılımcısı</h3>
              <p className="text-gray-600">Eğitimlerimize katılan profesyonel sayısı</p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">%95</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Memnuniyet Oranı</h3>
              <p className="text-gray-600">Müşteri memnuniyet oranımız</p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">8+</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Yıllık Deneyim</h3>
              <p className="text-gray-600">İnsan kaynakları alanındaki deneyimimiz</p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              İş Ortaklarımız
            </h2>
            <p className="text-lg text-gray-600">
              Birlikte çalıştığımız değerli şirketler
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
            {/* Logo placeholders */}
            <div className="bg-gray-200 h-16 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 font-semibold">LOGO</span>
            </div>
            <div className="bg-gray-200 h-16 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 font-semibold">LOGO</span>
            </div>
            <div className="bg-gray-200 h-16 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 font-semibold">LOGO</span>
            </div>
            <div className="bg-gray-200 h-16 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 font-semibold">LOGO</span>
            </div>
            <div className="bg-gray-200 h-16 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 font-semibold">LOGO</span>
            </div>
            <div className="bg-gray-200 h-16 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 font-semibold">LOGO</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Siz de Bu Başarı Hikayelerinin Parçası Olun
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Ücretsiz danışmanlık görüşmesi için hemen iletişime geçin
          </p>
          <Link 
            href="/iletisim"
            className="inline-block bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
          >
            İletişime Geçin
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