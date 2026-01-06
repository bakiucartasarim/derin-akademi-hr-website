import Link from 'next/link'

export default function Home() {
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

          <Link href="/iletisim">
            <button className="bg-[#4169E1] hover:bg-[#3558c7] text-white px-10 py-4 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Kısa Ön Görüşme Talep Et
            </button>
          </Link>

          <p className="text-white text-sm mt-6 opacity-80">
            Bu görüşmeler satış değil, teşhis amaçlıdır.
          </p>
        </div>
      </section>
    </main>
  )
}
