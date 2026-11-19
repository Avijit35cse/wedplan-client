
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
