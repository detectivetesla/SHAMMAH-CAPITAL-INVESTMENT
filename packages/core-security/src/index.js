"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalValidationPipe = exports.CryptoService = exports.HashingService = void 0;
const argon2 = require("argon2");
const crypto_1 = require("crypto");
const common_1 = require("@nestjs/common");
class HashingService {
    static async hash(plainText) {
        return argon2.hash(plainText, this.OPTIONS);
    }
    static async verify(hash, plainText) {
        return argon2.verify(hash, plainText);
    }
}
exports.HashingService = HashingService;
HashingService.OPTIONS = {
    type: argon2.argon2id,
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 4,
};
class CryptoService {
    static encrypt(plainText, key) {
        const iv = (0, crypto_1.randomBytes)(this.IV_LENGTH);
        const cipher = (0, crypto_1.createCipheriv)(this.ALGORITHM, Buffer.from(key, 'hex'), iv);
        let encrypted = cipher.update(plainText, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        const authTag = cipher.getAuthTag().toString('hex');
        return `${iv.toString('hex')}:${authTag}:${encrypted}`;
    }
    static decrypt(encryptedData, key) {
        const [ivHex, authTagHex, encryptedText] = encryptedData.split(':');
        if (!ivHex || !authTagHex || !encryptedText) {
            throw new Error('Invalid encrypted data format');
        }
        const iv = Buffer.from(ivHex, 'hex');
        const authTag = Buffer.from(authTagHex, 'hex');
        const decipher = (0, crypto_1.createDecipheriv)(this.ALGORITHM, Buffer.from(key, 'hex'), iv);
        decipher.setAuthTag(authTag);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}
exports.CryptoService = CryptoService;
CryptoService.ALGORITHM = 'aes-256-gcm';
CryptoService.IV_LENGTH = 16;
exports.GlobalValidationPipe = new common_1.ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    exceptionFactory: (errors) => {
        return new common_1.BadRequestException(errors.map((err) => ({
            field: err.property,
            errors: Object.values(err.constraints || {}),
        })));
    },
});
//# sourceMappingURL=index.js.map