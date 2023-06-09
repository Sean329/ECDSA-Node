import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [nonce, setNonce] = useState(0);

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        nonce = {nonce}
        setNonce = {setNonce}
      />
      <Transfer setBalance={setBalance} setNonce = {setNonce} address={address} />
    </div>
  );
}

export default App;
