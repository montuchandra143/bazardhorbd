import MarketBanner from "./components/homepage/MarketBanner";
import ProductCard, { ProductCardIp } from "./components/homepage/ProductCard";
import { AiFillCaretDown } from "react-icons/ai";
export default async function Home() {
///https://api.abcz.workers.dev/api/bazardor/products
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
    const products: ProductCardIp[] = await res.json();
    const priceDecreased = products.filter((item) => item.change.dir === "down");
  return (
    <div className=" bg-[#F4F7F4] min-h-screen">
      <MarketBanner/>

   <div className="max-w-7xl mx-auto px-4 mt-6 space-y-10">
                
                {priceDecreased.length > 0 && (
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <AiFillCaretDown />
                            <h2 className="text-xl font-bold text-gray-900">আজ দাম কমেছে</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {priceDecreased.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                )}


                <div>
                    <div className="mb-4">
                        <h2 className="text-xl font-bold text-gray-900">সব পণ্য</h2>
                        <p className="text-xs text-gray-500">মোট {products.length}টি পণ্য দেখানো হচ্ছে</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>

            </div>
    </div>
  );
}
