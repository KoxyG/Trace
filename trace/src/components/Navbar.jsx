import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Frame from "../assets/Frame 1.svg"


const Navbar = () => {
    return (
        <header className='p-8 flex justify-between items-center ' style={{
            backgroundImage: 'linear-gradient(to right, #FC8128 ,  #DD3654)',
        }}>
            <a href="/">
                <div className="relative flex">
                    <img src={Frame} alt="" className='text-white'/>
                </div>
            </a>
            <nav className="flex gap-8 text-white font-semibold">
        <a href="#" >Home</a>
        <a href="#" >Explore</a>
        <a href="#" >Contact us</a>
        <a href="#" >FAQ</a>

      </nav>
            <button className='!bg-[#9E2A3A] p-4 text-white hover:!bg-black transition-all duration-200 !rounded-lg'> Connect Wallet </button>
        </header>
            // <WalletMultiButton className='!bg-[#9E2A3A] hover:!bg-[#9E2A3A] transition-all duration-200 !rounded-lg' />
    );
};

export default Navbar;