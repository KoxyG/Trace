import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import trace from "/public/trace.png"


const Navbar = () => {
    return (
        <nav className='p-4 flex justify-between items-center bg-[#FC8128]'>
            <a href="/">
                <div className="relative">
                    <img src="/trace.png" width="150" className="transition-transform duration-200 transform hover:scale-100 hover:cursor-pointer" alt="trace logo" />
                    <img src="/trace.png" width="60" className="absolute top-0 left-0 opacity-0 transition-opacity duration-200 transform hover:opacity-100 hover:cursor-pointer" alt="Trace logo" />
                </div>
            </a>

            <WalletMultiButton className='!bg-[#9E2A3A] hover:!bg-[#9E2A3A] transition-all duration-200 !rounded-lg' />
        </nav>
    );
};

export default Navbar;