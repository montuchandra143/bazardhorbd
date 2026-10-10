"use client"
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";



const SignUpPage = () => {
 const router = useRouter();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

    
        if (password !== confirmPassword) {
            toast.error("পাসওয়ার্ড দুটি মিলছে না!");
            return;
        }

        const { data, error } = await authClient.signUp.email({ name, email,password,callbackURL: "/" });
        if (error) {
            toast.error(error.message || "অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে!");
            return;
        }

        if (data) {
            toast.success("সফলভাবে অ্যাকাউন্ট তৈরি হয়েছে!");
             router.push("/");
        }
    };

    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/"
        });
    };

    const handleGithubSignIn = async () => {
        await authClient.signIn.social({
            provider: "github",
            callbackURL: "/"
        });
    };

    return (
        <div>

            <div className="min-h-screen bg-[#F4F7F4] flex flex-col items-center justify-center px-4 py-12">
            <div className="text-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#202620]">
                    অ্যাকাউন্ট তৈরি করুন
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-[#697169]">
                    বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                </p>
            </div>

            <div className="w-full max-w-md rounded-2xl border border-[#DDE5DD] bg-white p-6 sm:p-8 shadow-sm">
                <form className="space-y-4" onSubmit={onSubmit}>
                    <div>
                        <label className="block text-xs font-medium text-[#303630] mb-1.5">
                            নাম
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="নাম "
                            className="w-full rounded-xl border border-[#DDE5DD] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#303630] placeholder-[#A0A8A0] focus:border-emerald-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-[#303630] mb-1.5">
                            ইমেইল
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            className="w-full rounded-xl border border-[#DDE5DD] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#303630] placeholder-[#A0A8A0] focus:border-emerald-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-[#303630] mb-1.5">
                            পাসওয়ার্ড
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="কমপক্ষে ৮ অক্ষর"
                            className="w-full rounded-xl border border-[#DDE5DD] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#303630] placeholder-[#A0A8A0] focus:border-emerald-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-[#303630] mb-1.5">
                            পাসওয়ার্ড নিশ্চিত করুন
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="আবার লিখুন"
                            className="w-full rounded-xl border border-[#DDE5DD] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#303630] placeholder-[#A0A8A0] focus:border-emerald-500 focus:outline-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-2 rounded-xl bg-[#00873E] py-3 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#007032] transition-colors cursor-pointer"
                    >
                        অ্যাকাউন্ট তৈরি করুন
                    </button>
                </form>

                <div className="relative my-6 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-[#E1E7E1]"></div>
                    </div>
                    <div className="relative bg-white px-3 text-xs text-[#8A928A]">
                        অথবা
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="flex items-center justify-center gap-2 rounded-xl border border-[#DDE5DD] bg-white py-2.5 text-xs font-medium text-[#303630] shadow-sm hover:bg-[#F9FCF9] transition-colors cursor-pointer"
                    >
                        <FcGoogle />
                        <span>Google দিয়ে চালিয়ে যান</span>
                    </button>
                    <button
                        type="button"
                        onClick={handleGithubSignIn}
                        className="flex items-center justify-center gap-2 rounded-xl border border-[#DDE5DD] bg-white py-2.5 text-xs font-medium text-[#303630] shadow-sm hover:bg-[#F9FCF9] transition-colors cursor-pointer"
                    >
                        <FaGithub />
                        <span>GitHub দিয়ে চালিয়ে যান</span>
                    </button>
                </div>

                <div className="mt-6 text-center text-xs text-[#697169]">
                    অ্যাকাউন্ট আছে?
                    <Link href="/sign-in" className="font-semibold text-[#00873E] hover:underline">
                        সাইন ইন করুন
                    </Link>
                </div>
            </div>
        </div>
            
        </div>
    );
};

export default SignUpPage;