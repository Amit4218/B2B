import crypto from "crypto";

export const generateOtp = () => {
  if (crypto.randomInt) {
    return crypto.randomInt(100000, 999999);
  }
  // fallback: use rejection sampling from randomBytes
  while (true) {
    const buf = crypto.randomBytes(4); // 32-bit
    const n = buf.readUInt32BE(0);
    const otp = (n % 900000) + 100000; // Generates number between 100000 and 999999
    return otp;
  }
};

export const isOtpExpired = (createdAt, ttlSeconds = 60) => {
  const createdTime = new Date(createdAt).getTime(); // convert to ms
  const now = Date.now();
  return now - createdTime > ttlSeconds * 1000;
};
