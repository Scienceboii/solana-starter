import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import wallet from "../wba-wallet.json";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("6tPke11dY4ui2xFxBYgTQDio9aGEUuiSPpdKPBVTbNGF");

(async () => {
  try {
    // Create an ATA
    const ata = getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey)
    console.log(`Your ata is: ${(await ata).address.toBase58()}`);
    // Mint to ATA
    const mintTx = await mintTo(connection, keypair, mint, (await ata).address, keypair.publicKey, 9809871230913323)
    console.log(`Your mint txid: ${mintTx}`);
  } catch (error) {
    console.log(`Oops, something went wrong: ${error}`);
  }
})();
