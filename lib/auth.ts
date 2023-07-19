import prisma from "@/lib/prisma";
import { compare } from "bcryptjs";
import { NextApiResponse } from "next";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        console.log("user", user);
        // if (!user || !(await compare(credentials.password, user.password!))) {
        if (!user || credentials.password !== user.password) {
          throw new Error("User doesn't exists or password is uncorrect");
        }
        return {
          id: user.id,
          email: user.email,
          username: user.username,
          avatarUrl: user.avatarUrl,
          // randomKey: "Hey cool",
        };
      },
    }),
  ],
  theme: {
    colorScheme: "light",
    logo: "/logo.svg",
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return Promise.resolve(token);
    },
    async session({ session, token, user }) {
      // session.session = token.user;
      return {
        ...session,
        user: token.user,
      };
    },
  },
};
