import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const generateHash = async () => {
  const adminPassword = process.env.ADMIN_PASSWORD || "ChangeMePlease!";
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(adminPassword, salt);
  console.log("Hashed Password:", hashedPassword);
  process.exit();
};

generateHash();
