import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
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
              <Link href="/iletisim" className="text-gray-700 hover:text-blue-600">İletişim</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              İnsan Kaynakları
              <span className="text-blue-600 block">Çözümleri</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Profesyonel eğitim ve danışmanlık hizmetleri ile şirketinizin insan kaynakları potansiyelini maksimuma çıkarın.
            </p>
            <div className="space-x-4">
              <Link href="/hizmetler">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-300">
                  Hizmetlerimizi Keşfedin
                </button>
              </Link>
              <Link href="/iletisim">
                <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition duration-300">
                  İletişime Geçin
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Hizmetlerimiz
            </h2>
            <p className="text-lg text-gray-600">
              Uzman kadromuz ile sunduğumuz kapsamlı İK çözümleri
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">İnsan Kaynakları Eğitimleri</h3>
              <p className="text-gray-600 mb-6">
                Personel geliştirme, liderlik ve yönetim becerilerini güçlendiren profesyonel eğitim programları.
              </p>
              <Link href="/egitimler" className="text-blue-600 font-semibold hover:text-blue-700">
                Detayları İncele →
              </Link>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">İK Danışmanlık</h3>
              <p className="text-gray-600 mb-6">
                İnsan kaynakları süreçlerinizi optimize etmek için uzman danışmanlık hizmeti.
              </p>
              <Link href="/hizmetler" className="text-blue-600 font-semibold hover:text-blue-700">
                Detayları İncele →
              </Link>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Performans Yönetimi</h3>
              <p className="text-gray-600 mb-6">
                Çalışan performansını artırmak için sistematik yaklaşımlar ve çözümler.
              </p>
              <Link href="/hizmetler" className="text-blue-600 font-semibold hover:text-blue-700">
                Detayları İncele →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Neden Derin Akademi?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Uzman kadromuz ve kanıtlanmış metodolojilerimizle şirketinizin insan kaynakları kapasitesini geliştiriyoruz. 
                Sektörde yılların deneyimi ile modern İK yaklaşımlarını işletmenizle buluşturuyoruz.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Uzman eğitmen kadrosu</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Uygulamalı eğitim programları</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Kişiselleştirilmiş çözümler</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Sürekli destek ve takip</span>
                </div>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="bg-blue-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Ücretsiz Danışmanlık</h3>
                <p className="mb-6">
                  İhtiyaçlarınızı değerlendirmek için ücretsiz ön görüşme hizmetimizden yararlanın.
                </p>
                <Link href="/iletisim">
                  <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
                    Randevu Alın
                  </button>
                </Link>
              </div>
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
