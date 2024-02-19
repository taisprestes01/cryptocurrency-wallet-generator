const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

//define the network
const network = bitcoin.networks.mainnet;// testnet or mainnet
const path = "m/49'/0'/0'/0/0";// use "m/49'/1'/0'/0/0" for testnet

//generate mnemonic
const mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

let root = bip32.fromSeed(seed, network);

let account = root.derivePath(path);
let node = account.derive(0).derive(0);

let btcAddress = bitcoin.payments.p2wpkh({ pubkey: node.publicKey, network }).address;

console.log("wallet generated with address: ", btcAddress);
console.log("private key: ", node.toWIF());
console.log("mnemonic: ", mnemonic);
