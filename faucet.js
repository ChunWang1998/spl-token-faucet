
const { Transaction, PublicKey } = require("@solana/web3.js");
const { Token, TOKEN_PROGRAM_ID } = require("@solana/spl-token");
const { CONNECTION, TEST_OWNER, DECIMALS } = require("./const");

async function main() {
    let tx = new Transaction();
    let total_SPL_token_supply = 10000 * (10 ** DECIMALS);
    //input 
    let wallet_address = "H1jhQsrgaipd4dTCBanKmRNHUJMRBtirLY1i7AvN8hhz";
    let spl_token_mint_address = mintA.publicKey.toBase58();
    let amount_to_airdrop = 100;

    //1. create mint token
    mintA = await Token.createMint(
        CONNECTION,
        TEST_OWNER,
        TEST_OWNER.publicKey,
        null,
        DECIMALS,
        TOKEN_PROGRAM_ID,
    );
    console.log({ mintA: mintA.publicKey.toBase58() })

    //2. create mint token account
    let ata = await mintA.getOrCreateAssociatedAccountInfo(
        TEST_OWNER.publicKey,
    );
    console.log({ ata: ata.mint.toBase58() });

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
            TOKEN_PROGRAM_ID, // 通常是固定數值, token program address
            ata.address, // from (token account public key)
            toTokenAccount.address, // to (token account public key)
            TEST_OWNER.publicKey, // from的auth
            [], // from是mutiple signers才需要帶，這邊我們留空
            amount_to_airdrop * (10 ** DECIMALS)// 轉帳的數量，這邊是最小單位，要注意decimals與實際數值的換算
        )
    );
    tx.feePayer = TEST_OWNER.publicKey;

    console.log(`txhash: ${await CONNECTION.sendTransaction(tx, [TEST_OWNER])}`);

}
main().then(
    () => process.exit(),
    (err) => {
        console.error(err);
        process.exit(-1);
    }
);