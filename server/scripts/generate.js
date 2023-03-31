console.log(
    'Use these 3 wallets to play with, \nbecause they have been assigned some dummy money:\n\nWallet1: private key: fd5d2ce3e5b050ed07644212be16fd0e7e28520ae1fb68a6694283d9b29c20d4\naddress:0x530adb5a1dc9c904bd8956871304ca70233e5c4f\n\nWallet2:private key: bd7b7f8f584fa5ba3dd237e6301f74e26371c093f9c8073b20764fa40122bbb2\naddress:0x2c0e099e6dea6c4f0a54cf134f5be5603ef9e45b\n\nWallet3:private key: 0cdf513b136a9d71b1294bd525af682a1ecdf10dd733f55b1d6d5cb6d305f3c6\naddress:0xa58f49b0654799697103f5035a13781566af52e0\n\nNEW GENERATED WALLET:\n'
)

const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp.utils.randomPrivateKey();
console.log('private key:', toHex(privateKey));

const publicKey = secp.getPublicKey(privateKey);
console.log('public key:', toHex(publicKey));

const address = keccak256(publicKey.slice(1)).slice(-20);
console.log('address:0x'+toHex(address));
