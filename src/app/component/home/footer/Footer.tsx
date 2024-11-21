import { currentYear } from '@/app/utils/currenYear'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export default function Footer() {
  return (
    <section className="min-h-[437px] pt-16 pb-2 md:pb-12 p-4 lg:px-[112px] flex  items-between gap-16 w-full flex-col justify-end bg-footerBlue text-white">
                   <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 w-full">
                         <div className={`flex-2 flex pb-12 pt-1 md:pb-0 col-span-2 flex-col gap-2`}>
                              <Image src={`/home/white-logo.png`} width={125} height={24} alt="Webmaxi Logo" />
                              <p className='pt-2  md:pt-8 font-normal text-base'> Your website’s success starts with us!</p>
                         </div>
                         <div className={`flex flex-col gap-2 h-full justify-start sm:pt-6 md:pt-1 `}>
                            <Link href={`#`} className=' font-semibold text-sm  '> Products</Link>
                            <Link href={`#`} className='text-gray-300  hover:text-white'> Overview</Link>
                            <Link href={`#`} className='text-gray-300  hover:text-white'> Features</Link>
                            <Link href={`#`} className='text-gray-300  hover:text-white'> Tutorials</Link>
                            <Link href={`#`} className='text-gray-300  hover:text-white'> Pricing</Link>
                            <Link href={`#`} className='text-gray-300  hover:text-white'> Releases</Link>
                         </div>
                         <div className={`flex flex-col gap-2 h-full justify-start sm:pt-6 md:pt-1`}>
                            <Link href={`#`} className='text-[#F2F4F7] font-semibold text-sm '> Company</Link>
                            <Link href={`#`} className='text-gray-300  hover:text-white'> About us</Link>
                            <Link href={`#`} className='text-gray-300  hover:text-white'> Careers</Link>
                            <Link href={`#`} className='text-gray-300  hover:text-white'> News</Link>
                            <Link href={`#`} className='text-gray-300  hover:text-white'> Media kit</Link>
                            <Link href={`#`} className='text-gray-300  hover:text-white'> Contact</Link>
                         </div>
                         <div className={`flex flex-col justify-start gap-2 h-full items-start sm:pt-6 md:pt-1`}>
                            <Link href={`#`} className='text-[#F2F4F7] font-semibold text-sm '> Resources</Link>
                            <Link href={`#`} className='text-gray-300  hover:text-white'> Blog</Link>
                            <Link href={`#`} className='text-gray-300  hover:text-white'> Events</Link>
                            <Link href={`#`} className='text-gray-300  hover:text-white'> Support</Link>
                            <Link href={`#`} className='text-gray-300  hover:text-white'> Documentation</Link>
                         </div>
                         <div className={`flex flex-col gap-2 h-full items-start sm:pt-6 md:pt-1`}>
                            <Link href={`#`} className='text-[#F2F4F7] font-semibold text-sm '> Legal</Link>
                            <Link href={`#`} className='text-gray-300 hover:text-white'> Terms and conditions</Link>
                            <Link href={`#`} className='text-gray-300 hover:text-white'> Privacy policy</Link>
                            <Link href={`#`} className='text-gray-300 hover:text-white'> Cookies</Link>
                         </div>
                   </div>
                   <div>
                   <hr className='pb-4' />
                    <div className={`flex flex-col-reverse gap-4 items-start lg:justify-between lg:flex-row w-full`}>
                         <p className={` text-[#F2F4F7] text-base w-full font-normal`}> &#169; {currentYear()} Webmaxi. All rights reserved. </p>
                         <div className={`flex items-center gap-6`}>
                              <Link href={``}><Image src={`/footer/x.png`} alt="Twitter image" width={24} height={24} /></Link>
                              <Link href={``}><Image src={`/footer/linkedin.png`} alt="Twitter image" width={24} height={24} /></Link>
                              <Link href={``}> <Image src={`/footer/facebook.png`} alt="Twitter image" width={24} height={24} /></Link>
                              <Link href={``}> <Image src={`/footer/instagram.png`} alt="Twitter image" width={24} height={24} /></Link>
                              <Link href={``}> <Image src={`/footer/youtube.png`} alt="Twitter image" width={24} height={24} /></Link>
                         </div>
                    </div>
                   </div>
                   
     </section>
  )
}


 {/* <div className={` flex w-full items-center justify-between`}>
                         <div className={`flex-2 flex sm:w-full flex-col gap-2`}>
                              <Image src={`/home/white-logo.png`} width={125} height={24} alt="Webmaxi Logo" />
                              <p className='pt-8 font-normal text-base'> Your website’s success starts with us!</p>
                         </div>
                         <div className={`flex flex-col gap-2 h-full justify-start `}>
                            <Link href={`#`} className='text-[#F2F4F7] font-semibold text-sm'> Products</Link>
                            <Link href={`#`} className=''> Overview</Link>
                            <Link href={`#`} className=''> Features</Link>
                            <Link href={`#`} className=''> Tutorials</Link>
                            <Link href={`#`} className=''> Pricing</Link>
                            <Link href={`#`} className=''> Releases</Link>
                         </div>
                         <div className={`flex flex-col gap-2 h-full justify-start`}>
                            <Link href={`#`} className='text-[#F2F4F7] font-semibold text-sm'> Company</Link>
                            <Link href={`#`} className=''> About us</Link>
                            <Link href={`#`} className=''> Careers</Link>
                            <Link href={`#`} className=''> News</Link>
                            <Link href={`#`} className=''> Media kit</Link>
                            <Link href={`#`} className=''> Contact</Link>
                         </div>
                         <div className={`flex flex-col justify-start gap-2 h-full items-start`}>
                            <Link href={`#`} className='text-[#F2F4F7] font-semibold text-sm'> Resources</Link>
                            <Link href={`#`} className=''> Blog</Link>
                            <Link href={`#`} className=''> Events</Link>
                            <Link href={`#`} className=''> Support</Link>
                            <Link href={`#`} className=''> Documentation</Link>
                         </div>
                         <div className={`flex flex-col gap-2 h-full items-start`}>
                            <Link href={`#`} className='text-[#F2F4F7] font-semibold text-sm'> Legal</Link>
                            <Link href={`#`} className=''> Terms and conditions</Link>
                            <Link href={`#`} className=''> Privacy policy</Link>
                            <Link href={`#`} className=''> Cookies</Link>
                         </div>
                         
                    </div> */}