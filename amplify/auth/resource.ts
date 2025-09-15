import { defineAuth, secret } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      google: {
        clientId: secret("GOOGLE_CLIENT_ID"),
        clientSecret: secret("GOOGLE_CLIENT_SECRET"),
        scopes: ["openid", "email", "profile"]
      },
      loginWithAmazon: {
        clientId: secret("LOGINWITHAMAZON_CLIENT_ID"),
        clientSecret: secret("LOGINWITHAMAZON_CLIENT_SECRET"),
        // Login with Amazon supports 'profile' and optional 'postal_code'.
        // 'email' is included within 'profile' and should not be requested as a separate scope.
        scopes: ["profile"]
      },
      callbackUrls: ["http://localhost:5173/", "https://taxcalculator.winoooops.com/"],
      logoutUrls: ["http://localhost:5173/", "https://taxcalculator.winoooops.com"]
    }
  },
});
