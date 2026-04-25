import { HashingService, CryptoService } from './packages/core-security/src/index';

async function runSecurityAudit() {
  console.log("--- SHAMMAH SECURITY AUDIT START ---");

  // 1. Test Hashing (Argon2id)
  console.log("\n[1/2] Testing Hashing Service (Argon2id)...");
  const password = "SecurePassword123!";
  const hash = await HashingService.hash(password);
  console.log("Password Hash Generated:", hash.substring(0, 30) + "...");
  
  const isMatch = await HashingService.verify(hash, password);
  const isWrongMatch = await HashingService.verify(hash, "WrongPassword!");
  
  if (isMatch && !isWrongMatch) {
    console.log("✅ Hashing Service: PASS (Correct verification, fails on wrong input)");
  } else {
    console.error("❌ Hashing Service: FAIL");
    process.exit(1);
  }

  // 2. Test Encryption (AES-256-GCM)
  console.log("\n[2/2] Testing Crypto Service (AES-256-GCM)...");
  const piiData = "User SSN/BVN: 123-456-789";
  const masterKey = "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"; // 32-byte hex
  
  try {
    const encrypted = CryptoService.encrypt(piiData, masterKey);
    console.log("Encrypted Data Format Check (iv:tag:data):", encrypted.split(':').length === 3);
    
    const decrypted = CryptoService.decrypt(encrypted, masterKey);
    if (decrypted === piiData) {
      console.log("✅ Crypto Service: PASS (Lossless encryption/decryption)");
    } else {
      console.error("❌ Crypto Service: FAIL (Data mismatch)");
      process.exit(1);
    }
    
    // Test tampering (Integrity check)
    const tampered = encrypted.substring(0, encrypted.length - 5) + "aaaaa";
    try {
      CryptoService.decrypt(tampered, masterKey);
      console.error("❌ Crypto Service: FAIL (Accepted tampered data - GCM Integrity Failed)");
      process.exit(1);
    } catch (e) {
      console.log("✅ Crypto Service: PASS (Integrity check caught tampering)");
    }

  } catch (err) {
    console.error("❌ Crypto Service: ERROR during testing:", err);
    process.exit(1);
  }

  console.log("\n--- SHAMMAH SECURITY AUDIT COMPLETE (ALL TESTS PASSED) ---");
}

runSecurityAudit();
