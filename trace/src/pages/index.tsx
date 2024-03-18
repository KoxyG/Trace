import * as React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  DocumentTextIcon,
  CubeTransparentIcon,
} from "@heroicons/react/outline";
// library we use to interact with the solana json rpc api
import * as web3 from "@solana/web3.js";
import Image from "next/image";
import { list } from "postcss";

const Home = () => {
  // react state variables
  const [parseHistoryUrl, setParseHistoryUrl] = React.useState<string>("");
  const [listOfTxs, setListOfTxs] = React.useState<any[]>([]);
  const [displayDetails, setDisplayDetails] = React.useState<boolean>(false);
  const [verified, setVerified] = React.useState<boolean>(false);
  const [transactionDetails, setTransactionDetails] = React.useState<{}>({});
  const [balance, setBalance] = React.useState<number>(0);
  const [amount, setAmount] = React.useState<number | null>(0);
  const [txSig, setTxSig] = React.useState<string>("");
  const { connection } = useConnection(); // grab wallet connection string
  const { publicKey } = useWallet(); // grab wallet pubkey

  const HELIUS_API_KEY = "846d3486-6615-4481-805c-0ad58f99958a";

  const generateExplorerLink = (walletAddress: string) => {
    return `https://solscan.io/account/${walletAddress}?cluster=devnet#portfolio`;
  };

  React.useEffect(() => {
    const assetsUrl = `https://api.helius.xyz/v0/assets?ownerAddress=${publicKey}&page=1&limit=1000&api-key=${HELIUS_API_KEY}`;
    setParseHistoryUrl(assetsUrl);
  }, [publicKey]);

  const generateProof = async () => {
    if (balance >= amount!) {
      toast.success("Proof verified and generated!");
      setVerified(true);
      // const explorerLink = generateExplorerLink(publicKey!.toBase58());
      // console.log("Explorer Link:", explorerLink);

      const assetsResponse = await fetch(parseHistoryUrl);
      const data = await assetsResponse.json();
      console.log("Assets by Owner: ", data);
      // set state of tx sigs
      setListOfTxs(data);
      console.log("parsed transaction history", data);
    } else {
      toast.error(
        "Verification failed. Insufficient funds detected for the specified amount"
      );
    }
  };

  const downloadData = () => {
    if (listOfTxs) {
      const textData = JSON.stringify(listOfTxs, null, 2);
      const blob = new Blob([textData], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Proof_of_funds.txt";
      a.click();
      URL.revokeObjectURL(url);
    } else {
      toast.error("No data to download");
    }
  };

  React.useEffect(() => {
    const getInfo = async () => {
      if (connection && publicKey) {
        // we get the account info for the user's wallet data store and set the balance in our application's state
        const info = await connection.getAccountInfo(publicKey);
        setBalance(info!.lamports / web3.LAMPORTS_PER_SOL);
      }
    };
    getInfo();
    // the code above will execute whenever these variables change in any way
  }, [connection, publicKey]);

  return (
    <main className="min-h-screen  text-white">
      {publicKey ? (
        <div className="grid grid-cols-1 bg-[#FC8128] lg:grid-cols-4 gap-4 p-4">
          <div className="col-span-1 lg:col-start-2 lg:col-end-4 rounded-lg bg-[#2a302f] h-[350px] p-4">
            <div className="mt-8 bg-[#222524] border-2 border-gray-500 rounded-lg p-2">
              <ul className="p-2">
                <li className="flex justify-between">
                  <p className="tracking-wider">Wallet is connected...</p>
                  <p className="text-helius-orange italic font-semibold">
                    {publicKey ? "yes" : "no"}
                  </p>
                </li>

                <li className="text-sm mt-4 flex justify-between">
                  <p className="tracking-wider">Balance...</p>
                  <p className="text-helius-orange italic font-semibold">
                    {balance} sol
                  </p>
                </li>
              </ul>
            </div>
            <div className="py-4">
              <h3 className="italic text-sm">Amount to proof</h3>
              <input
                id="amount"
                type="number"
                min={0}
                placeholder="Amount of SOL"
                className="text-[#9e80ff] py-1 w-full bg-transparent outline-none resize-none border-2 border-transparent border-b-white"
                onChange={(event) => {
                  const value = parseFloat(event.target.value);
                  if (!isNaN(value)) {
                    // Check if the value is a valid number
                    setAmount(value); // Update the state with the parsed number
                  } else {
                    setAmount(null); // Update the state with null if the input is not a valid number
                  }
                }}
              />
            </div>

            {!verified ? (
              <div className="flex pt-4 justify-between items-center">
                <h2 className="font-bold text-xl">Generate Proof 💸</h2>
                <button
                  onClick={generateProof}
                  disabled={!publicKey || !amount}
                  className="disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#fa6ece] bg-[#fa6ece] rounded-lg w-24 py-1 font-semibold transition-all duration-200 hover:bg-transparent border-2 border-transparent hover:border-[#fa6ece]"
                >
                  Submit
                </button>
              </div>
            ) : (
              <div className={`flex justify-center items-center ${"mt-6"}`}>
                <button
                  className="flex text-[#80ebff] italic hover:text-white transition-all duration-200"
                  onClick={downloadData}
                >
                  Download Proof
                  <DocumentTextIcon className="w-5 ml-1" />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="sm:flex ">
            <div>
              <h2 className="pt-[100px] mx-[30px] font-extrabold text-[30px] sm:text-[40px]">
                Securely Verify Cryptocurrency Holdings
              </h2>
              <p className="mx-[30px] pt-[20px]">
                Confidently demonstrate ownership of your digital assets without
                compromising privacy.
              </p>
            </div>
            <Image src={"/image.png"} alt="image" height={500} width={500} />
          </div>

          <div className="flex mb-[100px] justify-center mt-[80px] space-x-[200px]">
            <button
              onClick={() => {
                toast.error("Please connect wallet!");
              }}
              className="bg-[#9E2A3A]  rounded-lg py-1 sm:py-2 px-4 font-semibold transition-all duration-200 border-2 border-transparent hover:border-helius-orange disabled:opacity-50 disabled:hover:bg-helius-orange hover:bg-transparent disabled:cursor-not-allowed"
            >
              Generate Wallet Proof Of Funds
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
