import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import Footer from "./components/Footer";
import CardGrid from "./components/CardGrid";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-row mr-10 ml-10">
        <div className="w-200 h-1400">
          <Filter/>
        </div>
        <div>
          <CardGrid/>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
