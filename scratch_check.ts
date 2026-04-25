import { GlobalValidationPipe } from './packages/core-security/src/index';
import { ValidationPipe } from '@nestjs/common';

console.log("GlobalValidationPipe instance:", GlobalValidationPipe);
if (GlobalValidationPipe instanceof ValidationPipe) {
    console.log("✅ ValidationPipe check passed");
} else {
    console.error("❌ ValidationPipe check failed");
}
