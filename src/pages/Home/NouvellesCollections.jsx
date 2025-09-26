import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Virtual } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import { NavLink } from "react-router";
import { Picture } from "../../components/Picture";
import { API_BASE_URL } from "../../utils/api";

const images = [
  '07fdbe0e-2141-4a2c-a0b9-fa4f11ca9bdd.jpeg',
  '1041c0ab-692c-45ce-97e0-1b1b54041565.jpeg',
  '1a9dd17c-11e7-492e-958b-e62c76322283.jpeg',
  '1d28b5ab-9a02-4f10-9e14-c9ab803728ac.jpeg',
  '1e40c017-fed4-4ba4-b92e-ea27e1c4ebe3.jpeg',
  '20644ae4-a80a-4f10-8e90-88113fd781bc.jpeg',
  '237a8795-2039-4c5a-9155-024d9bde3ffe.jpeg',
  '2595189a-b897-4593-8e89-892809efce0d.jpeg',
  '2d3e932a-dd32-452d-83f6-a1f197d63988.jpeg',
  '2da26043-fcaa-46ff-a958-ae541177d235.jpeg',
  '338451e3-7a0d-4ae4-bb40-57c4e15283e0.jpeg',
  '3d50f09c-3f2f-4a70-bd5e-a3fae051a73e.jpeg',
  '52213e70-869d-4ed0-baa3-53be627179b1.jpeg',
  '5ecf3de7-f0a2-4db4-865a-a0b3c01bc64d.jpeg',
  '6dc215c4-33a4-49f0-a0d5-bc294a94b9e1.jpeg',
  '72d157d5-f328-4c3b-83c8-c1b1b8e5bec1.jpeg',
  '8ad5c689-536c-408a-934c-d4df255c3628.jpeg',
  '9860b721-17b1-430c-bfd9-a5f1d66587fa.jpeg',
  '9b283f53-8087-4fce-9edb-e0d63c7c8161.jpeg',
]

export function NouvellesCollections() {

  const [slidesPerView, setSlidesPerView] = useState(1);
  const [spaceBetween, setSpaceBetween] = useState(100);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesPerView(1); // xs
      } else if (window.innerWidth < 1200){
        setSlidesPerView(2); // sm
        setSpaceBetween(20);
      } else {
        setSpaceBetween(80);
        setSlidesPerView(3); // defaut
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-stone-200">
      <div className="text-center py-25 px-7 flex flex-col items-center">
        <h1 className="text-7xl text-stone-700 py-3" data-aos="fade-up">Nouvelles Collections</h1>
        <h3 className="text-lg text-stone-500 py-7 max-w-xl" data-aos="fade-up" data-aos-delay="300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe voluptas ut dolorum consequuntur, adipisci repellat! Eveniet commodi voluptatem voluptate, eum minima, in suscipit explicabo voluptatibus harum, quibusdam ex repellat eaque!
        </h3>

        <div className="w-full h-full">
          <Swiper
            modules={[Navigation, Virtual]}
            virtual
            loop
            slidesPerView={slidesPerView}
            spaceBetween={spaceBetween}
            navigation={true}
            data-aos="fade-up"
            data-aos-delay="600"
          >
            {images.map((slide, index) => (
              <SwiperSlide key={index} virtualIndex={index}>
                <div>
                  <div className="flex items-center justify-center ">
                    <Picture src={`${API_BASE_URL}/public/Couture/${slide}`} aspect="16/19" maxHeight={600} alt={`Slide ${index + 1}`}/>
                  </div>
                  <div className="text-left pt-2 text-2xl text-gray-700">
                    SOFT LEATHER JACKET
                  </div>
                  <div className="text-left text-md text-gray-500 my-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </div>
                  <NavLink className="block text-left text-xl text-gray-700 my-2 underline underline-offset-4">
                    DÉCOUVRIR
                  </NavLink>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
