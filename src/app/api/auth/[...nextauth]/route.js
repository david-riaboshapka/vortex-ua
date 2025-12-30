import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const { rows } = await db.query(
          "SELECT * FROM users WHERE email = $1",
          [credentials.email]
        );

        const user = rows[0];
        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password_hash
        );

        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          name: `${user.first_name} ${user.last_name}`,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      // при логине
      if (user) {
        token.id = user.id;
      }

      // 🔴 КАЖДЫЙ РАЗ сверяем с БД
      if (token?.id) {
        const { rows } = await db.query(
          "SELECT role, password_hash FROM users WHERE id = $1",
          [token.id]
        );

        const dbUser = rows[0];

        // ❌ пользователь удалён или пароль сменили
        if (!dbUser) {
          return null;
        }

        token.role = dbUser.role;
        token.password_hash = dbUser.password_hash;
      }

      return token;
    },

    async session({ session, token }) {
      if (!token) return null;

      session.user.id = token.id;
      session.user.role = token.role;

      return session;
    },
  },

};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
