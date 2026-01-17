import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { emailOTP } from "better-auth/plugins"
import { resend } from "./resend";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    socialProviders: { 
    github: { 
      clientId: process.env.AUTH_GITHUB_CLIENT_ID as string, 
      clientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET as string, 
    }, 
  },

  plugins: [
    emailOTP({
      async sendVerificationOTP({email, otp }) {
        const { data, error } = await resend.emails.send({
          from: 'MarshalLMS <onboarding@resend.dev>',
          to: [email],
          subject: 'MarshalLMS - Verify your email',
          html: `<p>Your OTP is <strong>${otp}</strong></p>`,
        });
      },
    }),
  ],
});