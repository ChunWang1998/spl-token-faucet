
const { Transaction, PublicKey } = require("@solana/web3.js");
const { Token, TOKEN_PROGRAM_ID } = require("@solana/spl-token");
const { CONNECTION, TEST_OWNER, DECIMALS } = require("./const");

async function main() {
    //input 
    let wallet_address = "H1jhQsrgaipd4dTCBanKmRNHUJMRBtirLY1i7AvN8hhz";

    //1. create mint token
    mintA = await Token.createMint(
        CONNECTION,
        TEST_OWNER,
        TEST_OWNER.publicKey,
        null,
        DECIMALS,
        TOKEN_PROGRAM_ID,
    );

    let amount_to_airdrop = 200;

    console.log(await faucet(wallet_address, mintA, amount_to_airdrop))

}

async function faucet(wallet_address, mintA, amount_to_airdrop) {
    let tx = new Transaction();
    let total_SPL_token_supply = 10000 * (10 ** DECIMALS);

    console.log({ mintA: mintA.publicKey.toBase58() })

    //2. create mint token account
    let ata = await mintA.getOrCreateAssociatedAccountInfo(
        TEST_OWNER.publicKey,
    );

    //3. mint some mint token in mint token account
    await mintA.mintTo(
        ata.address,
        TEST_OWNER,
        [],
        total_SPL_token_supply,
    );

    //4. transfer mint token from mint token account to recipient wallet address(ata)->(faucet function) 
    let toTokenAccount = await mintA.getOrCreateAssociatedAccountInfo(
        new PublicKey(wallet_address),
    );

    tx.add(
        Token.createTransferInstruction(
            TOKEN_PROGRAM_ID,
            ata.address,
            toTokenAccount.address,
            TEST_OWNER.publicKey, // from's auth
            [],
            amount_to_airdrop * (10 ** DECIMALS)
        )
    );

    tx.feePayer = TEST_OWNER.publicKey;
    let tx_hash = await CONNECTION.sendTransaction(tx, [TEST_OWNER]);
    return tx_hash;

}

main().then(
    () => process.exit(),
    (err) => {
        console.error(err);
        process.exit(-1);
    }
);