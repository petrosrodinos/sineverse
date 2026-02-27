import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { LoggedInUser } from "@/app/features/auth/interfaces/auth.interface";
import { signIn } from "@/app/features/auth/services/auth";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {

                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    const result: LoggedInUser = await signIn(credentials);

                    if (!result || !result.access_token || !result.user_uuid || !result.email) {
                        return null;
                    }

                    return {
                        id: result.user_uuid,
                        user_uuid: result.user_uuid,
                        email: result.email,
                        role: result.role as string,
                        access_token: result.access_token,
                        expires_in: result.expires_in as number,
                        avatar: result.avatar || undefined,
                        full_name: result.full_name || "",
                        isLoggedIn: result.isLoggedIn || true,
                    };

                } catch (error) {
                    return null;
                }
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user_uuid = user.user_uuid;
                token.email = user.email;
                token.full_name = user.full_name;
                token.avatar = user.avatar;
                token.role = user.role;
                token.access_token = user.access_token;
                token.expires_in = user.expires_in;
                token.isLoggedIn = user.isLoggedIn;
            }
            return token;
        },

        async session({ session, token }) {
            session.user_uuid = token.user_uuid as string;
            session.email = token.email as string;
            session.full_name = token.full_name as string;
            session.avatar = token.avatar as string;
            session.role = token.role as string;
            session.access_token = token.access_token as string;
            session.expires_in = token.expires_in as number;
            session.isLoggedIn = token.isLoggedIn as boolean;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };