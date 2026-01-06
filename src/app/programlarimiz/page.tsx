import Link from 'next/link'

export default function Programlarimiz() {
  return (
    <main className="min-h-screen bg-[#1a2f4d]">
      {/* Navigation */}
      <nav className="absolute top-0 right-0 p-8 z-20">
        <ul className="flex space-x-8 text-white text-base font-medium">
          <li>
            <Link href="/yaklasimimiz" className="hover:text-gray-200 transition-colors">
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

      {/* Content */}
      <div className="px-4 py-20 max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Programlarımız
          </h1>
          <p className="text-xl text-white font-light leading-relaxed max-w-5xl">
            Derin Akademi programları, insanla ilgili kritik kararları kişisel kanaattan çıkarıp sistematik zemine oturmayı hedefler. Her program, kurumun gerçek ihtiyaçlarına göre eğitim, atölye veya danışmanlık formatında tasarlanır.
          </p>
        </div>

        {/* Program Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {/* Card 1 */}
          <div className="border-2 border-white/30 rounded-lg p-8 hover:border-white/50 transition-colors">
            <h3 className="text-2xl font-bold text-white mb-4">
              İnsan Kararları Çerçevesi
            </h3>
            <p className="text-white/90 font-light">
              Hangi kararların kim tarafından alınacağını netleştirir.
            </p>
          </div>

          {/* Card 2 */}
          <div className="border-2 border-white/30 rounded-lg p-8 hover:border-white/50 transition-colors">
            <h3 className="text-2xl font-bold text-white mb-4">
              Terfi ve Yöneticiliğe Geçiş Kararları
            </h3>
            <p className="text-white/90 font-light">
              Bireysel başarı ile yöneticilik arasındaki farkı görünür kılar.
            </p>
          </div>

          {/* Card 3 */}
          <div className="border-2 border-white/30 rounded-lg p-8 hover:border-white/50 transition-colors">
            <h3 className="text-2xl font-bold text-white mb-4">
              Performans Değerlendirme Zemini
            </h3>
            <p className="text-white/90 font-light">
              Değerlendirmeyi kişisel algıdan çıkarıp ortak kriterlere dayandırır.
            </p>
          </div>

          {/* Card 4 */}
          <div className="border-2 border-white/30 rounded-lg p-8 hover:border-white/50 transition-colors md:col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ücret ve Adalet Algısı
            </h3>
            <p className="text-white/90 font-light">
              Ücret kararlarını pazarlıktan çıkarıp sistem meselesine dönüştürür.
            </p>
          </div>

          {/* Card 5 */}
          <div className="border-2 border-white/30 rounded-lg p-8 hover:border-white/50 transition-colors md:col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-4">
              İşe Alım ve Mülakat Kararları
            </h3>
            <p className="text-white/90 font-light">
              Mülakatı sohbetten çıkarıp risk değerlendirme sürecine çevirir.
            </p>
          </div>
        </div>

        {/* General Information Section */}
        <div className="mt-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
            Programlar Hakkında Genel Bilgiler
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Column 1 - Kimler İçin */}
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-6">Kimler İçin?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span className="font-light">Karar veren yöneticiler</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span className="font-light">Üst ve orta kademe</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span className="font-light">İK ekipleri (süreç desteği)</span>
                </li>
              </ul>
            </div>

            {/* Column 2 - Nasıl Çalışıyoruz */}
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-6">Nasıl Çalışıyoruz?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span className="font-light">Gerçek vaka analizleri</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span className="font-light">Karar simülasyonları</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span className="font-light">Kuruma özel senaryolar</span>
                </li>
              </ul>
            </div>

            {/* Column 3 - Süre ve Format */}
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-6">Süre ve Format</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span className="font-light">Esnek ve kuruma özel</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span className="font-light">1 gün veya 2 yarım gün</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span className="font-light">Eğitim, atölye veya danışmanlık</span>
                </li>
              </ul>
            </div>

            {/* Column 4 - Ortak Yaklaşım */}
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-6">Ortak Yaklaşım</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span className="font-light">Kuruma özel tasarım</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span className="font-light">Karar çerçevesi odaklı</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span className="font-light">Uygulama ve takip</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span className="font-light">Kalıcı değişim</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
