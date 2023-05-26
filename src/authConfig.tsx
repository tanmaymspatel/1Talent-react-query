export const msalConfig = {
    auth: {
        clientId: '1008a080-ea0e-4bc4-92a5-ccdaaeba5d54', // This is the ONLY mandatory field; everything else is optional.
        authority: 'https://login.microsoftonline.com/ea6c052c-f910-4b0a-a2a0-9e5179c0e9fb/', // Choose sign-up/sign-in user-flow as your default.
        redirectUri: 'http://localhost:4200', // You must register this URI on Azure Portal/App Registration. Defaults to "window.location.href". 
        scopes: ['openid', 'offline_access', 'api://582856b6-2df6-45b5-b481-c4bb646d7cca/Employee.Read',],
    }
}