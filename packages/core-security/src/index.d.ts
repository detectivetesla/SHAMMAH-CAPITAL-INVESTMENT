import { ValidationPipe } from '@nestjs/common';
export declare class HashingService {
    private static readonly OPTIONS;
    static hash(plainText: string): Promise<string>;
    static verify(hash: string, plainText: string): Promise<boolean>;
}
export declare class CryptoService {
    private static readonly ALGORITHM;
    private static readonly IV_LENGTH;
    static encrypt(plainText: string, key: string): string;
    static decrypt(encryptedData: string, key: string): string;
}
export declare const GlobalValidationPipe: ValidationPipe;
