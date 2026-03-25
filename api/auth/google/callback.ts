import { google } from "googleapis";
import admin from "firebase-admin";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Note: On Vercel, environment variables are automatically available via process.env
// No need to use dotenv.config() - Vercel handles this automatically

// Firebase Admin Setup
const serviceAccount = {
  type: "service_account",
  project_id: "inboxai-ecb3a",
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: "106590958217622410419",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40inboxai-ecb3a.iam.gserviceaccount.com",
};

// Initialize Firebase (with error handling for Vercel environment)
let db: any;
try {
  initializeApp({
    credential: cert(serviceAccount as any),
  });
  db = getFirestore();
} catch (error) {
  // Firebase may already be initialized
  console.log("Firebase app initialization:", error instanceof Error ? error.message : "Already initialized");
}

function getOAuth2Client() {
  let redirectUri: string;
  
  // For serverless environment, use Vercel's deployment URL
  if (process.env.VERCEL_URL) {
    // If it's a preview URL (contains random suffix), try to use main production domain
    if (process.env.VERCEL_URL.includes('-')) {
      redirectUri = `https://automailor.vercel.app/api/auth/google/callback`;
    } else {
      redirectUri = `https://${process.env.VERCEL_URL}/api/auth/google/callback`;
    }
  } else if (process.env.APP_URL) {
    redirectUri = `${process.env.APP_URL.replace(/\/$/, '')}/api/auth/google/callback`;
  } else {
    redirectUri = process.env.GOOGLE_REDIRECT_URI || "http://localhost:3000/api/auth/google/callback";
  }

  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    redirectUri
  );
}

// Google Auth Callback endpoint
export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-User-ID");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { code, state: userId } = req.query;
    
    if (!code) {
      res.status(400).send("Missing authorization code");
      return;
    }
    
    if (!userId) {
      res.status(400).send("Missing user ID");
      return;
    }
    
    const client = getOAuth2Client();
    const { tokens } = await client.getToken(code as string);
    
    if (db && userId) {
      const userRef = db.collection('users').doc(userId as string);
      await userRef.set({
        googleTokens: tokens,
        gmailConnected: true,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    }
    
    // Redirect to app with success
    // For serverless environment, use Vercel's deployment URL
    // Use main production domain for redirect
    const appUrl = process.env.VERCEL_URL && !process.env.VERCEL_URL.includes('-')
      ? `https://${process.env.VERCEL_URL}`
      : "https://automailor.vercel.app";
    res.redirect(`${appUrl}/settings?connected=true`);
  } catch (error: any) {
    console.error("Error exchanging code for tokens:", error);
    // For serverless environment, use Vercel's deployment URL
    // Use main production domain for redirect
    const appUrl = process.env.VERCEL_URL && !process.env.VERCEL_URL.includes('-')
      ? `https://${process.env.VERCEL_URL}`
      : "https://automailor.vercel.app";
    res.redirect(`${appUrl}/settings?error=auth_failed`);
  }
}
