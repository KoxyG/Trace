import React from 'react'
import Image5 from "@/assets/image 5.svg"
import Image6 from "@/assets/image 6.svg"
import Image7 from "@/assets/image 7.svg"


import Image from "next/image"

const card = [
    {
        id: 1,
        image: Image5 ,
        text: "As a web3 worker applying for loan on a DeFi platform, I use Trace to prove I have  sufficients funds as collateral without revealing my private key."

    },
    {
        id: 2,
        image: Image5 ,
        text: "As a web3 worker applying for loan on a DeFi platform, I use Trace to prove I have  sufficients funds as collateral without revealing my private key."

    },
    {
        id: 3,
        image: Image5 ,
        text: "As a web3 worker applying for loan on a DeFi platform, I use Trace to prove I have  sufficients funds as collateral without revealing my private key."

    }
]
const UserStory = () => {
  return (
    <section>
    <div className='flex justify-center items-center mt-8 text-white'>User's Story</div>
    <div className='flex justify-around mt-8'>
    <div className='bg-[#F06538] p-5  rounded-lg'>
                    <Image src={Image5}/>
                    <p className='text-white w-[250px] flex text-[15px] justify-center items-center mt-4'>As a web3 worker applying for loan on a DeFi platform, I use Trace to prove I have  sufficients funds as collateral without revealing my private key</p>
            
        </div>
        <div className='bg-[#F06538] p-5  rounded-lg'>
                    <Image src={Image6}/>
                    <p className='text-white w-[250px] flex text-[15px] justify-center items-center mt-4'>As a freelancer in a decentralized marketplace, I use Trace to showcase my financial credibility to potential clients by proving I hold the required amount of project tokens.</p>
            
        </div>
        <div className='bg-[#F06538] p-5  rounded-lg'>
                    <Image src={Image7}/>
                    <p className='text-white w-[250px] flex text-[15px] justify-center items-center mt-4'>As a freelancer in a decentralized marketplace, I use Trace to showcase my financial credibility to potential clients by proving I hold the required amount of project tokens.</p>
            
        </div>
    </div>
    <div className='flex justify-center items-center mt-[50px]'>
    <button className='bg-[#9E2A3A] p-4 text-white w-[300px] hover:!bg-black transition-all duration-200 !rounded-lg '> Generate Wallet Proof of Funds </button>
    </div>
    <div className='ml-[150px] mt-[30px] text-[20px] text-white'>
        <h1>Security & Privacy</h1>
    </div>
    
    
    </section>
  )
}

export default UserStory