import Marquee from "react-fast-marquee";
interface InterfaceProduct {
    id: number;
    nameBn: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    today: number;
    change: {
        dir: string;
        pct: number;
    };
}
///https://api.abcz.workers.dev/api/bazardor/products
const TitleMarquee = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
    const data = await res.json();
    const markets: InterfaceProduct[] = data;

    return (
        <div className="px-2">
            <Marquee>
                <div className="flex items-center gap-6 overflow-x-auto no-scrollbar px-4 py-1">
                    {
                        markets.map((product) => (
                            <div key={product.id} className="flex items-center gap-2 shrink-0 cursor-pointer group">
                                <p className="text-base">{product.categoryIcon}</p>
                                <p className="text-sm font-medium text-gray-800 group-hover:text-emerald-700 transition-colors">
                                    {product.nameBn}: {product.unit} <strong className="text-gray-900">টাকা{product.today}</strong> / 
                                </p>
                            </div>
                        ))
                    }
                </div>
        </Marquee>
        </div>
    );
};

export default TitleMarquee;