import "server-only";

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { emailOTP } from "better-auth/plugins"
import { resend } from "./resend";
import { admin } from "better-auth/plugins"

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    socialProviders: { 
    github: { 
      clientId: process.env.AUTH_GITHUB_CLIENT_ID as string, 
      clientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET as string, 
    }, 
    google: { 
      clientId: process.env.GOOGLE_CLIENT_ID as string, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
    }, 
  },

  plugins: [
    emailOTP({
      async sendVerificationOTP({email, otp }) {
        await resend.emails.send({
          from: 'LMS <onboarding@resend.dev>',
          to: [email],
          subject: 'LMS - Verify your email',
          html: `<p>Your OTP is <strong>${otp}</strong></p>`,
        });
      },
    }),
    admin()
  ],
});