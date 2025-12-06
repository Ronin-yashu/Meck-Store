import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import pool from "@/lib/mysql";

// IMPORTANT: adjust column names to match your actual `users` table
async function findUserByEmail(email) {
  const [rows] = await pool.execute(
    "SELECT id, name, email, password_hash, role FROM users WHERE email = ? LIMIT 1",
    [email]
  );
  return rows[0] || null;
}

async function createUser({ name, email, passwordHash, provider, providerId }) {
  // You can extend this to store provider info if needed
  const [result] = await pool.execute(
    `INSERT INTO users (name, email, password_hash, role)
     VALUES (?, ?, ?, 'user')`,
    [name, email, passwordHash]
  );

  const [rows] = await pool.execute(
    "SELECT id, name, email, password_hash, role FROM users WHERE id = ? LIMIT 1",
    [result.insertId]
  );

  return rows[0] || null;
}

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    // Email/password login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await findUserByEmail(credentials.email);
        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password_hash
        );

        if (!isValid) return null;

        // NextAuth user object
        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),

    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // Facebook OAuth
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),

    // Example: GitHub
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // For OAuth users: ensure they exist in MySQL `users` table
      if (account?.provider !== "credentials") {
        const existing = await findUserByEmail(user.email);
        if (!existing) {
          // No password for OAuth users
          const passwordHash = await bcrypt.hash(
            Math.random().toString(36),
            10
          );
          await createUser({
            name: user.name || profile?.name || "User",
            email: user.email,
            passwordHash,
            provider: account.provider,
            providerId: account.providerAccountId,
          });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      // First time JWT callback, user is available
      if (user) {
        token.id = user.id;
        token.role = user.role || "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
