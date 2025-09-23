import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Pagination, Navigation, Virtual } from 'swiper/modules';
import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, StarIcon as EmptyStar, HeartIcon } from '@heroicons/react/24/outline';
import { StarIcon as FullStar } from '@heroicons/react/24/solid';
import { Field, Label, Radio, RadioGroup } from '@headlessui/react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { Picture } from '../components/Picture.jsx'
import { Seller } from './Shop.jsx';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { NavLink } from 'react-router';

const moreImages = [
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
]

const productData = {
  images: [
    '07fdbe0e-2141-4a2c-a0b9-fa4f11ca9bdd.jpeg',
    '1041c0ab-692c-45ce-97e0-1b1b54041565.jpeg',
    '1a9dd17c-11e7-492e-958b-e62c76322283.jpeg',
    '07fdbe0e-2141-4a2c-a0b9-fa4f11ca9bdd.jpeg',
    '1041c0ab-692c-45ce-97e0-1b1b54041565.jpeg',
    '1a9dd17c-11e7-492e-958b-e62c76322283.jpeg',
  ],
  colors: [
    { code: "FF6347", name: "Rouge Tomate" },
    { code: "4682B4", name: "Bleu Acier" },
    { code: "FFD700", name: "Or" },
    { code: "6A5ACD", name: "Bleu Ardoise" },
  ],
  sizes: [ "S", "M", "L", "XL" ],
  note: 4,

  description: [
    {classe: "title", data: "Description du produit"},
    {classe: "", data: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus." },
    {classe: "list", data: [
      "Donec nec justo eget felis facilisis fermentum.",
      "Suspendisse urna viverra non, semper suscipit pede.",
      "Aliquam porttitor mauris sit amet orci."
    ]},
    {classe: "", data: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus." },
  ],
  additionalInformation: [
    {classe: "title", data: "It is Comfortable and Best"},
    {classe: "", data: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
  ],
  shipingReturn: [
    {classe: "title", data: "Politique de remboursement"},
    {classe: "", data: "Pellentesque ultrices ut sem sit amet lacinia. Sed nisi dui, ultrices ut turpis pulvinar. Sed fringilla ex eget lorem consectetur, consectetur blandit lacus varius. Duis vel scelerisque elit, et vestibulum metus. Integer sit amet tincidunt tortor. Ut lacinia ullamcorper massa, a fermentum arcu vehicula ut. Ut efficitur faucibus dui Nullam tristique dolor eget turpis consequat varius. Quisque a interdum augue. Nam ut nibh mauris."},
    {classe: "title", data: "Livraison"},
    {classe: "", data: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eros justo, accumsan non dui sit amet. Phasellus semper volutpat mi sed imperdiet. Ut odio lectus, vulputate non ex non, mattis sollicitudin purus. Mauris consequat justo a enim interdum, in consequat dolor accumsan. Nulla iaculis diam purus, ut vehicula leo efficitur at."},
    {classe: "", data: "Interdum et malesuada fames ac ante ipsum primis in faucibus. In blandit nunc enim, sit amet pharetra erat aliquet ac."}
  ],
  reviews: [
    {profile: "", note: 3.5, name: "Tom Johnson", date: "07/05/2022", review: "Vitae tortor condimentum lacinia quis vel eros donec ac. Nam at lectus urna duis convallis convallis"},
    {profile: "", note: 3.5, name: "Jenny Willis", data: "07/05/2022", review: "Vitae tortor condimentum lacinia quis vel eros donec ac. Nam at lectus urna duis convallis convallis"},
  ]
};

function Crender({cls, data}) {
  switch(cls) {
    case 'title':
      return <h1 className="text-2xl text-gray-700 pb-2">{data}</h1>
    case 'list':
    return (
        <ul className="list-disc pl-10 py-1">
          {data.map((item, i) => (
          <li key={i}>{item}</li>
          ))}
        </ul>
      );
    default:
      return <p className='py-1'>{data}</p>
  }
}

function RFormatted({data}) {
  return (
    <>
      {data.map((item, i) => (
        <Crender key={i} cls={item.classe} data={item.data} />
      ))}
    </>
  );
}

export function Product() {
  return (
    <div className="bg-stone-50 min-h-screen p-12">
      <div className="flex flex-col lg:flex-row">
        <Pictures />
        <Infos />
      </div>
      <Details />
      <SeeMore />
    </div>
  );
}

function Pictures() {
  const N = Math.min(productData.images.length, 3); // Number of images on the side
  const elementRef = useRef(null);
  const swiperRef = useRef(null);
  const [style, setStyle] = useState({ transform: 'scale(1)', transformOrigin: '50% 50%' });
  const [three, setThree] = useState(Array(N).fill().map((_, i) => i));

  const handleIndexChange = (index) => {
    if (three[0] <= index && index <= three[N-1]) {
      return;
    }
    if (three[N-1] < index) {
      const k = Math.max(0, index - (N - 1));
      const r = Array(N).fill().map((_, i) => k + i)
      setThree(r);
    }
    if (index < three[0]) {
      const k = Math.min(productData.images.length - 1, index + (N - 1));
      const r = Array(N).fill().map((_,i) => k -2 + i);
      setThree(r);
    }
  };

  const goToSlide = (index) => {
    console.log(index)
    if (swiperRef.current) {
      swiperRef.current.slideTo(index, 1000); // 1s transition
    }
  };

  const handleMouseMove = (e) => {
    const rect = elementRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100; // Relative X as percentage
    const y = ((e.clientY - rect.top) / rect.height) * 100; // Relative Y as percentage
    setStyle({ transform: 'scale(2.5)', transformOrigin: `${x}% ${y}%` });
  };

  const handleMouseLeave = () => {
    setStyle({ transform: 'scale(1)', transformOrigin: '50% 50%' }); // Reset to default
  };
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start lg:space-x-8">
      <div className="flex lg:flex-col min-w-[150px] space-x-4 lg:space-y-16 mt-8 lg:mt-0 w-fit">
        {three.map((i) => (
          <img key={i} src={`http://localhost:8080/public/Couture/${productData.images[i]}`} className="w-[140px] h-[210px] object-cover" onClick={() => goToSlide(i)}/>
        ))}
      </div>
      <div>
        <Swiper onSwiper={(swiper) => (swiperRef.current = swiper)} spaceBetween={30} effect={'fade'} pagination={{clickable: true,}} modules={[EffectFade, Pagination]} className="w-[467px] h-[700px] overflow-hidden"
          onSlideChange={(swiper) => handleIndexChange(swiper.activeIndex)}
        >
          {productData.images.map((item, index) => (
            <SwiperSlide key={index} className='pb-10'>
              <div 
                ref={elementRef}
                className="overflow-hidden w-full h-full"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  style={style}
                  src={`http://localhost:8080/public/Couture/${item}`} className="w-full h-full object-cover transition-all duration-300 ease-out" />

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

function Infos() {

  const [color, setColor] = useState({code: "", name: ""});
  const [size, setSize] = useState(productData.sizes[0]);

  return (
    <div className="flex flex-col p-12 pt-8 mt-10 lg:mt-0 space-y-1">
      <h1 className="text-7xl mb-10"> Handmade crop sweater</h1>
      <div className="flex items-center mb-2">
        {Array.from({length: 6}).map((_, i) => (
          i < productData.note ?
            <FullStar key={i} className="size-5 text-yellow-400"/> :
            <EmptyStar key={i} className="size-5 text-yellow-400"/> 
        ))}
        <span className="ml-1">(N)</span>
      </div>
      <div className="text-gray-500 text-3xl">
        20 000 F CFA
      </div>
      <div className="text-gray-500 text-lg mb-7 leading-relaxed">
        Description, tristique ullamcorper nunc egestas non. Justo, cum feugiat imperdiet nulla molestie ac vulputate scelerisque amet. Bibendum adipiscing platea blandit sit sed quam semper rhoncus. Diam ultrices maecenas consequat eu tortor. Orci, cras lectus mauris, cras egestas quam venenatis neque.
      </div>
      <div className="mb-6">
        <h2 className="text-gray-500 text-xl">Color : {color.name}</h2>
        <div className='flex space-x-1'>
          {productData.colors.map((c) => (
            <button key={c.code} onClick={() => setColor(c)} className="size-8 rounded-full border border-black flex items-center justify-center cursor-pointer hover:border-none">
              <div 
                className="border rounded-full size-7"
                style={{ backgroundColor: `#${c.code}` }}
              ></div>
            </button>
          ))}
        </div>
      </div>
          <div className="mb-6">
            <h2 className="text-gray-500 text-xl">Size :</h2>
            <div className='flex space-x-1'>
              <RadioGroup value={size} onChange={setSize} aria-label="Server size" className="flex space-x-1">
                {productData.sizes.map((plan) => (
                  <Field key={plan} className="flex items-center gap-2">
                    <Radio
                      value={plan}
                      className="group flex size-12 items-center justify-center border-2 border-gray-300 bg-white data-checked:border-gray-500"
                    >
                      <Label className="text-xl text-gray-400">{plan}</Label>
                    </Radio>
                  </Field>
                ))}
              </RadioGroup>
            </div>
          </div>
          <div className="flex space-x-4 items-end mb-7">
            <div className="flex flex-col">
              <h3 className="text-gray-500">N en stock</h3>
              <div className="flex">
                <button className="h-12 w-10 border bg-gray-100 border-gray-400 text-2xl text-gray-900 hover:bg-gray-200">-</button>
                <input className="border h-12 w-15 border-gray-300 text-center focus:outline-3 focus:outline-neutral-300/70 z-10 
                  [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
                  " type="number"/>
                <button className="h-12 w-10 bg-gray-100 text-2xl border-gray-400 border text-gray-900 hover:bg-gray-200">+</button>
              </div>
            </div>
            <button className="h-12 bg-black text-white px-3 font-medium">AJOUTER AU PANIER</button>
            <button className="h-12 bg-black text-white px-3 font-bold"><HeartIcon className="size-6"/></button>
          </div>
          <div className="mb-4">
            <span className="text-gray-500 text-lg">Categories :</span> A, B, C
          </div>
          <div className="">
            <span className="text-gray-500 text-lg">Partager :</span><span></span>
          </div>
        </div>
  );

}

function Details() {
  return (
    <TabGroup>
      <TabList className="w-full flex flex-wrap justify-center text-lg border-b-1 border-gray-300">
        {['DESCRIPTION', 'INFORMATION ADDITIONNELLE', 'LIVRAISON ET RETOUR', 'AVIS'].map((i, ind) => (
          <Tab key={ind} className="my-[-1px] px-10 py-3 data-selected:bg-stone-50 border-t-1 border-l-1 border-r-1 border-stone-50 data-hover:border-gray-300 data-selected:border-gray-300 rounded-t-md focus-visible:outline-none">{i}</Tab>
        ))}
      </TabList>
      <TabPanels className="py-12 text-lg text-gray-500">
        <TabPanel>
          <RFormatted data={productData.description}/>
        </TabPanel>
        <TabPanel>
          <RFormatted data={productData.additionalInformation}/>
        </TabPanel>
        <TabPanel>
          <RFormatted data={productData.shipingReturn} />
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols-2">
            {productData.reviews.map((r, i) => (
              <div key={i} className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 px-3 md:px-8">
                <div className="overflow-hidden rounded-full border 
                  w-[160px] h-[160px] min-w-[160px]
                  md:w-[90px] md:h-[90px] md:min-w-[90px]
                  lg:w-[120px] lg:h-[120px] lg:min-w-[120px]">
                  <img src={`http://localhost:8080/public/Couture/${productData.images[0]}`} className="object-cover w-full h-full"/>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center">
                    {Array.from({length: 6}).map((_, i) => (
                      i < r.note ?
                        <FullStar key={i} className="size-5 text-yellow-400"/> :
                        <EmptyStar key={i} className="size-5 text-yellow-400"/> 
                    ))} <span>({r.note})</span>
                  </div>
                  <div>
                    <span className="font-bold">{r.name}</span> – {r.date}
                  </div>
                  <div>
                    {r.review}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>

  );
}

function SeeMore() {
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [spaceBetween, setSpaceBetween] = useState(100);

  const swiperRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesPerView(2); // xs
      } else if (window.innerWidth < 1200){
        setSlidesPerView(3); // sm
      } else {
        setSlidesPerView(3); // defaut
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const goToSlide = (index) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index, 1000); // 1s transition
    }
  };



  return (
    <div>
      <div className="flex justify-between mt-20 items-center">
        <h1 className="text-4xl">Produits Semblables</h1>
        <NavLink className="text-md underline underline-offset-4 text-gray-700 decoration-gray-400 hover:decoration-gray-700 decoration-2">Voir tous les produits</NavLink>
      </div>

      <Swiper
        modules={[Navigation, Virtual]}
        virtual
        loop
        slidesPerView={slidesPerView}
        spaceBetween={14}
        className="mt-10"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {moreImages.map((slide, index) => (
          <SwiperSlide key={index} virtualIndex={index}>
            <div className="group">
              <Picture key={index} src={`http://localhost:8080/public/Couture/${slide}`} maxHeight={700} aspect={13/19}/>
              <Seller title="Titre" price="Prix"/>
            </div>
          </SwiperSlide>
        ))}
        <div className="group swiper-button-prev w-[87px] h-[87px] min-w-[87px] min-h-[87px] hover:bg-black rounded-full bg-transparent border border-gray-950/20" onClick={() => swiperRef.current?.slidePrev()}>
          <ArrowLeftIcon className="max-h-[40px] bg-transparent text-gray-950/20 group-hover:text-white"/>
        </div>
        <div className="group swiper-button-next w-[87px] h-[87px] min-w-[87px] min-h-[87px] hover:bg-black rounded-full bg-transparent border border-gray-950/20" onClick={() => swiperRef.current?.slideNext()}>
          <ArrowRightIcon className="max-h-[40px] bg-transparent text-gray-950/20 group-hover:text-white"/>
        </div>
      </Swiper>
      <div className="flex space-x-3 mt-8">
      </div>
    </div>
  );
}
