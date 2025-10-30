import { emailOTPClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  plugins: [emailOTPClient()],
  fetchOptions: {
    credentials: "include", // Critical for cookie handling
  },
});
