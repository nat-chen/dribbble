import { NextAuthOptions, User, getServerSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { SessionInterface, UserProfile } from "@/common.types";
import { AdapterUser } from "next-auth/adapters";
import { createUser, getUser } from "./actions";

export const authOptions: NextAuthOptions = {
  debug: true,
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  jwt: {
    encode: ({ secret, token }) => {
      console.log(secret, token);

      // const encodedToken = jsonwebtoken.sign(
      //   {
      //     ...token,
      //     iss: "grafbase",
      //     exp: Math.floor(Date.now() / 1000) + 60 * 60,
      //   },
      //   secret
      // );
      // return encodedToken;
    },
    decode: async ({ secret, token }) => {
      console.log(secret, token);
      // const decodedToken = jsonwebtoken.verify(token!, secret);
      // return decodedToken as JWT;
    },
  },
  theme: {
    colorScheme: "light",
    logo: "/logo.svg",
  },
  callbacks: {
    async jwt({ token, account }) {
      console.log(token, account);
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session }) {
      console.log("session", session);
      // const email = session?.user?.email as string;
      // try {
      //   const data = (await getUser(email)) as { user?: UserProfile };
      //   const newSession = {
      //     ...session,
      //     user: {
      //       ...session.user,
      //       ...data?.user,
      //     },
      //   };
      //   return session;
      // } catch (error: any) {
      //   console.error("Error retrieving user data: ", error.message);
      //   return session;
      // }
    },
    async signIn({ user }: { user: AdapterUser | User }) {
      console.log("user", user);
      // try {
      //   const userExists = (await getUser(user?.email as string)) as {
      //     user?: UserProfile;
      //   };

      //   if (!userExists.user) {
      //     await createUser(
      //       user.name as string,
      //       user.email as string,
      //       user.image as string
      //     );
      //   }

      //   return true;
      // } catch (error: any) {
      //   console.log("Error checking if user exists: ", error.message);
      //   return false;
      // }
    },
  },
};

export async function getCurrentUser() {
  const session = (await getServerSession(authOptions)) as SessionInterface;
  return session;
}
