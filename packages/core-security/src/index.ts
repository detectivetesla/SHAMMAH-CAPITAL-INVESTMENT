import * as argon2 from 'argon2';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { ValidationPipe, BadRequestException } from '@nestjs/common';

/**
 * HashingService
 * Implements Argon2id for secure password hashing.
 */
export class HashingService {
  private static readonly OPTIONS = {
    type: argon2.argon2id,
    memoryCost: 65536, // 64 MB
    timeCost: 3,
    parallelism: 4,
  };

  static async hash(plainText: string): Promise<string> {
    return argon2.hash(plainText, this.OPTIONS);
  }

  static async verify(hash: string, plainText: string): Promise<boolean> {
    return argon2.verify(hash, plainText);
  }
}

/**
 * CryptoService
 * Implements AES-256-GCM for field-level encryption (PII protection).
 */
export class CryptoService {
  private static readonly ALGORITHM = 'aes-256-gcm';
  private static readonly IV_LENGTH = 16;

  /**
   * Encrypts a string using AES-256-GCM.
   * @param plainText Text to encrypt
   * @param key 32-byte hex string key
   * @returns formatted string "iv:authTag:encryptedText"
   */
  static encrypt(plainText: string, key: string): string {
    const iv = randomBytes(this.IV_LENGTH);
    const cipher = createCipheriv(this.ALGORITHM, Buffer.from(key, 'hex'), iv);
    
    let encrypted = cipher.update(plainText, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag().toString('hex');
    
    return `${iv.toString('hex')}:${authTag}:${encrypted}`;
  }

  /**
   * Decrypts a string using AES-256-GCM.
   * @param encryptedData formatted string "iv:authTag:encryptedText"
   * @param key 32-byte hex string key
   */
  static decrypt(encryptedData: string, key: string): string {
    const [ivHex, authTagHex, encryptedText] = encryptedData.split(':');
    
    if (!ivHex || !authTagHex || !encryptedText) {
      throw new Error('Invalid encrypted data format');
    }

    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const decipher = createDecipheriv(this.ALGORITHM, Buffer.from(key, 'hex'), iv);
    
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }
}

/**
 * GlobalValidationPipe
 * Pre-configured NestJS ValidationPipe for zero-trust input validation.
 */
export const GlobalValidationPipe = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  exceptionFactory: (errors) => {
    return new BadRequestException(
      errors.map((err) => ({
        field: err.property,
        errors: Object.values(err.constraints || {}),
      }))
    );
  },
});
