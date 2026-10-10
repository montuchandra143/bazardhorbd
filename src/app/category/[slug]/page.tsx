"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const bn = (number: number) => number.toLocaleString("bn-BD");

const unitBn = (u: string) => {
    const map: Record<string, string> = {
        kg: "কেজি",
        litre: "লিটার",
        dozen: "ডজন",
        piece: "পিস",
        gram: "গ্রাম",
    };
    return map[u] ?? u;
};

interface Market {
    market: string;
    division: string;
    min: number;
    max: number;
}

interface Product {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    change: {
        dir: "up" | "down" | "flat";
        pct: number;
    };
    markets: Market[];
}

interface CategoryPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
    const resolvedParams = use(params);
    const { slug } = resolvedParams;
    const searchParams = useSearchParams();
    const router = useRouter();
    const sort = searchParams.get("sort") || "default";

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://api.abcz.workers.dev/api/bazardor/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">লোড হচ্ছে...</div>;
    }

    const categoryProducts = products.filter((p) => p.category === slug);

    if (categoryProducts.length === 0) {
        return <div className="min-h-screen flex items-center justify-center">কোনো পণ্য পাওয়া যায়নি</div>;
    }

    const categoryInfo = categoryProducts[0];
    const sortedProducts = [...categoryProducts];
    if (sort === "low-high") {
        sortedProducts.sort((a, b) => a.today - b.today);
    } else if (sort === "high-low") {
        sortedProducts.sort((a, b) => b.today - a.today);
    }

    return (
        <div className="min-h-screen bg-[#F4F7F4] pb-12">
            <div className="mx-auto max-w-7xl px-4 pt-6 space-y-6">
                
                <div className="rounded-2xl border border-[#DDE5DD] bg-white p-5 shadow-sm sm:p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#E1E7E1] bg-[#F5F8F5] text-3xl">
                            {categoryInfo.categoryIcon}
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-[#202620] sm:text-2xl">
                                {categoryInfo.categoryNameBn}
                            </h1>
                            <p className="mt-1 text-xs text-[#697169]">
                                প্রতি পণ্যের আজকের দাম ও পরিবর্তন
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-[#DDE5DD] bg-white px-5 py-3.5 shadow-sm gap-3">
                    <div className="text-sm text-[#505850]">
                        মোট {bn(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
                    </div>

                    <div className="flex items-center justify-end gap-2">
                        <span className="text-xs text-[#697169]">সাজান</span>
                        <div className="relative">
                            <select
                                value={sort}
                                onChange={(e) => {
                                    router.push(`/category/${slug}?sort=${e.target.value}`);
                                }}
                                className="rounded-lg border border-[#DDE5DD] bg-white px-3 py-1.5 text-xs text-[#303630] focus:border-emerald-500 focus:outline-none cursor-pointer"
                            >
                                <option value="default">ডিফল্ট</option>
                                <option value="low-high">দাম: কম থেকে বেশি</option>
                                <option value="high-low">দাম: বেশি থেকে কম</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {sortedProducts.map((product) => {
                        const isUp = product.change.dir === "up";
                        const isFlat = product.change.dir === "flat";
                        const isImageUrl = product.image && (product.image.startsWith("http") || product.image.startsWith("/"));

                        return (
                            <div
                                key={product.id}
                                className="rounded-2xl border border-[#DDE5DD] bg-white p-5 shadow-sm transition-all hover:border-emerald-500 cursor-pointer"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-3">
                                        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#E1E7E1] bg-[#F5F8F5] text-2xl">
                                            {isImageUrl ? (
                                                <Image src={product.image} alt={product.nameBn} fill className="object-cover" />
                                            ) : (
                                                <span>{product.image}</span>
                                            )}
                                        </div>
                                        <div>
                                            <h2 className="font-bold text-[#202620]">{product.nameBn}</h2>
                                            <span className="text-xs text-[#8A928A]">প্রতি {unitBn(product.unit)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-end justify-between border-t border-[#EFEFEF] pt-3">
                                    <div>
                                        <span className="block text-[11px] text-[#697169]">আজকের দাম</span>
                                        <div className="text-lg font-extrabold text-[#161B16]">
                                            ৳{bn(product.today)}
                                        </div>
                                    </div>

                                    <div className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold
                                        ${isFlat ? "bg-[#F0F2F0] text-[#687068]" : isUp ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}>
                                        {!isFlat && (isUp ? <FaCaretUp /> : <FaCaretDown />)}
                                        <span>{isFlat ? "— 0.0%" : `${isUp ? "+" : "-"}${Math.abs(product.change.pct)}%`}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}