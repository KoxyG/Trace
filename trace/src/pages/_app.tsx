import "@/styles/globals.css";
import WalletContextProvider from "@/context/WalletContextProvider.jsx";
import TransitionContextProvider from "@/context/TransitionContextProvider.jsx";
import Navbar from "@/components/Navbar.jsx";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from 'next/head';
import MainPage from "@/components/MainPage.jsx";
import TraceCard from "@/components/TraceCard"
import UserStory from "@/components/UserStory"
import Footer from "@/components/Footer"


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
     <Head>
        <title>Trace</title>
      </Head>
      <WalletContextProvider>
        <Navbar />
        <ToastContainer />
        <MainPage/>
        <TraceCard/>
        <UserStory/>
        <Footer/>
        {/* <TransitionContextProvider>
          <Component {...pageProps} />
        </TransitionContextProvider> */}
      </WalletContextProvider>
    </>
  );
}
