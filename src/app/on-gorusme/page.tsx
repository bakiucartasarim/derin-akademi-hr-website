import Link from 'next/link'

export default function OnGorusme() {
  return (
    <main className="min-h-screen">
      {/* Hero Section with Background */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Solid Dark Blue Background */}
        <div className="absolute inset-0 bg-[#1a2f4d]"></div>

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

        {/* Content */}
        <div className="relative z-10 px-4 max-w-4xl mx-auto w-full">
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-12">
              Kısa Ön Görüşme Talep Edin
            </h1>

            <p className="text-xl md:text-2xl mb-6 font-light leading-relaxed">
              İlk görüşmeler, kurumunuzun karar noktalarında nerelerde zorlandığını anlamaya yöneliktir.
            </p>

            <p className="text-xl md:text-2xl mb-12 font-light leading-relaxed">
              Teşhis olmadan çözüm önermeyiz.
            </p>

            <Link href="/iletisim">
              <button className="bg-[#4169E1] hover:bg-[#3558c7] text-white px-10 py-4 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                İletişime Geç
              </button>
            </Link>

            <p className="text-white text-sm mt-8 opacity-80">
              Bu görüşmeler satış değil, teşhis amaçlıdır.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
