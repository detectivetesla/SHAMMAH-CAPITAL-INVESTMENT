const argon2 = require('argon2');
const crypto = require('crypto');

async function runSecurityAudit() {
  console.log("--- SHAMMAH SECURITY JS AUDIT START ---");

  // 1. Test Hashing
  console.log("\n[1/2] Testing Hashing (Argon2id)...");
  const password = "SecurePassword123!";
  const hash = await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 4
  });
  
  const isMatch = await argon2.verify(hash, password);
  if (isMatch) {
    console.log("✅ Hashing: PASS");
  } else {
    console.error("❌ Hashing: FAIL");
    process.exit(1);
  }

  // 2. Test Encryption
  console.log("\n[2/2] Testing Crypto (AES-256-GCM)...");
  const data = "Sensitive Financial Data";
  const key = Buffer.from("0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef", "hex");
  const iv = crypto.randomBytes(16);
  
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const tag = cipher.getAuthTag();

  // Decrypt
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  if (decrypted === data) {
    console.log("✅ Crypto: PASS");
  } else {
    console.error("❌ Crypto: FAIL");
    process.exit(1);
  }

  console.log("\n--- SHAMMAH SECURITY JS AUDIT COMPLETE ---");
}

runSecurityAudit().catch(err => {
    console.error(err);
    process.exit(1);
});
