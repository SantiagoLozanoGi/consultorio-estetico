import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextResponse } from "next/server"; 

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  pages: {
    signIn: "/login", // tu página personalizada
  },

  callbacks: {
    // 🔹 Se ejecuta cuando el usuario se autentica con Google
    async signIn({ user, account, profile }) {
      console.log("✅ Usuario autenticado:", user.email);

      // Permitir solo correos válidos
      if (!user.email) return false;

      return true;
    },

    // 🔹 Modifica los datos de sesión disponibles en el cliente
    async session({ session, token }) {
      // Asignamos un rol según el correo electrónico
      if (session?.user?.email === "medinapipe123@gmail.com") {
        session.user.role = "admin";
      } else {
        session.user.role = "user";
      }

      return session;
    },

    // 🔹 Controla hacia dónde redirige después del login
    async redirect({ url, baseUrl }) {
      // Si el admin inicia sesión, redirige a /panelAdmin
      if (url.includes("google")) return `${baseUrl}/`;

      // por defecto
      return baseUrl;
    },
  },
});

export { handler as GET, handler as POST };
