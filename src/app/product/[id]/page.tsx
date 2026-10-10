import Image from "next/image";
import { notFound } from "next/navigation";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const bn = (n: number) => n.toLocaleString("bn-BD");
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
///https://api.abcz.workers.dev/api/bazardor/products
async function getProduct(id: string): Promise<Product | null> {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
    const data = await res.json();
    const all: Product[] = data;

    let targetProduct: Product | null = null;
    for (let i = 0; i < all.length; i++) {
        if (String(all[i].id) === id) {
            targetProduct = all[i];
            break;
        }
    }
    return targetProduct;
}
export default async function ProductPage({ params,}: { params: Promise<{ id: string }>;}) {
    const { id } = await params;
    const product = await getProduct(id);
    if (!product) notFound();

    const isUp = product.change.dir === "up";
    const isFlat = product.change.dir === "flat";
    const isImageUrl = product.image && (product.image.startsWith("http") || product.image.startsWith("/"));

    return (
        <div className="min-h-screen bg-[#F4F7F4] pb-12 ">
            <div className="mx-auto max-w-7xl px-4 pt-6 space-y-6">


                <div className="rounded-2xl border border-[#DDE5DD] bg-white p-5 shadow-sm sm:p-6">
                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                        <div className="flex items-start gap-4">
                            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#E1E7E1] bg-[#F5F8F5] text-3xl">
                                {isImageUrl ? (
                                    <Image src={product.image} alt={product.nameBn} fill className="object-cover" />
                                ) : (
                                    <span>{product.image}</span>
                                )}
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-[#202620] sm:text-2xl">{product.nameBn}</h1>
                                <p className="mt-1 text-xs text-[#697169]">
                                    {product.categoryIcon} {product.categoryNameBn} · বাজারভিত্তিক আজকের বাজার দর
                                </p>
                                <span className="mt-1 block text-xs text-[#8A928A]">প্রতি {unitBn(product.unit)}</span>
                            </div>
                        </div>


                        <div className="shrink-0 border-t border-[#E3E8E3] pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0 sm:text-right">
                            <span className="block text-xs text-[#697169]">আজকের দাম</span>
                            <div className="mt-1 text-3xl font-extrabold text-[#161B16]">৳{bn(product.today)}</div>
                            <span className="text-xs text-[#8A928A]">প্রতি {unitBn(product.unit)}</span>

                            <div className={`mt-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold
                                ${isFlat ? "bg-[#F0F2F0] text-[#687068]" : isUp ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}>
                                {!isFlat && (isUp ? <FaCaretUp className="text-sm" /> : <FaCaretDown className="text-sm" />)}
                                <span>{isFlat ? "— 0.0%" : `${isUp ? "+" : "-"}${Math.abs(product.change.pct)}%`}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <section>
                    <h2 className="mb-3 text-base font-bold text-[#252B25]">দামের সারসংক্ষেপ</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="rounded-xl border border-[#DDE5DD] bg-white p-4">
                            <span className="block text-xs font-medium text-emerald-600">সর্বনিম্ন দাম</span>
                            <div className="mt-1 text-lg font-bold text-[#202620]">
                                {bn(Math.min(...product.markets.map((product) => product.min)))} টাকা
                            </div>
                            <span className="mt-1 block text-xs text-[#697169]">
                                {product.markets.find((mrket) => mrket.min === Math.min(...product.markets.map((x) => x.min)))?.market} বাজার
                            </span>
                        </div>
                        <div className="rounded-xl border border-[#DDE5DD] bg-white p-4">
                            <span className="block text-xs font-medium text-red-600">সর্বোচ্চ দাম</span>
                            <div className="mt-1 text-lg font-bold text-[#202620]">
                                {bn(Math.max(...product.markets.map((mrket) => mrket.max)))} টাকা
                            </div>
                            <span className="mt-1 block text-xs text-[#697169]">
                                {product.markets.find((mrket) => mrket.max === Math.max(...product.markets.map((x) => x.max)))?.market} বাজার
                            </span>
                        </div>
                        <div className="rounded-xl border border-[#DDE5DD] bg-white p-4">
                            <span className="block text-xs font-medium text-emerald-600">গড় দাম</span>
                            <div className="mt-1 text-lg font-bold text-[#202620]">
                                {bn(Math.round(product.markets.reduce((acc, mrket) => acc + Math.round((mrket.min + mrket.max) / 2), 0) / product.markets.length))} টাকা
                            </div>
                            <span className="mt-1 block text-xs text-[#697169]">
                                গড়ে {unitBn(product.unit)}-{bn(Math.round(product.markets.reduce((acc, mrket) => acc + Math.round((mrket.min + mrket.max) / 2), 0) / product.markets.length))} টাকার
                            </span>
                        </div>
                    </div>
                </section>


                <section className="overflow-hidden rounded-2xl border border-[#DCE4DC] bg-white shadow-sm">
                    <div className="px-5 py-4">
                        <h2 className="text-base font-bold text-[#252B25]">বাজারভিত্তিক আজকের দাম</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-[#F3F7F3] text-xs text-[#646C64]">
                                    <th className="whitespace-nowrap px-5 py-3.5 text-left font-medium">বাজার</th>
                                    <th className="whitespace-nowrap px-5 py-3.5 text-left font-medium">বিভাগ</th>
                                    <th className="whitespace-nowrap px-5 py-3.5 text-left font-medium">সর্বনিম্ন</th>
                                    <th className="whitespace-nowrap px-5 py-3.5 text-left font-medium">সর্বোচ্চ</th>
                                    <th className="whitespace-nowrap px-5 py-3.5 text-left font-medium">গড়</th>
                                </tr>
                            </thead>
                            <tbody>
                                {product.markets.map((mrket, i) => {
                                    const marketAvg = Math.round((mrket.min + mrket.max) / 2);
                                    return (
                                        <tr key={i} className={`border-t border-[#AEB8AE] ${i % 2 === 0 ? "bg-[#FBFCFB]" : "bg-[#F0F4F0]"}`}>
                                            <td className="whitespace-nowrap px-5 py-3.5 font-bold text-[#202620]">{mrket.market}</td>
                                            <td className="whitespace-nowrap px-5 py-3.5 text-[#596159]">{mrket.division}</td>
                                            <td className="whitespace-nowrap px-5 py-3.5 text-[#4F574F]">{bn(mrket.min)} টাকা</td>
                                            <td className="whitespace-nowrap px-5 py-3.5 text-[#4F574F]">{bn(mrket.max)} টাকা</td>
                                            <td className="whitespace-nowrap px-5 py-3.5 font-bold text-[#202620]">{bn(marketAvg)} টাকা</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>

            </div>
        </div>
    );
}