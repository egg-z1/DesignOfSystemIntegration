import crypto from "crypto";

// 🔑 RSA 공개키 및 비밀키 생성 (2048비트 키 사용)
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048, // 키 길이 설정 (보안성 강화를 위해 2048비트 사용)
});

// 🖨 생성된 공개키 출력 (PEM 형식)
console.log(
  "Public key : " +
    publicKey.export({
      type: "pkcs1", // PKCS#1 형식 사용
      format: "pem", // PEM(Privacy-Enhanced Mail) 형식으로 출력
    })
);

// 🖨 생성된 비밀키 출력 (PEM 형식)
console.log(
  "Private key : " +
    privateKey.export({
      type: "pkcs1",
      format: "pem",
    })
);

// 🔒 RSA 공개키를 사용한 암호화
const rsaCiphertext = crypto.publicEncrypt(
  {
    key: publicKey, // 암호화에 사용할 공개키
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, // OAEP 패딩 사용 (더 안전한 패딩 방식)
    oaepHash: "sha256", // 해시 알고리즘으로 SHA-256 사용
  },
  Buffer.from("Hello world!") // 암호화할 메시지 (Buffer 형태로 변환)
);
console.log("Cipher text: " + rsaCiphertext.toString("base64")); // 🖨 암호화된 데이터 (Base64 인코딩)

// 🔓 RSA 비밀키 복호화
const rsaPlaintext = crypto.privateDecrypt(
  {
    key: privateKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256",
  },
  rsaCiphertext
);
console.log("Plain text : " + rsaPlaintext); // 🖨 복호화된 데이터

// 🛑 주석 처리된 AES-256-CBC 암호화 및 복호화 코드
// 🔑 대칭키 및 IV 설정
// const key = "01234567890123456789012345678901"; // AES-256을 위한 32바이트 키
// const iv = Buffer.alloc(16, 0); // 초기화 벡터(IV) (16바이트, 0으로 초기화)

// 🔒 AES-256-CBC 대칭키 암호화
// const AESencrypto = crypto.createCipheriv("aes-256-cbc", key, iv);
// const ciphertext =
//   AESencrypto.update("Hello world!", "utf8", "base64") + // 문자열을 base64로 변환하며 암호화
//   AESencrypto.final("base64");

// console.log(ciphertext); // 🖨 AES 암호화된 데이터

// 🔓 AES-256-CBC 복호화
// const AESdecrypto = crypto.createDecipheriv("aes-256-cbc", key, iv);
// const plaintext =
//   AESdecrypto.update(ciphertext, "base64", "utf8") + // base64를 utf8 문자열로 변환하며 복호화
//   AESdecrypto.final("utf8");

// console.log("Plaintext : " + plaintext); // 🖨 복호화된 원본 데이터 출력
