const Footer = () => {
    return (
        <footer className="w-full border-t border-[#DDE5DD] bg-white py-6 px-4 sm:px-8">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#697169]">
                <div>
                    <span className="font-semibold text-[#202620]">বাজার দর</span> — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                </div>

                <div className="text-center sm:text-right text-[#8A928A]">
                    সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
                </div>
            </div>
        </footer>
    );
};

export default Footer;