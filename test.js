import crypto from "crypto";

// 1. Plaintext를 AES로 Ciphertext로 만들기
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
});

const key = "01234567890123456789012345678901";
const iv = Buffer.alloc(16, 0);

// 2. AES는 대칭키로 RSA(공개키)로 만들기
const AESencrypto = crypto.createCipheriv("aes-256-cbc", key, iv);
const ciphertext =
  AESencrypto.update("Hello world!", "utf8", "base64") +
  AESencrypto.final("base64");
console.log("Ciphertext : " + ciphertext);

const rsaCiphertext = crypto.publicEncrypt(
  {
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256",
  },
  key
);
console.log("rsaCiphertext : " + rsaCiphertext.toString("base64"));

// 3. 그 후 RSA(비밀키)로 대칭키를 만들기
const rsaPlaintext = crypto.privateDecrypt(
  {
    key: privateKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256",
  },
  rsaCiphertext
);

// 4. 그 대칭키로 AES로 Ciphertext에서 Plaintext로 만들기
const AESdecrypto = crypto.createDecipheriv("aes-256-cbc", rsaPlaintext, iv);
const plaintext =
  AESdecrypto.update(ciphertext, "base64", "utf8") + AESdecrypto.final("utf8");

console.log("Plaintext : " + plaintext);
