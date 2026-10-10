import Image from "next/image";
import MarketBanner from "./components/homepage/MarketBanner";

export default function Home() {
  return (
    <div className=" bg-[#F4F7F4] min-h-screen">
      <MarketBanner/>
    </div>
  );
}
