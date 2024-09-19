import admin from "firebase-admin";
import serviceAccount from "../../firebase-service-account.json";

admin.initializeApp({
  //@ts-ignore
  credential: admin.credential.cert(serviceAccount),
});

const adminAuth = admin.auth();
export default adminAuth;
