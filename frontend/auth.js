import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email", type: "email" 
        },
        password: {
          label: "Contraseña", type: "password" 
        }
      },
      authorize: async (credentials) => {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/token/", {
          method: 'POST',
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
          headers: { "Content-Type": "application/json" }
        });

        const data = await res.json();

        if (res.ok && data.access) {
          return { accessToken: data.access, refreshToken: data.refresh };
        } else {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: "/signIn"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    },
  }
})