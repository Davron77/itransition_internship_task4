import admin from "firebase-admin";

admin.initializeApp({
  //@ts-ignore
  credential: admin.credential.cert(serviceAccount),
});

const adminAuth = admin.auth();
export default adminAuth;
