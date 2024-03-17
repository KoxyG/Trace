import "@/styles/globals.css";
import WalletContextProvider from "@/context/WalletContextProvider.jsx";
import TransitionContextProvider from "@/context/TransitionContextProvider.jsx";
import Navbar from "@/components/Navbar.jsx";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <WalletContextProvider>
        <Navbar />
        <ToastContainer />

        <TransitionContextProvider>
          <Component {...pageProps} />
        </TransitionContextProvider>
      </WalletContextProvider>
    </>
  );
}
