import crypto from "crypto";

const key = "01234567890123456789012345678901";
const iv = Buffer.alloc(16, 0);

const AESencrypto = crypto.createCipheriv("aes-256-cbc", key, iv);
const ciphertext =
  AESencrypto.update("Hello world!", "utf8", "base64") +
  AESencrypto.final("base64");

console.log(ciphertext);
