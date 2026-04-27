const msalConfig = {
  auth: {
    clientId: "PASTE-YOUR-CLIENT-ID-HERE",
    authority: "https://pkspss.ciamlogin.com/2a36f934-d891-484f-8d86-4593d52494a9/v2.0",
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
      "<h2 style='text-align:center;margin-top:40px'>✅ Authentication Successful</h2>";
  }
}).catch(console.error);
``
