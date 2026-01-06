'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Programlarimiz() {
  const [currentSection, setCurrentSection] = useState(0)
  const sections = ['intro', 'program1', 'program2', 'program3', 'program4', 'program5']

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
      document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      // Go to next section
      const nextSection = sections[currentSection + 1]
      document.getElementById(nextSection)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main className="min-h-screen bg-[#1a2f4d]">
      {/* Navigation */}
      <nav className="fixed top-0 right-0 p-8 z-30">
        <ul className="flex space-x-8 text-white text-base font-medium">
          <li>
            <Link href="/" className="hover:text-gray-200 transition-colors">
              Yaklaşımımız
            </Link>
          </li>
          <li>
            <Link href="/programlarimiz" className="text-gray-200 font-semibold">
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

      {/* Intro Section */}
      <section id="intro" className="min-h-screen flex items-center py-20 px-4">
        <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Programlarımız
          </h1>
          <p className="text-xl text-white font-light leading-relaxed max-w-5xl mb-16">
            Derin Akademi programları, insanla ilgili kritik kararları kişisel kanaattan çıkarıp sistematik zemine oturmayı hedefler. Her program, kurumun gerçek ihtiyaçlarına göre eğitim, atölye veya danışmanlık formatında tasarlanır.
          </p>

          {/* Program Cards Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border-2 border-white/30 rounded-lg p-8 hover:border-white/50 transition-colors">
              <h3 className="text-2xl font-bold text-white mb-4">
                İnsan Kararları Çerçevesi
              </h3>
              <p className="text-white/90 font-light">
                Hangi kararların kim tarafından alınacağını netleştirir.
              </p>
            </div>

            <div className="border-2 border-white/30 rounded-lg p-8 hover:border-white/50 transition-colors">
              <h3 className="text-2xl font-bold text-white mb-4">
                Terfi ve Yöneticiliğe Geçiş Kararları
              </h3>
              <p className="text-white/90 font-light">
                Bireysel başarı ile yöneticilik arasındaki farkı görünür kılar.
              </p>
            </div>

            <div className="border-2 border-white/30 rounded-lg p-8 hover:border-white/50 transition-colors">
              <h3 className="text-2xl font-bold text-white mb-4">
                Performans Değerlendirme Zemini
              </h3>
              <p className="text-white/90 font-light">
                Değerlendirmeyi kişisel algıdan çıkarıp ortak kriterlere dayandırır.
              </p>
            </div>

            <div className="border-2 border-white/30 rounded-lg p-8 hover:border-white/50 transition-colors">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ücret ve Adalet Algısı
              </h3>
              <p className="text-white/90 font-light">
                Ücret kararlarını pazarlıktan çıkarıp sistem meselesine dönüştürür.
              </p>
            </div>

            <div className="border-2 border-white/30 rounded-lg p-8 hover:border-white/50 transition-colors">
              <h3 className="text-2xl font-bold text-white mb-4">
                İşe Alım ve Mülakat Kararları
              </h3>
              <p className="text-white/90 font-light">
                Mülakatı sohbetten çıkarıp risk değerlendirme sürecine çevirir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Program 1: İnsan Kararları Çerçevesi */}
      <section id="program1" className="min-h-screen bg-[#1d3350] flex items-center py-20 px-4">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            1. İnsan Kararları Çerçevesi
          </h2>
          <p className="text-xl text-white/90 font-light leading-relaxed mb-12 max-w-5xl">
            Hangi kararların kim tarafından alınacağını netleştirir. Terfi, performans, ücret ve işe alım gibi kritik alanlarda ortak bir zemin oluşturur.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Kimler için?</h3>
              <ul className="space-y-3 text-white/90 font-light">
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Karar veren yöneticiler</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Üst ve orta kademe</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>İK ekipleri (süreç desteği)</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Bu program sonunda ne netleşir?</h3>
              <ul className="space-y-3 text-white/90 font-light">
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Hangi kararların kim tarafından alındığı</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Karar sınırları ve yetki alanları</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Hangi kararların yönetici yetkisinde olmadığı</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Ortak karar dili</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Bu program neyi çözmeye odaklanır?</h3>
              <ul className="space-y-3 text-white/90 font-light">
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Belirsiz ve tutarsız kararlar</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Gerilimli konuşmalar</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Program 2: Terfi ve Yöneticiliğe Geçiş Kararları */}
      <section id="program2" className="min-h-screen bg-[#172840] flex items-center py-20 px-4">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            2. Terfi ve Yöneticiliğe Geçiş Kararları
          </h2>
          <p className="text-xl text-white/90 font-light leading-relaxed mb-12 max-w-5xl">
            Bireysel başarı ile yöneticilik sorumluluğu arasındaki farkı görünür kılar. İyi çalışan bir kişinin yönetici olup olmayacağına dair net kriterler oluşturur.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Kimler için?</h3>
              <ul className="space-y-3 text-white/90 font-light">
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Terfi kararı veren yöneticiler</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Üst ve orta kademe</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>İK ekipleri (süreç desteği)</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Bu program sonunda ne netleşir?</h3>
              <ul className="space-y-3 text-white/90 font-light">
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Bireysel başarı ile yöneticilik arasındaki fark</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Yöneticiliğe geçiş kriterleri</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Hangi durumlarda terfi verilmeyeceği</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Terfi değerlendirme çerçevesi</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Bu program neyi çözmeye odaklanır?</h3>
              <ul className="space-y-3 text-white/90 font-light">
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>"İyi çalışıyor, ama yönetici olur mu?" belirsizliği</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Yanlış terfilerin yarattığı zincirleme sorunlar</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Kişisel kanaate dayalı terfi kararları</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Program 3: Performans Değerlendirme Zemini */}
      <section id="program3" className="min-h-screen bg-[#1e3656] flex items-center py-20 px-4">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            3. Performans Değerlendirme Zemini
          </h2>
          <p className="text-xl text-white/90 font-light leading-relaxed mb-12 max-w-5xl">
            Değerlendirmeyi kişisel algıdan çıkarıp ortak kriterlere dayandırır. Yöneticiler arasında tutarlı bir performans değerlendirme dili oluşturur.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Kimler için?</h3>
              <ul className="space-y-3 text-white/90 font-light">
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Performans değerlendiren yöneticiler</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Üst ve orta kademe</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>İK ekipleri (süreç desteği)</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Bu program sonunda ne netleşir?</h3>
              <ul className="space-y-3 text-white/90 font-light">
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Ortak değerlendirme kriterleri</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Performans konuşması yapısı</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Hangi durumlarda değerlendirme yapılmayacağı</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Tutarlı değerlendirme dili</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Bu program neyi çözmeye odaklanır?</h3>
              <ul className="space-y-3 text-white/90 font-light">
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Gerilimle biten performans konuşmaları</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>"Neye göre değerlendirildim?" sorusu</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Tutarsız ve kişiye göre değişen notlar</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Program 4: Ücret ve Adalet Algısı */}
      <section id="program4" className="min-h-screen bg-[#1d3350] flex items-center py-20 px-4">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            4. Ücret ve Adalet Algısı
          </h2>
          <p className="text-xl text-white/90 font-light leading-relaxed mb-12 max-w-5xl">
            Ücret kararlarını pazarlıktan çıkarıp sistem meselesine dönüştürür. İç dengeyi ve adalet algısını güçlendiren ücret yapıları tasarlar.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-[#2a4a6f] rounded-lg p-8">
              <div className="text-4xl font-bold text-[#5B9BD5] mb-4">1</div>
              <h3 className="text-2xl font-bold text-white mb-6">Kimler için?</h3>
              <ul className="space-y-3 text-white/90 font-light">
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Ücret kararı veren yöneticiler</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Üst ve orta kademe</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>İK ekipleri (süreç desteği)</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#2a4a6f] rounded-lg p-8">
              <div className="text-4xl font-bold text-[#5B9BD5] mb-4">2</div>
              <h3 className="text-2xl font-bold text-white mb-6">Bu program sonunda ne netleşir?</h3>
              <ul className="space-y-3 text-white/90 font-light">
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Ücret kararlarının ilkeleri</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>İç denge ve adalet kriterleri</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Hangi taleplerin kabul edilemeyeceği</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Savunulabilir ücret yapısı</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#2a4a6f] rounded-lg p-8">
              <div className="text-4xl font-bold text-[#5B9BD5] mb-4">3</div>
              <h3 className="text-2xl font-bold text-white mb-6">Bu program neyi çözmeye odaklanır?</h3>
              <ul className="space-y-3 text-white/90 font-light">
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Ücret tartışmalarının kişiselleşmesi</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Adalet algısının zedelenmesi</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>"Eşit mi, adil mi?" karmaşası</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Program 5: İşe Alım ve Mülakat Kararları */}
      <section id="program5" className="min-h-screen bg-[#172840] flex items-center py-20 px-4">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            5. İşe Alım ve Mülakat Kararları
          </h2>
          <p className="text-xl text-white/90 font-light leading-relaxed mb-12 max-w-5xl">
            Mülakatı sohbetten çıkarıp risk değerlendirme sürecine çevirir. İşe alım kararlarını sezgiden çıkarıp davranış ve karar sinyallerine dayandırır.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-[#2a4a6f] rounded-lg p-8">
              <div className="text-4xl font-bold text-[#5B9BD5] mb-4">1</div>
              <h3 className="text-2xl font-bold text-white mb-6">Kimler için?</h3>
              <ul className="space-y-3 text-white/90 font-light">
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Mülakat yapan yöneticiler</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>İşe alım kararı veren roller</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>İK ekipleri (süreç desteği)</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#2a4a6f] rounded-lg p-8">
              <div className="text-4xl font-bold text-[#5B9BD5] mb-4">2</div>
              <h3 className="text-2xl font-bold text-white mb-6">Bu program sonunda ne netleşir?</h3>
              <ul className="space-y-3 text-white/90 font-light">
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Mülakat yapısı ve karar kriterleri</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Davranış ve karar sinyalleri</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Hangi adaylarda kırmızı bayrak olduğu</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Risk değerlendirme çerçevesi</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#2a4a6f] rounded-lg p-8">
              <div className="text-4xl font-bold text-[#5B9BD5] mb-4">3</div>
              <h3 className="text-2xl font-bold text-white mb-6">Bu program neyi çözmeye odaklanır?</h3>
              <ul className="space-y-3 text-white/90 font-light">
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Sezgisel ve sohbet gibi ilerleyen mülakatlar</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Yanlış işe alımların yarattığı maliyet</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Tutarsız işe alım kararları</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
