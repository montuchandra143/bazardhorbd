import Link from "next/link";
import { IoMdHome } from "react-icons/io";
interface NavItem {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}
///https://api.abcz.workers.dev/api/bazardor/categories
const Navbar = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories");
    const data = await res.json();
    const categories: NavItem[] = data;

    return (
        <nav className="max-w-7xl mx-auto px-4 py-2 flex justify-start items-center gap-1 md:gap-3 overflow-x-auto no-scrollbar">
            <Link 
                href={"/"} 
                className="px-3.5 py-1.5 rounded-md text-sm flex col-2 gap-2 items-center font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-all shrink-0 whitespace-nowrap"
            >
               <IoMdHome /> হোম
            </Link>
            {
                categories.map((item) => (
                    <Link
                        key={item.id} 
                        href={`/category/${item.slug}`}
                        className="px-3.5 py-1.5 rounded-md text-sm font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-all shrink-0 whitespace-nowrap flex items-center gap-1.5"
                    >
                        <span>{item.icon}</span>
                        <span>{item.nameBn}</span>
                    </Link>
                ))
            }
        </nav>
    );
};

export default Navbar;