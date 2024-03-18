import React from 'react'
import myImage from "@/assets/image 4.svg"
import Image from 'next/image';


const MainPage = () => {
  return (
<section className='flex flex-col gap-y-8 justify-center items-center '>
            <div className='col-span-2 font-mono text-sm rounded-lg p-[50px]  w-full flex  mt-[80px] justify-between '>
                <div className='w-full'>
                <h1 className='text-white font-semibold text-4xl w-[500px] '>Securely Verify Cryptocurrency Holdings</h1>
                        <p className='w-[550px] text-xl text-white mt-7'>Confidently demonstrate ownership of your digital assets without compromising privacy.</p>
                        <button className='!bg-[#9E2A3A] p-4 text-white hover:!bg-black transition-all mt-5 duration-200 !rounded-lg'>Download App </button>                </div>
                        <div className='w-[500px] mt-[-50px]'>
                        <Image src={myImage} alt="My Image" width="500px" />
                        </div>

                    </div>
               
            </section>  )
}

export default MainPage