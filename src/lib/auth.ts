import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.AUTH_BAZARDHOR as string);
const db = client.db("bazardhor");

export const auth = betterAuth({
    emailAndPassword: { 
        enabled: true, 
    }, 
    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        },
        github: { 
            clientId: process.env.GITHUP_CLIENT_ID as string, 
            clientSecret: process.env.GITHUP_SCREAT_ID as string, 
        },
    },
    
    account: {
		accountLinking: {
			enabled: true,
			trustedProviders: ["google", "github"], // add your providers
		},
	},

    database: mongodbAdapter(db, {
        client,
    }),
});