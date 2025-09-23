import { Checkbox, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import { motion } from "framer-motion";
import { useState } from 'react';
import { NavLink } from 'react-router';
import { API_BASE_URL } from '../utils/api';

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
]

export function Shop() {
  return (
    <div className="min-h-screen bg-stone-50 w-full pt-20 flex justify-center p-6">
      <div className="max-w-[500px] md:max-w-full md:flex md:space-x-6">
        <MainContent />
        <SideBar />
      </div>
    </div>
  );
}

export function Seller({title, price}) {
  return (
    <div className="w-full px-1">
      <div className="w-full text-xl mt-2">{title}</div>
      <div className="w-full h-[30px] overflow-hidden">
        <div className="w-full h-[30px] group-hover:-translate-y-[30px] transition-all duration-300">
          <div className="h-[30px] flex items-center">{price}</div>
          <button className="h-[30px] flex items-center hover:underline unserline-offset-2 cursor-pointer">Ajouter au Panier</button>
        </div>
      </div>
    </div>
  );
}

function MainContent() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 max-w-5xl">
        {images.map((item, index) => (
          <NavLink to="produit" key={index} className="group flex items-center flex-col m-3">
            <img src={`${API_BASE_URL}/public/Couture/${item}`} className="aspect-14/19 object-cover" />
            <Seller title="Titre" price="Prix" />
          </NavLink>
        ))}
      </div>
      <PageChanger />
    </div>
  );
}

export function PageChanger() {

  return (
    <div className="py-10 flex justify-center">
      <div className="flex w-fit font-sans space-x-1">
        <button className="bg-black text-white cursor-pointer w-6 h-8 text-center"><div className="mt-1" >1</div></button>
        <button className="hover:bg-gray-200 cursor-pointer w-6 h-8 text-center"><div className="mt-1" >2</div></button>
        <button className="hover:bg-gray-200 cursor-pointer w-6 h-8 text-center"><div className="mt-1" >3</div></button>
        <button className="hover:bg-gray-200 cursor-pointer w-6 h-8 text-center"><div className="mt-1" >4</div></button>
        <button className="hover:bg-gray-200 cursor-pointer w-6 h-8 text-center"><div className="mt-1" >5</div></button>
      </div>
    </div>
  ); 
}

function SideBar() {

  const [colorOpen, setColorOpen] = useState(true);
  const [sizeOpen, setSizeOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [brandOpen, setBrandOpen] = useState(true);

  return (
    <div className="">
      <div className="text-lg md:w-[180px] lg:w-[260px] font-sans mt-4">
        <h2 className="font-medium">AFFICHER PAR CATÉGORIE :</h2>
        <button className="block cursor-pointer hover:underline underline-offset-2">Tous</button>
        <button className="block cursor-pointer hover:underline underline-offset-2">Homme</button>
        <button className="block cursor-pointer hover:underline underline-offset-2">Femme</button>
        <button className="block cursor-pointer hover:underline underline-offset-2">Accessoires</button>
        <button className="block cursor-pointer hover:underline underline-offset-2">Arrivages</button>
        <button className="block cursor-pointer hover:underline underline-offset-2">Nouveau Achat</button>
      </div>
      <div className="font-sans mt-8">
        <h2 className="text-lg font-medium">FILTRER :</h2>
        <div className="mt-8 space-y-8">
          <Disclosure defaultOpen>
            <div>
              <div className="flex justify-between">
                <h3 className="text-gray-500 text-2xl">Couleur</h3>
                <DisclosureButton className="group" onClick={() => setColorOpen(!colorOpen)}>
                  <motion.div 
                    className="block size-6 group-data-open:hidden text-gray-500"
                    initial={false}
                    animate={{rotate: colorOpen ? 180 : 0}}
                    transition={{duration: 0.2}}
                  >
                    <PlusIcon className='size-6'/>
                  </motion.div>
                  <motion.div 
                    className="hidden size-6 group-data-open:block text-gray-500"
                    animate={{rotate: colorOpen ? 180 : 0}}
                    transition={{duration: 0.2}}
                  >
                    <MinusIcon className='size-6'/>
                  </motion.div>
                </DisclosureButton>
              </div>
              <DisclosurePanel>
                <div className="flex flex-col space-y-5 py-3 mt-2">
                  <div className="flex space-x-2 border border-stone-300 text-xl p-2 text-gray-600">
                    <Checkbox className="group size-6 border bg-green-600">
                      <svg className="stroke-black opacity-0 group-data-checked:opacity-100" viewBox="0 0 14 14" fill="none">
                        <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Checkbox>
                    <span>Vert (N)</span>
                  </div>
                  <div className="flex space-x-2 border border-stone-300 text-xl p-2 text-gray-600">
                    <Checkbox className="group size-6 border bg-orange-600">
                      <svg className="stroke-black opacity-0 group-data-checked:opacity-100" viewBox="0 0 14 14" fill="none">
                        <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Checkbox>
                    <span>Orange (N)</span>
                  </div>
                  <div className="flex space-x-2 border border-stone-300 text-xl p-2 text-gray-600">
                    <Checkbox className="group size-6 border bg-blue-600">
                      <svg className="stroke-black opacity-0 group-data-checked:opacity-100" viewBox="0 0 14 14" fill="none">
                        <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Checkbox>
                    <span>Bleu (N)</span>
                  </div>
                  <div className="flex space-x-2 border border-stone-300 text-xl p-2 text-gray-600">
                    <Checkbox className="group size-6 border bg-amber-600">
                      <svg className="stroke-black opacity-0 group-data-checked:opacity-100" viewBox="0 0 14 14" fill="none">
                        <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Checkbox>
                    <span>Maron (N)</span>
                  </div>
                </div>
              </DisclosurePanel>
            </div>
          </Disclosure>
          <Disclosure defaultOpen>
            <div>
              <div className="flex justify-between">
                <h3 className="text-gray-500 text-2xl">Taille</h3>
                <DisclosureButton className="group" onClick={() => setSizeOpen(!sizeOpen)}>
                  <motion.div 
                    className="block size-6 group-data-open:hidden text-gray-500"
                    initial={false}
                    animate={{rotate: sizeOpen ? 180 : 0}}
                    transition={{duration: 0.2}}
                  >
                    <PlusIcon className='size-6'/>
                  </motion.div>
                  <motion.div 
                    className="hidden size-6 group-data-open:block text-gray-500"
                    animate={{rotate: sizeOpen ? 180 : 0}}
                    transition={{duration: 0.2}}
                  >
                    <MinusIcon className='size-6'/>
                  </motion.div>
                </DisclosureButton>
              </div>
              <DisclosurePanel>
                <div className="flex flex-col space-y-5 py-3 mt-2">
                  <button className="flex space-x-2 border border-stone-300 text-xl p-2 text-gray-600 cursor-pointer hover:border-gray-900">
                    <span>XS (N)</span>
                  </button>
                  <button className="flex space-x-2 border border-stone-300 text-xl p-2 text-gray-600 cursor-pointer hover:border-gray-900">
                    <span>S (N)</span>
                  </button>
                  <button className="flex space-x-2 border border-stone-300 text-xl p-2 text-gray-600 cursor-pointer hover:border-gray-900">
                    <span>M (N)</span>
                  </button>
                  <button className="flex space-x-2 border border-stone-300 text-xl p-2 text-gray-600 cursor-pointer hover:border-gray-900">
                    <span>L (N)</span>
                  </button>
                </div>
              </DisclosurePanel>
            </div>
          </Disclosure>
          <Disclosure defaultOpen>
            <div>
              <div className="flex justify-between">
                <h3 className="text-gray-500 text-2xl">Prix</h3>
                <DisclosureButton className="group" onClick={() => setPriceOpen(!priceOpen)}>
                  <motion.div 
                    className="block size-6 group-data-open:hidden text-gray-500"
                    initial={false}
                    animate={{rotate: priceOpen ? 180 : 0}}
                    transition={{duration: 0.2}}
                  >
                    <PlusIcon className='size-6'/>
                  </motion.div>
                  <motion.div 
                    className="hidden size-6 group-data-open:block text-gray-500"
                    animate={{rotate: priceOpen ? 180 : 0}}
                    transition={{duration: 0.2}}
                  >
                    <MinusIcon className='size-6'/>
                  </motion.div>
                </DisclosureButton>
              </div>
              <DisclosurePanel>
                <div className="flex flex-col space-y-5 py-3 mt-2 text-lg">
                  <button className="flex space-x-2 border border-stone-300 p-2 text-gray-600 cursor-pointer hover:border-gray-900">
                    <span>Moins de 5000 F CFA (N)</span>
                    
                  </button>
                  <button className="flex space-x-2 border border-stone-300 p-2 text-gray-600 cursor-pointer hover:border-gray-900">
                    <span>5000 - 10 000 F CFA (N)</span>
                  </button>
                  <button className="flex space-x-2 border border-stone-300 p-2 text-gray-600 cursor-pointer hover:border-gray-900">
                    <span>10 000 - 30 000 F CFA (N)</span>
                  </button>
                  <button className="flex space-x-2 border border-stone-300 p-2 text-gray-600 cursor-pointer hover:border-gray-900">
                    <span>30 000 - 60 000 F CFA (N)</span>
                  </button>
                </div>
              </DisclosurePanel>
            </div>
          </Disclosure>
          <Disclosure defaultOpen>
            <div>
              <div className="flex justify-between">
                <h3 className="text-gray-500 text-2xl">Marque</h3>
                <DisclosureButton className="group" onClick={() => setBrandOpen(!brandOpen)}>
                  <motion.div 
                    className="block size-6 group-data-open:hidden text-gray-500"
                    initial={false}
                    animate={{rotate: brandOpen ? 180 : 0}}
                    transition={{duration: 0.2}}
                  >
                    <PlusIcon className='size-6'/>
                  </motion.div>
                  <motion.div 
                    className="hidden size-6 group-data-open:block text-gray-500"
                    animate={{rotate: brandOpen ? 180 : 0}}
                    transition={{duration: 0.2}}
                  >
                    <MinusIcon className='size-6'/>
                  </motion.div>
                </DisclosureButton>
              </div>
              <DisclosurePanel>
                <div className="flex flex-col space-y-5 py-3 mt-2 text-lg">
                  <button className="flex space-x-2 border border-stone-300 p-2 text-gray-600 cursor-pointer hover:border-gray-900">
                    <span>MARQUE (N)</span>
                    
                  </button>
                  <button className="flex space-x-2 border border-stone-300 p-2 text-gray-600 cursor-pointer hover:border-gray-900">
                    <span>MARQUE (N)</span>
                  </button>
                  <button className="flex space-x-2 border border-stone-300 p-2 text-gray-600 cursor-pointer hover:border-gray-900">
                    <span>MARQUE (N)</span>
                  </button>
                  <button className="flex space-x-2 border border-stone-300 p-2 text-gray-600 cursor-pointer hover:border-gray-900">
                    <span>MARQUE (N)</span>
                  </button>
                </div>
              </DisclosurePanel>
            </div>
          </Disclosure>
        </div>
      </div>
    </div>
  );
}
