const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const { toHex } = require("ethereum-cryptography/utils");

app.use(cors());
app.use(express.json());

const balances = {
  "0x530adb5a1dc9c904bd8956871304ca70233e5c4f": 10000,
  "0x2c0e099e6dea6c4f0a54cf134f5be5603ef9e45b": 5000,
  "0xa58f49b0654799697103f5035a13781566af52e0": 7500,
};

const nonces = {

};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  const nonce = nonces[address] || 0;
  res.send({ balance, nonce });
});

app.post("/send", (req, res) => {
  const { sender,signature, recoveryBit, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);
  setInitialNonce(sender);

  const message = 'I consent this transaction--' + nonces[sender];
  const hashedMsg = keccak256(utf8ToBytes(message));

  const pubKey = secp.recoverPublicKey(hashedMsg, signature, parseInt(recoveryBit));
  const recoveredAddress = "0x"+ toHex(keccak256(pubKey.slice(1)).slice(-20));


  if (recoveredAddress !== sender) {
    res.status(400).send({ message: "The signature verification failed! Recovered Address is " + recoveredAddress + "; Sender is: " + sender });
  }
  else if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    nonces[sender] += 1;
    res.send({ balance: balances[sender] , nonce: nonces[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

function setInitialNonce(address) {
  if (!nonces[address]) {
    nonces[address] = 0;
  }
}
