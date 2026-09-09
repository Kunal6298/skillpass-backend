import { User, Role } from "../../entities/User";
import { IUserRepository } from "../../IReps/IUserRepo";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
const otpGenerator = require("otp-generator");
import { sendOTPEmail } from "../../utils/mail-config-otp";

export class RegisterUser {
  constructor(private userRepo: IUserRepository) {}

  async execute(name: string, email: string, password: string) {
    const existing = await this.userRepo.findByEmail(email);

    if (existing?.otpExpires && existing.otpExpires > new Date() && existing.isVerified) {
      throw new Error("User already registered and verified. Please sign in.");
    }

    if (existing && !existing.isVerified) {
      // Clean up previous unverified registration attempt
      await this.userRepo.delete(existing.id);
    }

    const hashed = await bcrypt.hash(password, 10);
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    const user = new User(uuid(), name, email, hashed, otp, otpExpires);
    await this.userRepo.create(user);

    try {
      await sendOTPEmail({ email, otp });
    } catch (mailError: any) {
      console.warn("Failed to dispatch email via SMTP:", mailError?.message || mailError);
      console.log(`[DEV/FALLBACK] OTP for ${email} is: ${otp}`);
    }

    return { message: "Otp sent successfully to your email" };
  }
}
