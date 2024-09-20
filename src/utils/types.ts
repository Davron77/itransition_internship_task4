export type UserData = {
  email: string;
  uid: string;
  accessToken: string;
  stsTokenManager: {
    expirationTime: string;
    accessToken: string;
    refreshToken: string;
  };
  expirationTime: string;
  isAnonymous: boolean;
  tenantId: string;
  displayName: string;
  photoURL: string;
  phoneNumber: string;
  providerData: [
    {
      providerId: string;
      uid: string;
      displayName: string;
      email: string;
      phoneNumber: string;
      photoURL: string;
      [key: string]: string;
    }
  ];
  [key: string]: any;
};
