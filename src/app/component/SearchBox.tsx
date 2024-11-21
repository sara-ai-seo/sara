import { CiSearch } from "react-icons/ci";

interface Props {
value: string;
setValue: (e: any)=> void;
placeholder?: string;
}
export default function SearchBox({value, setValue, placeholder}: Props) {
  return (
    <div className="flex">
    <div className="flex relative rounded-md w-[320px]  ">
      <input type='search' className="w-full h-full border p-3 rounded-md focus:outline-none focus:shadow-sm focus:shadow-primary pl-10 " onChange={(e)=> setValue(setValue(e.target.value))} placeholder={placeholder} />
      <CiSearch className=' absolute top-4 left-4 ' />

    </div>
  </div>
  )
}
