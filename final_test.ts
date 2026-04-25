import { HashingService, CryptoService } from './packages/core-security/src/index.ts';

async function test() {
    console.log("Testing Hashing...");
    const h = await HashingService.hash("test");
    console.log("Hash:", h);
    
    console.log("Testing Encryption...");
    const key = "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
    const e = CryptoService.encrypt("data", key);
    console.log("Encrypted:", e);
    const d = CryptoService.decrypt(e, key);
    console.log("Decrypted:", d);
}

test().catch(console.error);
