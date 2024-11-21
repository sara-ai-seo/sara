import { setUser } from "@/redux/features/userSlice"
import { PropertyType } from "@/types/PropertyType"
import { Menu, Transition } from "@headlessui/react"
import { useRouter } from "next/navigation"
import { Fragment } from "react"
import { FaRegUserCircle } from "react-icons/fa"
import { IoChevronDownOutline } from "react-icons/io5"
import { useDispatch } from "react-redux"

export default function UserProfile() {
    const router = useRouter()
    const dispatch = useDispatch()
  return (
    <div className="  text-right">
      <Menu as="div" className="  relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-between text-black p-3 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
          <div className="">
                  <FaRegUserCircle className="rounded-full text-3xl" />
                </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
           
            <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-primary text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={()=>{
                        sessionStorage.removeItem('user')
                        dispatch(setUser({id: 0,
                          email: "",
                          fullName: "",
                          account_type: "",
                          createdAt: "",
                          updatedAt: ""}))
                        router.push('/login')
                    } }
                  >
                    Logout
                    
                  </button>
                )}
              </Menu.Item>
              
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
