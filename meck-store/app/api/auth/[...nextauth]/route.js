import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import pool from "@/lib/mysql";

// Helper function to find user by email
async function findUserByEmail(email) {
  try {
    const [rows] = await pool.execute(
      "SELECT id, first_name, last_name, email, password_hash, role FROM users WHERE email = ? LIMIT 1",
      [email]
    );
    if (rows[0]) {
      // Combine first_name and last_name into name for NextAuth
      rows[0].name = `${rows[0].first_name || ''} ${rows[0].last_name || ''}`.trim();
    }
    return rows[0] || null;
  } catch (error) {
    console.error("Error finding user:", error);
    return null;
  }
}

// Helper function to create new user
async function createUser({ name, email, passwordHash }) {
  try {
    // Split name into first_name and last_name
    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const [result] = await pool.execute(
      `INSERT INTO users (first_name, last_name, email, password_hash, role)
       VALUES (?, ?, ?, ?, 'customer')`,
      [firstName, lastName, email, passwordHash]
    );

    const [rows] = await pool.execute(
      "SELECT id, first_name, last_name, email, password_hash, role FROM users WHERE id = ? LIMIT 1",
      [result.insertId]
    );

    if (rows[0]) {
      // Combine first_name and last_name into name for NextAuth
      rows[0].name = `${rows[0].first_name || ''} ${rows[0].last_name || ''}`.trim();
    }

    return rows[0] || null;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
}

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
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
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log("Missing credentials");
            return null;
          }

          const user = await findUserByEmail(credentials.email);
          if (!user) {
            console.log("User not found:", credentials.email);
            return null;
          }

          // Check if user has a password (OAuth users might not)
          if (!user.password_hash) {
            console.log("User has no password (OAuth user?)");
            return null;
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password_hash
          );

          if (!isValid) {
            console.log("Invalid password for:", credentials.email);
            return null;
          }

          // Return user object
          return {
            id: String(user.id),
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("Error in authorize:", error);
          return null;
        }
      },
    }),

    // Google OAuth (only if credentials are provided)
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),

    // Facebook OAuth (only if credentials are provided)
    ...(process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET
      ? [
          FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
          }),
        ]
      : []),

    // GitHub OAuth (only if credentials are provided)
    ...(process.env.GITHUB_ID && process.env.GITHUB_SECRET
      ? [
          GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
          }),
        ]
      : []),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // For OAuth users: ensure they exist in MySQL users table
        if (account?.provider !== "credentials") {
          const existing = await findUserByEmail(user.email);
          if (!existing) {
            // Create OAuth user with random password (they won't use it)
            const randomPassword = Math.random().toString(36).slice(-12);
            const passwordHash = await bcrypt.hash(randomPassword, 10);
            
            const newUser = await createUser({
              name: user.name || profile?.name || "User",
              email: user.email,
              passwordHash,
            });

            if (!newUser) {
              console.error("Failed to create OAuth user");
              return false;
            }

            // Update user object with database ID
            user.id = String(newUser.id);
            user.role = newUser.role;
          } else {
            // Update user object with existing user data
            user.id = String(existing.id);
            user.role = existing.role;
          }
        }
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      // First time JWT callback is run, user object is available
      if (user) {
        token.id = user.id;
        token.role = user.role || "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };