
import React, { useState, useEffect } from 'react';
import Loader from './Loader'


interface Props {
    text?: string;
}
export const LoadingComp = ({text}: Props) => {
  const [dots, setDots] = useState([1, 0, 0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prevDots) => {
        const newDots = [...prevDots];
        const nextIndex = prevDots.indexOf(0);
        if (nextIndex === -1) {
          newDots.forEach((_, index) => (newDots[index] = 0));
        } else {
          newDots[nextIndex] = 1;
        }
        return newDots;
      });
    }, 500); 
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className=' font-semibold text-primary flex'>
      {text ? text : "Loading" }
      {[...Array(3)].map((_, index) => (
        <span key={index} style={{ opacity: dots[index] }}>
          {/* <Dot /> */}.
        </span>
      ))}
    </div>
  );
};



export default function FullpageLoader({children}:{children: React.ReactNode}) {
  return (
    <div className='h-full w-full py-[50%] flex items-center justify-center flex-col gap-6'>
       <div className='h-14 w-14 2xl:h-20 2xl:w-20'>  <Loader /></div>
       {children}
    </div>
  )
}
