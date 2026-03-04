import { LoggedInUser } from "@/features/auth/interfaces/auth.interface";
import { signIn, signUp } from "@/features/auth/services/auth";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { environments } from "@/config/environments";

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: environments.SESSION_EXPIRATION,
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
                full_name: {},
                action: {},
            },
            async authorize(credentials) {

                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    let result: LoggedInUser;

                    if (credentials.action === 'register') {
                        result = await signUp({
                            email: credentials.email,
                            password: credentials.password,
                            full_name: credentials.full_name || '',
                        });

                    } else {
                        result = await signIn({
                            email: credentials.email,
                            password: credentials.password,
                        });
                    }

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
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl + "/dashboard";
        },
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
    pages: {
        signIn: '/auth/sign-in',
        error: '/auth/sign-in',
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };