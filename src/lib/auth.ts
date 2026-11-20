
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { client, db } from "./mongodb";

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client,
    }),

    emailAndPassword: {
        enabled: true,
    },

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
    },

    user: {
        additionalFields: {
            role: {
                type: ["customer", "vendor"],
                required: false,
                defaultValue: "customer",
                input: true,
            },
        },
    },

    trustedOrigins: ["http://localhost:3000"],
});
