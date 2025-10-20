import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login", // página personalizada
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("Usuario autenticado con Google:", user);
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = "user"; // ✅ ya no dará error
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
