const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const { toHex } = require("ethereum-cryptography/utils");
const prompt = require('prompt-sync')();

const privateKey = prompt('Private key?');
const message = prompt("What's the message to sign?");

const hashedMsg = keccak256(utf8ToBytes(message));

(async() => {
    const [signature, recoveryBit] = await secp.sign(hashedMsg, privateKey, {recovered: true});
    console.log('Your signature is: ', toHex(signature));
    console.log('The recoveryBit is: ', recoveryBit);
})()


