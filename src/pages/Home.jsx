import { ArrowPathIcon, CalendarIcon, GiftIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { NouvellesCollections } from "./Home/NouvellesCollections";
import { NavLink } from "react-router";
import { Picture } from "../components/Picture";


const images = [
  '20644ae4-a80a-4f10-8e90-88113fd781bc.jpeg',
  '1041c0ab-692c-45ce-97e0-1b1b54041565.jpeg',
  '1a9dd17c-11e7-492e-958b-e62c76322283.jpeg',
]

export function HomePage() {
  return (
    <>
      <NouvellesCollections />
      <div className="h-[900px]">
        <div className="flex justify-around mt-16">
          <div className="flex flex-col items-center w-50 text-center">
            <CalendarIcon className="size-13 text-gray-500"/>
            <div className="text-2xl pt-5 pb-2 text-gray-600">Prenez Rendez-Vous</div>
            <div className="text-gray-600">
              At imperdiet dui accumsan sit amet nulla risus est ultricies quis.
            </div>
          </div>
          <div className="flex flex-col items-center w-50 text-center">
            <ShoppingBagIcon className="size-13 text-gray-500"/>
            <div className="text-2xl pt-5 pb-2 text-gray-600">Shoping</div>
            <div className="text-gray-600">
              At imperdiet dui accumsan sit amet nulla risus est ultricies quis.
            </div>
          </div>
          <div className="flex flex-col items-center w-50 text-center">
            <GiftIcon className="size-13 text-gray-500"/>
            <div className="text-2xl pt-5 pb-2 text-gray-600">Packet Spécial</div>
            <div className="text-gray-600">
              At imperdiet dui accumsan sit amet nulla risus est ultricies quis.
            </div>
          </div>
          <div className="flex flex-col items-center w-50 text-center">
            <ArrowPathIcon className="size-13 text-gray-500"/>
            <div className="text-2xl pt-5 pb-2 text-gray-600">Retour Global Gratuit</div>
            <div className="text-gray-600">
              At imperdiet dui accumsan sit amet nulla risus est ultricies quis.
            </div>
          </div>
        </div>

        <div className="flex justify-around mt-30 px-10">
          <NavLink to="#">
            <Picture src={`http://localhost:8080/public/Couture/${images[0]}`} aspect="10/11" maxHeight={370} />
            <div className="pt-1 text-gray-500">Boutique Homme</div>
          </NavLink>
          <NavLink to="#">
            <Picture src={`http://localhost:8080/public/Couture/${images[1]}`} aspect="10/11" maxHeight={370} />
            <div className="pt-1 text-gray-500">Boutique Femme</div>
          </NavLink>
          <NavLink to="#">
            <Picture src={`http://localhost:8080/public/Couture/${images[2]}`} aspect="10/11" maxHeight={370} />
            <div className="pt-1 text-gray-500">Accessoires</div>
          </NavLink>
        </div>
      </div>
    </>
  );
}
