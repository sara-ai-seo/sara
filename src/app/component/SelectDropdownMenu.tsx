import { Menu, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { IoChevronDownOutline } from "react-icons/io5"

export function SelectorDropdownMenu({ items, icon, selected, setSelected }: { items: any[], icon?: React.ReactNode, selected: string, setSelected: (e:any) => void }) {
    return (
      <Menu as="div" className="  relative inline-block text-left">
  
        <Menu.Button className="inline-flex w-full justify-between rounded-lg text-black p-3 text-sm font-medium border focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
         {icon} {selected}
  
          <IoChevronDownOutline
            className="-mr-1 ml-2 h-5 w-5 text-black"
            aria-hidden="true"
          />
        </Menu.Button>
  
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-50 right-0 mt-20 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
              {
                items.map((prop) => {
                  return <Menu.Item key={prop}>
                    {({ active }) => (
                      <button
                        className={`${active ? 'bg-primary text-white' : 'text-gray-900'
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        onClick={setSelected}
                      >
  
                        {prop}
                      </button>
                    )}
                  </Menu.Item>
                })
              }
  
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    )
  }