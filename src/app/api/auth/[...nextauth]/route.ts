import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@test.com" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/sign-up`,
            {
              method: "POST",
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
              headers: { "Content-Type": "application/json" },
            }
          );

          const user = await res.json();
          console.log(user);

          if (user.error) {
            throw new Error(user.error); // Manejar errores y lanzar una excepción
          }

          return user;
        } catch (error) {
          console.error("Error during authorization:", error);
          throw new Error("Authentication failed"); 
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
