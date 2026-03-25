//-----------------------------------------------------
// MSAL CONFIGURATION
//-----------------------------------------------------
const msalConfig = {
    auth: {
        clientId: "819838783674-0uq5tbe16f65i4mcujh02l1el1cklj22.apps.googleusercontent.com",
        authority: "https://pkspss.ciamlogin.com/2a36f934-d891-484f-8d86-4593d52494a9/v2.0",
        redirectUri: "https://adgmstaticwebapp.azurestaticapps.net"
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false
    }
};

const loginRequest = {
    scopes: ["openid", "profile", "offline_access"]
    // Add API scope once your API is ready:
    // scopes: ["api://<API-APP-ID>/user_impersonation"]
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

//-----------------------------------------------------
// SIGN-IN BUTTON TRIGGER
//-----------------------------------------------------
document.getElementById("signinBtn").onclick = async () => {
    // Ignore fake Email/Password fields — External ID handles real auth
    msalInstance.loginRedirect(loginRequest);
};

//-----------------------------------------------------
// HANDLE REDIRECT RESPONSE
//-----------------------------------------------------
msalInstance.handleRedirectPromise().then((response) => {
    if (response !== null) {
        console.log("User logged in successfully:", response.account);
        // TODO: Redirect to upload page, or show dashboard
    }
}).catch((error) => {
    console.error(error);
});

//-----------------------------------------------------
// GET TOKEN FOR API CALLS
//-----------------------------------------------------
async function getAccessToken() {
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length === 0) return null;

    try {
        const tokenResponse = await msalInstance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0]
        });
        return tokenResponse.accessToken;
    } catch (err) {
        return msalInstance.acquireTokenRedirect(loginRequest);
    }
}