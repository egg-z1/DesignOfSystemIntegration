import crypto from "crypto";

const originalText =
  "To publish and install packages to and from the public npm registry or a private npm registry, you must install Node.js and the npm command line interface using either a Node version manager or a Node installer. We strongly recommend using a Node version manager like nvm to install Node.js and npm. We do not recommend using a Node installer, since the Node installation process installs npm in a directory with local permissions and can cause permissions errors when you run npm packages globally.";
const AESKey = "abcdeABCDE0123456789EFGHIefghiyz";
const iv = Buffer.alloc(16, 0);
const { publicKey: RSApk, privateKey: RSAsk } = crypto.generateKeyPairSync(
  "rsa",
  {
    modulusLength: 2048,
  }
);

console.log("Original Text: " + originalText + "\n");

const AESencrypt = crypto.createCipheriv("aes-256-cbc", AESKey, iv);
const AESciphertext =
  AESencrypt.update(originalText, "utf8", "base64") +
  AESencrypt.final("base64");

const rsaCiphertext = crypto.publicEncrypt(
  {
    key: RSApk,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256",
  },
  Buffer.from(AESKey)
);

console.log("Ciphertext: " + AESciphertext + "\n");
console.log("Encrypted Key: " + rsaCiphertext.toString("base64") + "\n");

const rsaPlaintext = crypto.privateDecrypt(
  {
    key: RSAsk,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256",
  },
  rsaCiphertext
);

console.log("Decrypted Key: " + rsaPlaintext + "\n");

const AESdecrypt = crypto.createDecipheriv("aes-256-cbc", rsaPlaintext, iv);
const AESplaintext =
  AESdecrypt.update(AESciphertext, "base64", "utf8") + AESdecrypt.final("utf8");

console.log("Plaintext: " + AESplaintext + "\n");
