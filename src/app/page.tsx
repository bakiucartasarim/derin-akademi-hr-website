'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Home() {
  const [isAtBottom, setIsAtBottom] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const clientHeight = window.innerHeight

      // Check if we're near the bottom (within 100px)
      setIsAtBottom(scrollHeight - scrollTop - clientHeight < 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleArrowClick = () => {
    if (isAtBottom) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.scrollTo({ top: window.scrollY + window.innerHeight, behavior: 'smooth' })
    }
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1920')",
          }}
        >
          {/* Dark Blue Overlay */}
          <div className="absolute inset-0 bg-[#1e3a5f] opacity-90"></div>
        </div>

        {/* Navigation */}
        <nav className="absolute top-0 right-0 p-8 z-20">
          <ul className="flex space-x-8 text-white text-base font-medium">
            <li>
              <Link href="/yaklasimimiz" className="hover:text-gray-200 transition-colors">
                Yaklaşımımız
              </Link>
            </li>
            <li>
              <Link href="/programlarimiz" className="hover:text-gray-200 transition-colors">
                Programlarımız
              </Link>
            </li>
            <li>
              <Link href="/danismanlik" className="hover:text-gray-200 transition-colors">
                Danışmanlık
              </Link>
            </li>
            <li>
              <Link href="/referanslar" className="hover:text-gray-200 transition-colors">
                Referanslar
              </Link>
            </li>
            <li>
              <Link href="/iletisim" className="hover:text-gray-200 transition-colors">
                İletişim
              </Link>
            </li>
          </ul>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Yanlış İnsan Kararları Kuruma Ne Kadara Mal Oluyor?
          </h1>

          <p className="text-xl md:text-2xl text-white mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Yanlış terfi, belirsiz performans değerlendirmesi ve tutarsız işe alım kararları; kurumun en büyük görünmeyen maliyetidir. Çoğu şirket bu maliyeti fark ettiğinde çok geç kalır.
          </p>

          <Link href="/on-gorusme">
            <button className="bg-[#4169E1] hover:bg-[#3558c7] text-white px-10 py-4 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Kısa Ön Görüşme Talep Et
            </button>
          </Link>

          <p className="text-white text-sm mt-6 opacity-80">
            Bu görüşmeler satış değil, teşhis amaçlıdır.
          </p>
        </div>

      </section>

      {/* Floating Scroll Indicator */}
      <div className="fixed bottom-8 right-8 z-50 animate-bounce">
        <button
          onClick={handleArrowClick}
          className="bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full p-3 transition-all duration-300 shadow-lg"
          aria-label={isAtBottom ? "Yukarı çık" : "Aşağı in"}
        >
          <svg
            className={`w-6 h-6 text-white transition-transform duration-300 ${isAtBottom ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      </div>

      {/* Section 1: Bu Bir Eğitim Sitesi Değil */}
      <section className="bg-[#1d3350] min-h-screen flex items-center py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Bu Bir Eğitim Sitesi Değil
          </h2>
          <p className="text-2xl md:text-3xl text-white mb-16 font-light">
            Derin Akademi Ne Yapmaz?
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-[#2a4a6f] rounded-lg p-8 hover:bg-[#365a85] transition-colors">
              <h3 className="text-2xl font-bold text-white mb-4">
                Hazır paket sunmayız
              </h3>
              <p className="text-white/90 font-light leading-relaxed">
                Katalog eğitimi, kopyala-yapıştır sistemler ve her şirkete aynı çözüm yaklaşımını reddederiz.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#2a4a6f] rounded-lg p-8 hover:bg-[#365a85] transition-colors">
              <h3 className="text-2xl font-bold text-white mb-4">
                Sunum anlatıp bırakmayız
              </h3>
              <p className="text-white/90 font-light leading-relaxed">
                Doküman teslim edip süreci kapatmayız. Kararların nerede kilitlendiğini anlamadan çözüm önermeyiz.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#2a4a6f] rounded-lg p-8 hover:bg-[#365a85] transition-colors">
              <h3 className="text-2xl font-bold text-white mb-4">
                Eğitimle başlamayız
              </h3>
              <p className="text-white/90 font-light leading-relaxed">
                Çalışmalarımız genellikle bir eğitimle değil, kısa bir tanı görüşmesiyle başlar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: En Sık Karşılaştığımız Karar Problemleri */}
      <section className="bg-[#172840] min-h-screen flex items-center py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">
            En Sık Karşılaştığımız Karar Problemleri
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Card 1 */}
            <div className="border-2 border-white/30 rounded-lg p-8 hover:border-white/50 transition-colors">
              <p className="text-xl text-white font-light">
                Yetki devri nerede biter, mikro yönetim nerede başlar?
              </p>
            </div>

            {/* Card 2 */}
            <div className="border-2 border-white/30 rounded-lg p-8 hover:border-white/50 transition-colors">
              <p className="text-xl text-white font-light">
                İyi çalışan bir kişi, iyi yönetici olur mu?
              </p>
            </div>

            {/* Card 3 */}
            <div className="border-2 border-white/30 rounded-lg p-8 hover:border-white/50 transition-colors">
              <p className="text-xl text-white font-light">
                Performans değerlendirmesi neden her yıl gerilime biter?
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Card 4 */}
            <div className="border-2 border-white/30 rounded-lg p-8 hover:border-white/50 transition-colors">
              <p className="text-xl text-white font-light">
                Mülakat sonunda 'iyi hissettim' yeterli bir karar kriteri mi?
              </p>
            </div>

            {/* Card 5 */}
            <div className="border-2 border-white/30 rounded-lg p-8 hover:border-white/50 transition-colors">
              <p className="text-xl text-white font-light">
                Ücret kararları neden hep pazarlığa dönüşür?
              </p>
            </div>
          </div>

          <p className="text-lg text-white/90 font-light leading-relaxed max-w-5xl">
            Bu sorular genellikle bir eğitimle değil, kararların nerede kilitlendiğini anlamaya yönelik kısa bir tanı görüşmesiyle netleşir.
          </p>
        </div>
      </section>

      {/* Section 3: Kimlerle Çalışıyoruz */}
      <section className="bg-[#1e3656] min-h-screen flex items-center py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
            Kimlerle Çalışıyoruz?
          </h2>

          <div className="space-y-8 text-white/90 font-light leading-relaxed text-lg">
            <p>
              Hızlı büyüyen orta ölçekli yapılar, profesyonelleşme eşiğindeki organizasyonlar ve patron şirketlerinden kurumsal yapıya geçiş sürecindeki firmalarla çalışıyoruz.
            </p>

            <p>
              Terfi, performans, ücret ve işe alım kararlarında tutarsızlık yaşayan ve bu kararları kişisel kanaattan sistematik zemine taşımak isteyen kurumlar bizim çalışma alanımız.
            </p>

            <p>
              Nasıl çalıştığımızı anlatmadan önce, problemi anlamayı tercih ederiz.
            </p>

            <Link href="/danismanlik" className="inline-flex items-center text-[#4169E1] hover:text-[#3558c7] transition-colors text-lg">
              → Danışmanlık yaklaşımımızı inceleyin
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
