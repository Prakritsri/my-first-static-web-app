const msalConfig = {
  auth: {
    clientId: "PASTE-CLIENT-ID-HERE",
    authority: "https://PASTE-TENANT-NAME.ciamlogin.com/PASTE-TENANT-ID/v2.0",
    redirectUri: window.location.origin
  },
  cache: {
    cacheLocation: "sessionStorage"
  }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

document.getElementById("signinBtn").onclick = () => {
  msalInstance.loginRedirect({
    scopes: ["openid", "profile"]
  });
};

msalInstance.handleRedirectPromise().then(response => {
  if (response && response.account) {
    document.body.innerHTML =
      "<h2 style='text-align:center;margin-top:30px'>✅ Authentication Successful</h2>";
  }
}).catch(console.error);
