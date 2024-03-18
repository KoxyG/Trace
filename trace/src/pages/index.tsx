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

const Home = () => {
  // react state variables
  const [parseHistoryUrl, setParseHistoryUrl] = React.useState<string>("");
  const [listOfTxs, setListOfTxs] = React.useState<any[]>([]);
  const [displayDetails, setDisplayDetails] = React.useState<boolean>(false);
  const [verified, setVerified] = React.useState<boolean>(false);
  const [transactionDetails, setTransactionDetails] = React.useState<{}>({});
  const [balance, setBalance] = React.useState<number >(0);
  const [amount, setAmount] = React.useState<number | null>(0);
  const [txSig, setTxSig] = React.useState<string>("");
  const { connection } = useConnection(); // grab wallet connection string
  const { publicKey } = useWallet(); // grab wallet pubkey

  const generateExplorerLink = (walletAddress: string) => {
    return `https://solscan.io/account/${walletAddress}?cluster=devnet#portfolio`;
  };

  const generateProof = async () => {
    if (balance >= amount!) {
      toast.success("Proof verified and generated!");
      setVerified(true);
      const explorerLink = generateExplorerLink(publicKey!.toBase58());
      console.log("Explorer Link:", explorerLink);

      // api call to get tx history for wallet
      const response = await fetch(explorerLink);
      const data = await response.json();

      // set state of tx sigs
      setListOfTxs(data);
      console.log("parsed transaction history", data);
    } else {
      toast.error(
        "Verification failed. Insufficient funds detected for the specified amount"
      );
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
    <main className="min-h-screen text-white">
      {publicKey ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4">
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
                    {balance}
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
            <div
              className={`flex justify-center items-center ${
               "mt-6"
              }`}
            >
             
              <button
                className="flex text-[#80ebff] italic hover:text-white transition-all duration-200"
                
              >
                Download Proof
                <DocumentTextIcon className="w-5 ml-1" />
              </button>
            </div>
            )}
          </div>
         
        </div>
      ) : (
        <div className="flex justify-center space-x-[200px]">
          <h2 className="text-lg sm:text-2xl font-semibold">
            Transaction Viewer 👀
          </h2>
          <button
            onClick={() => {
              toast.error("Please connect wallet!");
            }}
            className="bg-helius-orange rounded-lg py-1 sm:py-2 px-4 font-semibold transition-all duration-200 border-2 border-transparent hover:border-helius-orange disabled:opacity-50 disabled:hover:bg-helius-orange hover:bg-transparent disabled:cursor-not-allowed"
          >
            Call Transactions
          </button>
        </div>
      )}
    </main>
  );
};

export default Home;
