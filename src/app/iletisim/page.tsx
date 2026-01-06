import Link from 'next/link'

export default function Contact() {
  return (
    <main className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1920')",
          }}
        >
          {/* Dark Blue Overlay */}
          <div className="absolute inset-0 bg-[#1e3a5f] opacity-90"></div>
        </div>

        {/* Navigation */}
        <nav className="absolute top-0 right-0 p-8 z-20">
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
              <Link href="/iletisim" className="text-gray-200 font-semibold">
                İletişim
              </Link>
            </li>
          </ul>
        </nav>

        {/* Contact Content */}
        <div className="relative z-10 px-4 max-w-6xl mx-auto w-full">
          {/* Title Section */}
          <div className="mb-20">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              İletişim
            </h1>
            <p className="text-xl md:text-2xl text-white font-light">
              Bir şey satmak için değil, doğru soruları sormak için görüşüyoruz.
            </p>
          </div>

          {/* Contact Information - Two Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-16">
            {/* Hakan */}
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Hakan</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">E-posta</h3>
                  <a
                    href="mailto:hakan@derinakademi.net"
                    className="text-white hover:text-gray-200 transition-colors text-lg"
                  >
                    hakan@derinakademi.net
                  </a>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Telefon</h3>
                  <a
                    href="tel:+905397983969"
                    className="text-white hover:text-gray-200 transition-colors text-lg"
                  >
                    0 539 798 39 69
                  </a>
                </div>
              </div>
            </div>

            {/* Neslihan */}
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Neslihan</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">E-posta</h3>
                  <a
                    href="mailto:neslihan@derinakademi.net"
                    className="text-white hover:text-gray-200 transition-colors text-lg"
                  >
                    neslihan@derinakademi.net
                  </a>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Telefon</h3>
                  <a
                    href="tel:+905330193134"
                    className="text-white hover:text-gray-200 transition-colors text-lg"
                  >
                    0 533 019 31 34
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}