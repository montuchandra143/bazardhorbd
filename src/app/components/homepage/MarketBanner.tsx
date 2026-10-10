import Image from 'next/image';
import Link from 'next/link';

const currentDate = new Date().toLocaleDateString('bn-BD', {
    dateStyle: "full"
});

const MarketBanner = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 my-6 pt-12">
            <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            
                <div className="flex flex-col items-start gap-4 max-w-2xl z-10">
                    <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 px-4 py-1.5 rounded-full text-xs md:text-sm font-medium border border-emerald-100/60">
                        <span>{currentDate}</span>
                    </div>
                    <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-snug">
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    <p className="text-sm md:text-base text-gray-600 leading-relaxed font-normal">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                    </p>

                    <div className="pt-2">
                        <Link 
                            href="/" 
                            className="inline-flex items-center justify-center bg-[#00875A] hover:bg-[#007049] text-white font-semibold text-sm md:text-base px-6 py-3 rounded-xl shadow-md transition-all transform active:scale-95"
                        >
                            সব পণ্য দেখুন
                        </Link>
                    </div>
                </div>

                <div className="relative w-full md:w-auto flex justify-center items-center shrink-0">
                    <div className="relative w-64 h-56 md:w-80 md:h-64">
                        <Image
                            src="/bazar-hero.png" 
                            alt="Market Bazar Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MarketBanner;