import { NavLink, useLocation, useMatch } from "react-router";
import { useAuth } from "./hooks/useAuth";
import { Disclosure, DisclosurePanel, DisclosureButton, Menu, MenuButton, MenuItem, MenuItems, CloseButton, Popover, PopoverButton, PopoverPanel, ComboboxInput, Combobox, ComboboxButton } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid'
import { MagnifyingGlassIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from "react";
import { Mnav } from "./components/Components";


const navigation = [
  { name: 'ACCUEIL', href: '/', current: true },
  { name: 'VÊTEMENTS', href: '/shop', current: false, subNavigation: [
    {name: 'VÊTEMENTS HOMME', href: '#', current: false},
    {name: 'VÊTEMENTS FEMME', href: '#', current: false},
    {name: 'ACCESSOIRES', href: '#', current: false},
  ] },
  { name: 'BLOG', href: '/blog', current: false },
  { name: 'CONTACTS', href: '#', current: false },
]


export function Navbar() {
  const {isAuthenticated, logout} = useAuth();
  const {pathname} = useLocation();
  const [scrollY, setScrollY] = useState(0);
  const isMatch = ['/blog', '/blog/', '/shop', '/shop/'].includes(pathname);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Disclosure as="nav" className="top-0 left-0 w-full border-b-[1px] border-stone-600 text-gray-500 transition-colors duration-600 ease-out z-50"
      style={
        isMatch ? 
          {
            background: scrollY < 220 ? "transparent" : "black",
            position: "fixed",
            color: "white",
          } :
          {
            position: "relative",
            borderColor: "#e7e5e4",
          } 
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <DisclosureButton className="group hover:bg-gray-200 p-2 sm:hidden">
            <Bars3Icon className="block size-6 group-data-open:hidden"/>
            <XMarkIcon className="hidden size-6 group-data-open:block"/>
          </DisclosureButton>
          <NavLink className="flex text-3xl sm:text-xl md:text-3xl flex-col items-center leading-none" to='/'>
            <span>DJOLOF</span>
            <span className="text-sm">SHOP</span>
          </NavLink>
          <div className="hidden sm:flex items-center text-lg lg:space-x-15 md:space-x-4 sm:space-x-0">
            {navigation.map((item) => (
              item.subNavigation ?
                <div key={item.name} className="relative group">
                  <NavLink to={item.href} className="hover:text-stone-400 px-3 py-2"
                  >{item.name}</NavLink>
                  <div className="absolute hidden w-max text-stone-600 group-hover:block bg-gray-200/95 shadow-sm z-10 text-base">
                    {item.subNavigation.map((subItem) => (
                      <a key={subItem.name} href={subItem.href} className="hover:text-stone-950 block px-4 py-2">{subItem.name}</a>
                    ))}
                  </div>
                </div>
                :
                <NavLink key={item.name} to={item.href} className="hover:text-stone-400 px-3 py-2">{item.name}</NavLink>
            ))}
          </div>
          <div className="flex items-center space-x-3">
            <Mnav to="/blog/search">
              <MagnifyingGlassIcon className="hover:text-stone-400 h-6 w-6" />
            </Mnav>
            <ShoppingCartIcon className="hover:text-stone-400 h-6 w-6"/>
            <Menu as="div" className="relative">
              <MenuButton className="gap-x-1 px-3 py-3 rounded-xs hover:bg-gray-200">
                <UserIcon className="h-6 w-6" />
              </MenuButton>
              <MenuItems anchor="bottom end" className="bg-gray-200/95 p-3 flex flex-col">
                <MenuItem>
                  <NavLink to="/login" className="block py-2">COMPTE</NavLink>
                </MenuItem>
                <MenuItem>
                  <button className="pointer" onClick={logout}>LOGOUT</button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        {({close}) => (
          <div className="space-y-3 px-6 pb-3 text-xl">
            {navigation.map((item) => (
              item.subNavigation ? 
                <Disclosure as="div" key={item.name} className="space-y-1">
                  <div className="flex items-center">
                    <NavLink to={item.href} className="hover:text-stone-900" onClick={close}>{item.name}</NavLink>
                    <span className="mx-1 px-0.5 hover:bg-gray-300">
                      <DisclosureButton as="div" className="group">
                        <ChevronDownIcon className="block size-6 group-data-open:hidden" ></ChevronDownIcon>
                        <ChevronUpIcon className="hidden size-6 group-data-open:block" ></ChevronUpIcon>
                      </DisclosureButton>
                    </span>
                  </div>
                  <DisclosurePanel as="div" className="px-4 space-y-1">
                    {item.subNavigation.map((subItem) => (
                      <CloseButton key={subItem.name} as={NavLink} to={subItem.href} className="hover:text-stone-900 block" onClick={() => close()}>{subItem.name}</CloseButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                :
                <CloseButton key={item.name} as={NavLink} to={item.href} className="hover:text-stone-900 block">{item.name}</CloseButton>
            ))}
          </div>
        )}
      </DisclosurePanel>
    </Disclosure>
  );
}
