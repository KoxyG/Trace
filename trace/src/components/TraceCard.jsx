import React from "react";

const TraceCard = () => {
  return (
    <section>
      <div className="flex justify-center items-center">
        <div
          className="border-r rounded"
          style={{
            border: "none", // remove default border
            backgroundImage: "linear-gradient(to right, #FC8128 , #DD3654)",
            width: "40%",
            height: "40%",
            padding: "15px",
            borderRadius: "7px"
          }}
        >
          <h1 className="flex justify-center text-white capitalize">
            what is trace?
          </h1>
          <p className="mt-3 text-white">
            Welcome to decentralized web3 wallet proof-of-funds. Trace is an
            innovative platform that alllow users to easily demonstrate
            ownership of specific cryptocurrency holdings without compromising
            their privacy. With Trace you can confidently verify your funds
            without revealing sensitive wallet or transaction details.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TraceCard;
