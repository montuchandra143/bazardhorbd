import Image from "next/image";
import Navbar from "./Navbar";
import TitleMarquee from "./TitleMarquee";
import ButtonSigSign from "./ButtonSigSign";
const Header = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <div>
            <div className="bg-white border-b border-gray-100 py-3 sm:py-4 px-4 sm:px-6">
                <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    
                    <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-start">
                        <div className="bg-[#00875A] rounded-2xl p-2.5 sm:p-3 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center shadow-sm shrink-0">
                            <Image
                                height={28}
                                width={28}
                                src="/logo-icon.png"
                                alt="logo"
                                className="object-contain sm:w-8 sm:h-8"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h2 className="font-bold text-xl sm:text-2xl text-gray-900 leading-tight">
                                বাজার দর
                            </h2>
                            <p className="text-xs sm:text-sm font-normal text-gray-500 mt-0.5">
                                {date}
                            </p>
                        </div>
                    </div>
                <ButtonSigSign/>
    
                </div>
                  <Navbar/>
            </div>
            <TitleMarquee/>
          
     
        </div>
    );
};

export default Header;