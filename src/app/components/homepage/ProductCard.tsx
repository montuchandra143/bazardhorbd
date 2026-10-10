import Image from "next/image";
import Link from "next/link";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

export interface ProductCardIp {
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
    change: { dir: "up" | "down" | "flat"; pct: number };
}

const ProductCard = ({ product }: { product: ProductCardIp }) => {
    const isUp = product.change.dir === "up";
    const isFlat = product.change.dir === "flat";
    const isImageUrl = product.image &&(product.image.startsWith("http") || product.image.startsWith("/"));

    return (
        <Link href={`/product/${product.id}`} className="block">
        <div className="bg-white w-full rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-all duration-300 p-5 flex flex-col justify-between gap-4 group">
            <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-2xl shrink-0 border border-gray-100 group-hover:border-[#00873E]/30 transition-colors overflow-hidden relative">
                    {isImageUrl ? (
                        <Image src={product.image} alt={product.nameBn} fill className="object-cover" />
                    ) : (
                        <span>{product.image}</span>
                    )}
                </div>
                <div>
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-[#00873E] transition-colors leading-tight">
                        {product.nameBn}
                    </h3>
                    <span className="text-xs text-gray-500 mt-0.5 block">
                        প্রতি {product.unit}
                    </span>
                </div>
            </div>

            <div className="flex items-end justify-between pt-2 border-t border-gray-50 group-hover:border-gray-100 transition-colors">
                <div>
                    <span className="text-xs text-gray-500 block">আজকের দাম</span>
                    <span className="text-xl font-extrabold text-gray-950">
                        ৳{product.today.toLocaleString("bn-BD")}{" "}
                        <span className="text-sm font-semibold">টাকা</span>
                    </span>
                </div>
                <div
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold
                    ${isFlat ? "bg-gray-100 text-gray-600" : isUp ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}
                >
                    {!isFlat && (isUp ? <FaCaretUp className="text-sm" /> : <FaCaretDown className="text-sm" />)}
                    <span>{isFlat ? "— 0.0%" : `${Math.abs(product.change.pct)}%`}</span>
                </div>
            </div>
        </div>
        </Link>
    );
};

export default ProductCard;