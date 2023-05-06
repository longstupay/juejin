import Carousels from '../components/Carousel';
import NavBar from '../components/NavBar';
import Rectangular from '../sections/Rectan-fede';

export default function Page() {
  return (
    <div className="bg-slate-200 w-full min-h-[800px] overflow-hidden overflow-x-clip relative">
      <NavBar />
      <Carousels />
      <div className="relative z-10 w-full overflow-x-clip">
        <Rectangular />
      </div>
      <div className="text-red-500">7777777</div>
    </div>
  );
}
