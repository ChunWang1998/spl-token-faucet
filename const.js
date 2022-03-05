const { Keypair, Connection, PublicKey } = require("@solana/web3.js");
const bip39 = require('bip39')

const phrase = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'

const seedBuffer = bip39.mnemonicToSeedSync(phrase)

const PAYER = Keypair.fromSeed(seedBuffer.slice(0, 32));

const ownerPhrase = 'taste accuse skin culture solve pistol opinion army primary clay night athlete'
const ownerSeedBuffer = bip39.mnemonicToSeedSync(ownerPhrase)
const TEST_OWNER = Keypair.fromSeed(ownerSeedBuffer.slice(0, 32));

// const API_ENDPOINT = "https://api.mainnet-beta.solana.com"
// const API_ENDPOINT = "https://solana-api.projectserum.com"
const API_ENDPOINT = "http://api.devnet.solana.com";
// const API_ENDPOINT = "http://localhost:8899";

const CONNECTION = new Connection(API_ENDPOINT);

const DECIMALS = 9;

module.exports = {
  PAYER,
  TEST_OWNER,
  API_ENDPOINT,
  CONNECTION,
  DECIMALS,
}