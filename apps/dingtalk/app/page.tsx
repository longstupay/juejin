import Carousels from '../components/Carousel';
import NavBar from '../components/NavBar';

export default function Page() {
  return (
    <div className="bg-slate-200 w-full min-h-[800px] overflow-hidden overflow-x-clip relative">
      <NavBar />
      <Carousels />
      <div className="text-red-500">7777777</div>
    </div>
  );
}
