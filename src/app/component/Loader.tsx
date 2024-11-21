import { BiLoader } from "react-icons/bi";

const Loader = () => {
  return <BiLoader className="w-full h-full animate-spin text-gray-300" />;
};

export default Loader;


export const LoadingState = () => {
  return (
    <div className="flex h-full w-1/3 mx-auto items-center justify-center ">
      <BiLoader className="w-full h-full animate-spin text-gray-300" />
    </div>
  )
}


export const LoaderPulse = () => {
  return (
    <div className="animate-pulse space-y-4 p-4 lg:p-60 ">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  )
}
