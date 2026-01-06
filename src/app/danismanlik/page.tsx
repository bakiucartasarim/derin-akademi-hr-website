'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Danismanlik() {
  const [currentSection, setCurrentSection] = useState(0)
  const sections = ['hero', 'section1', 'section2', 'section3']

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2

      sections.forEach((sectionId, index) => {
        const section = document.getElementById(sectionId)
        if (section) {
          const sectionTop = section.offsetTop
          const sectionBottom = sectionTop + section.offsetHeight

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setCurrentSection(index)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleArrowClick = () => {
    if (currentSection >= sections.length - 1) {
      // At the last section, go back to top
      document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      // Go to next section
      const nextSection = sections[currentSection + 1]
      document.getElementById(nextSection)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 right-0 p-8 z-30">
        <ul className="flex space-x-8 text-white text-base font-medium">
          <li>
            <Link href="/" className="hover:text-gray-200 transition-colors">
              Yaklaşımımız
            </Link>
          </li>
          <li>
            <Link href="/programlarimiz" className="hover:text-gray-200 transition-colors">
              Programlarımız
            </Link>
          </li>
          <li>
            <Link href="/danismanlik" className="text-gray-200 font-semibold">
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

      {/* Floating Scroll Indicator */}
      <div className="fixed bottom-8 right-8 z-50 animate-bounce">
        <button
          onClick={handleArrowClick}
          className="bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full p-3 transition-all duration-300 shadow-lg"
          aria-label={currentSection >= sections.length - 1 ? "Yukarı çık" : "Aşağı in"}
        >
          <svg
            className={`w-6 h-6 text-white transition-transform duration-300 ${currentSection >= sections.length - 1 ? 'rotate-180' : ''}`}
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

      {/* Hero Section */}
      <section id="hero" className="min-h-screen bg-[#1a2f4d] flex items-center py-20 px-4">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                İnsan Kaynakları Danışmanlığı
              </h1>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#5B9BD5] mb-8 leading-tight">
                Kararları Sisteme Dönüştürürüz
              </h2>
              <p className="text-lg md:text-xl font-light leading-relaxed">
                İnsanla ilgili kritik kararları kişisel kanaattan çıkarır, kurum içinde net, tutarlı ve sürdürülebilir bir çerçeveye oturtturuz.
              </p>
            </div>

            {/* Right side - Image */}
            <div className="rounded-lg overflow-hidden">
              <img
                src="/image20.png"
                alt="İnsan Kaynakları Danışmanlığı"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Bu Danışmanlık Ne Değildir */}
      <section id="section1" className="min-h-screen bg-[#1d3350] flex items-center py-20 px-4">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Image */}
            <div className="rounded-lg overflow-hidden w-3/4 mx-auto">
              <img
                src="/image21.png"
                alt="Danışmanlık Yaklaşımı"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Right side - Content */}
            <div className="text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Bu Danışmanlık Ne Değildir?
              </h2>
              <p className="text-xl mb-8 font-light leading-relaxed">
                Derin Akademi'nin danışmanlık yaklaşımı, alışılmış İK danışmanlığı kalıplarından bilinçli olarak ayrılır.
              </p>

              <div className="space-y-6">
                <h3 className="text-2xl font-semibold mb-4">Biz danışmanlığı:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="mr-3 mt-1">•</span>
                    <span className="font-light text-lg">hazır paketler sunmak,</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1">•</span>
                    <span className="font-light text-lg">her şirkete aynı sistemleri uyarlamak,</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1">•</span>
                    <span className="font-light text-lg">doküman teslim edip süreci kapatmak</span>
                  </li>
                </ul>
                <p className="text-lg font-light mt-6">
                  olarak görmüyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Ne Yapmıyoruz vs Ne Yapıyoruz */}
      <section id="section2" className="min-h-screen bg-[#172840] flex items-center py-20 px-4">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Ne Yapmıyoruz */}
            <div className="text-white">
              <div className="flex items-center mb-8">
                <svg className="w-8 h-8 mr-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <h2 className="text-3xl md:text-4xl font-bold">Ne yapmıyoruz?</h2>
              </div>

              <p className="text-lg font-light mb-6 leading-relaxed">
                Hazır İK sistemleri veya kopyala-yapıştır çözümler sunmayız.
              </p>

              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="mr-3 mt-1">•</span>
                  <span className="font-light">Sadece prosedür, form veya şablon üretip bırakmayız.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1">•</span>
                  <span className="font-light">Eğitimi tek başına "çözüm" olarak konumlandırmayız.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1">•</span>
                  <span className="font-light">Yönetici davranışını dışarıda bırakan teorik modellerle ilerlemeyiz.</span>
                </li>
              </ul>

              <p className="text-lg font-light mt-8 leading-relaxed">
                Bu yaklaşım; kısa vadede düzenli görünse de, karar problemlerini kalıcı olarak çözmez.
              </p>
            </div>

            {/* Right Column - Ne Yapıyoruz */}
            <div className="text-white">
              <div className="flex items-center mb-8">
                <svg className="w-8 h-8 mr-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <h2 className="text-3xl md:text-4xl font-bold">Ne yapıyoruz?</h2>
              </div>

              <ul className="space-y-6">
                <li className="flex items-start">
                  <span className="mr-3 mt-1">•</span>
                  <span className="font-light">
                    İnsanla ilgili <strong className="font-semibold">kritik karar noktalarını</strong> netleştiririz.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1">•</span>
                  <span className="font-light">
                    Terfi, performans, ücret, yetki devri ve işe alım kararlarının <strong className="font-semibold">hangi ilkelere göre alındığını</strong> görünür hale getiririz.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1">•</span>
                  <span className="font-light">
                    Yöneticilerin benzer durumlarda benzer kararlar almasını sağlayacak <strong className="font-semibold">karar çerçeveleri</strong> tasarlarız.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1">•</span>
                  <span className="font-light">
                    Sistemi sadece kağıt üzerinde değil, yöneticinin günlük karar pratiğine yerleştiririz.
                  </span>
                </li>
              </ul>

              <p className="text-lg font-light mt-8 leading-relaxed">
                Bu nedenle danışmanlık sürecimiz; sadece İK'yı değil, <strong className="font-semibold">karar veren tüm yönetim kademelerini</strong> kapsar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Nasıl Çalışıyoruz */}
      <section id="section3" className="min-h-screen bg-[#1e3656] flex items-center py-20 px-4">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Nasıl Çalışıyoruz?
          </h2>
          <p className="text-xl text-white/90 font-light leading-relaxed mb-16 max-w-5xl">
            Danışmanlık süreçlerimiz hazır çözümlerle başlamaz. Önce kurumun karar aldığı noktaları anlarız.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Step 01 */}
            <div className="border-t-4 border-[#5B9BD5] pt-6">
              <div className="text-[#5B9BD5] text-lg font-semibold mb-3">01</div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Tanı ve Netleştirme
              </h3>
              <p className="text-white/90 font-light leading-relaxed">
                Kurumun terfi, performans, ücret ve işe alım gibi karar alanlarında nerelerde zorlandığını analiz ederiz. Problemin gerçek kaynağını netleştiririz.
              </p>
            </div>

            {/* Step 02 */}
            <div className="border-t-4 border-[#5B9BD5] pt-6">
              <div className="text-[#5B9BD5] text-lg font-semibold mb-3">02</div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Karar Çerçevesi Tasarımı
              </h3>
              <p className="text-white/90 font-light leading-relaxed">
                Kurumun yapısına uygun bir karar çerçevesi tasarlarız. Yöneticilerin benzer durumlarda benzer kararlar almasını sağlayacak ilke ve kriterleri belirleriz.
              </p>
            </div>

            {/* Step 03 */}
            <div className="border-t-4 border-[#5B9BD5] pt-6">
              <div className="text-[#5B9BD5] text-lg font-semibold mb-3">03</div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Uygulama ve Yayılım
              </h3>
              <p className="text-white/90 font-light leading-relaxed">
                Tasarlanan çerçeveyi yöneticilerle birlikte gerçek vakalar üzerinden çalışırız. Sistemin günlük yönetim pratiğine yerleşmesini sağlarız.
              </p>
            </div>

            {/* Step 04 */}
            <div className="border-t-4 border-[#5B9BD5] pt-6">
              <div className="text-[#5B9BD5] text-lg font-semibold mb-3">04</div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Kalıcılık ve Takip
              </h3>
              <p className="text-white/90 font-light leading-relaxed">
                Uygulamanın sürdürülebilir hale gelmesini sağlarız. Yöneticilerin sistemi nasıl kullandığını takip eder, ince ayarlamalar yaparız.
              </p>
            </div>
          </div>

          {/* Quote */}
          <div className="mt-16 border-l-4 border-[#5B9BD5] pl-6">
            <p className="text-xl text-white font-light italic leading-relaxed">
              "Bizim için danışmanlık, doğru dokümanı üretmek değil, doğru kararların tekrar edilebilir hale gelmesini sağlamaktır."
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
