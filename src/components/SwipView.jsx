import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router";

const images = [
  '07fdbe0e-2141-4a2c-a0b9-fa4f11ca9bdd.jpeg',
  '1041c0ab-692c-45ce-97e0-1b1b54041565.jpeg',
  '1a9dd17c-11e7-492e-958b-e62c76322283.jpeg',
  '1d28b5ab-9a02-4f10-9e14-c9ab803728ac.jpeg',
  '1e40c017-fed4-4ba4-b92e-ea27e1c4ebe3.jpeg',
  '1fcfe040-ef99-408d-a1c9-79ffbffbd534.jpeg',
  '20644ae4-a80a-4f10-8e90-88113fd781bc.jpeg',
  '237a8795-2039-4c5a-9155-024d9bde3ffe.jpeg',
  '2595189a-b897-4593-8e89-892809efce0d.jpeg',
  '2d3e932a-dd32-452d-83f6-a1f197d63988.jpeg',
  '2da26043-fcaa-46ff-a958-ae541177d235.jpeg',
  '338451e3-7a0d-4ae4-bb40-57c4e15283e0.jpeg',
  '3d50f09c-3f2f-4a70-bd5e-a3fae051a73e.jpeg',
  '52213e70-869d-4ed0-baa3-53be627179b1.jpeg',
  '5cb89683-3b0d-4e7e-bf81-ca7955b3d810.jpeg',
  '5ecf3de7-f0a2-4db4-865a-a0b3c01bc64d.jpeg',
  '6dc215c4-33a4-49f0-a0d5-bc294a94b9e1.jpeg',
  '72d157d5-f328-4c3b-83c8-c1b1b8e5bec1.jpeg',
  '8ad5c689-536c-408a-934c-d4df255c3628.jpeg',
  '9860b721-17b1-430c-bfd9-a5f1d66587fa.jpeg',
  '9b283f53-8087-4fce-9edb-e0d63c7c8161.jpeg',
  'adde2631-2b8a-42cf-8ca0-a4e48ad7734f.jpeg',
]

export function SwipView() {

  const [current, setCurrent] = useState(0);
  const [choos, setChoos] = useState([ -2,- 1, 0, 1, 2].map(i => (current + i + images.length) % images.length));

  const scrollContainerRef = useRef(null);
  const baseClasse = useState('flex items-center space-x-16 sm:space-x-12');
  const [cls, setCls] = useState(baseClasse);
  const [translate, setTranslate] = useState(0);
  const [tW, setTW] = useState(0);

  useEffect(() => {
    const bw = scrollContainerRef.current.offsetWidth;
    const w = scrollContainerRef.current.firstChild.offsetWidth;
    setTW((bw - w)/(choos.length - 1));
  }, []);

  const transitionEnd = (e) => {
    if (e.propertyName === 'transform') {
      setCls(baseClasse);
      setCurrent((n) => {
        const nC = (n + images.length + (translate > 0 ? -1 : 1)) % images.length;
        setChoos([nC - 2, nC - 1, nC, nC + 1, nC + 2].map(i => (i + images.length) % images.length));
        return nC;
      });
      setTranslate(0); 
    }
  };

  const prevSlide = useCallback(() => {
    setCls(`${baseClasse} transition-transform duration-500`);
    setTranslate(tW); 
  }, [tW]);

  const nextSlide = useCallback(() => {
    setCls(`${baseClasse} transition-transform duration-500`);
    setTranslate(-tW); 
  }, [tW]);

  return (
    <div className="relative flex justify-center items-center w-full h-full">
      <div className="w-6xl flex justify-center items-center text-center overflow-hidden">
        <div 
          className={cls} 
          style={{ transform: `translateX(${translate}px)` }}
          ref={scrollContainerRef}
          onTransitionEnd={transitionEnd}
        >
          {choos.map((i) => (
            <div className="" key={i}>
              <div key={i} className="flex min-w-[445px] min-h-[500px] sm:min-w-[345px] sm:min-h-[430px] items-center justify-center">
                <div className="w-[420px] h-[500px] sm:w-[320px] sm:h-[400px] overflow-hidden relative hover:w-[400px] hover:h-[480px] sm:hover:w-[300px] sm:hover:h-[380px] transition-all duration-500">
                  <div className="absolute w-[430px] h-[500px] sm:w-[330px] sm:h-[400px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hover:w-[450px] hover:h-[520px] sm:hover:w-[350px] sm:hover:h-[520px] transition-all duration-500">
                    <img src={`http://localhost:8080/public/Couture/${images[i]}`} className="w-full h-full object-cover object-center"/>
                  </div>
                </div>
              </div>
              <div className="text-left px-4 text-2xl text-gray-700">
                SOFT LEATHER JACKET
              </div>
              <div className="text-left px-4 text-md text-gray-500 my-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </div>
              <NavLink className="block text-left px-4 text-xl text-gray-700 my-2 underline underline-offset-4">
                DÉCOUVRIR
              </NavLink>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow"
      >
        <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow"
      >
        <ChevronRightIcon className="h-6 w-6 text-gray-800" />
      </button>
    </div>
  );

}
