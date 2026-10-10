"use client"
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";


const ProfilePage = () => {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [name, setName] = useState<string>("");

    // Seshon theke user data ashle name state-e set kora
    useEffect(() => {
        if (user?.name) {
            setName(user.name);
        }
    }, [user]);

    // Sign out handler
    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("Safolvabe sign out hoyeche!");
                    router.push("/sign-in");
                    router.refresh();
                },
            },
        });
    };

    // Profile update handler
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data, error } = await authClient.updateUser({
                name: name,
            });

            if (error) {
                toast.error(error.message || "Nam update korte somossa hoyeche!");
                return;
            }

            if (data) {
                toast.success("Profile safolvabe update hoyeche!");
                router.refresh();
            }
        } catch (err) {
            toast.error("Kichu ekta somossa hoyeche!");
        }
    };

    return (
        <div className="min-h-screen bg-[#F4F7F4] px-4 py-12 flex flex-col items-center">
            <div className="w-full max-w-3xl space-y-6">
                
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#202620]">
                        Amar Profile
                    </h1>
                    <p className="mt-1 text-xs sm:text-sm text-[#697169]">
                        Apnar account-er tottho ekhane dekhun.
                    </p>
                </div>

                <div className="rounded-2xl border border-[#DDE5DD] bg-white p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        {/* Gmail er first letter diye logo */}
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-[#E1E7E1] bg-[#00873E] text-white flex items-center justify-center font-bold text-2xl shadow-sm">
                            {user?.email ? user.email.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-[#202620]">
                                {user?.name || "Rezwan Ahmed"}
                            </h2>
                            <p className="text-xs sm:text-sm text-[#697169]">
                                {user?.email || "rezwanahmed@gmail.com"}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleSignOut}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-white px-4 py-2 text-xs font-medium text-red-600 shadow-sm hover:bg-red-50 transition-colors cursor-pointer"
                    >
                        <span>←</span>
                        <span>Sign Out</span>
                    </button>
                </div>

                <div className="rounded-2xl border border-[#DDE5DD] bg-white p-6 sm:p-8 shadow-sm space-y-5">
                    <h3 className="text-base font-bold text-[#202620]">
                        Tottho
                    </h3>

                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-[#303630] mb-1.5">
                                Nam
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Apnar nam likhun"
                                className="w-full rounded-xl border border-[#DDE5DD] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#303630] placeholder-[#A0A8A0] focus:border-emerald-500 focus:outline-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-xl bg-[#00873E] py-3 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#007032] transition-colors cursor-pointer"
                        >
                            Update
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;