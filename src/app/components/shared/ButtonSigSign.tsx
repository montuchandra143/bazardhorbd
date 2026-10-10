"use client";

import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { FaUser, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';

const ButtonSigSign = () => {
    const pathname = usePathname();
    const router = useRouter();
    const isSignIn = pathname === "/sign-in";
    const isSignUp = pathname === "/sign-up";

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    setIsOpen(false);
                    router.push("/sign-in");
                    router.refresh();
                },
            },
        });
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {user ? (
                <div>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-100 py-1.5 px-3 rounded-full transition-all cursor-pointer shadow-xs"
                    >
                        <div className="w-8 h-8 rounded-full bg-[#00873E] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                            {user.email ? user.email.charAt(0).toUpperCase() : "U"}
                        </div>
                        <span className="text-sm font-semibold text-gray-800 max-w-[100px] truncate">
                            {user.name}
                        </span>
                        <FaChevronDown className={`text-xs text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                    </button>

                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl py-3 px-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                            <div className="px-3 py-2 border-b border-gray-100 mb-2">
                                <h4 className="font-bold text-gray-900 text-sm truncate">
                                    {user.name}
                                </h4>
                                <p className="text-xs text-gray-500 truncate mt-0.5">
                                    {user.email}
                                </p>
                            </div>

                            <Link
                                href="/profile"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-[#00873E] transition-colors"
                            >
                                <FaUser className="text-gray-400 text-xs" />
                                <span>আমার প্রফাইল</span>
                            </Link>

                            <button
                                onClick={handleSignOut}
                                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors mt-1"
                            >
                                <FaSignOutAlt className="text-xs" />
                                <span>সাইন আউট</span>
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-end">
                    <Link
                        href="/sign-in"
                        className={`text-xs sm:text-sm font-medium transition-all px-4 py-2 rounded-xl ${
                            isSignIn 
                                ? "bg-[#00873E] text-white shadow-sm font-semibold" 
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >সাইন ইন 
                    </Link>
                    <Link
                        href="/sign-up"
                        className={`rounded-xl px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all shrink-0 shadow-sm ${
                            isSignUp
                                ? "bg-[#00873E] text-white shadow-sm font-semibold" 
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        সাইন আপ
                    </Link>
                </div>
            )}
        </div>
    );
};

export default ButtonSigSign;