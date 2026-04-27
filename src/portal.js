console.log("✅ portal.js loaded");

const msalConfig = {
  auth: {
    clientId: "56a695df-9e09-40d4-86af-8472a432eb84",
    authority: "https://pkspss.ciamlogin.com/2a36f934-d891-484f-8d86-4593d52494a9",
    knownAuthorities: ["pkspss.ciamlogin.com"],   // ✅ CRITICAL
    redirectUri: window.location.origin
  },
  cache: {
    cacheLocation: "sessionStorage"
  }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

document.getElementById("signinBtn").addEventListener("click", () => {
  console.log("✅ Sign-in clicked");
  msalInstance.loginRedirect({
    scopes: ["openid", "profile"]
  });
});

msalInstance.handleRedirectPromise()
  .then(response => {
    if (response && response.account) {
      document.body.innerHTML =
        "<h2 style='text-align:center;margin-top:40px'>✅ Authentication Successful</h2>";
    }
  })
  .catch(error => console.error("❌ MSAL error", error));
