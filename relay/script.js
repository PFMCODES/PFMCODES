const BASE_URL = "http://localhost:5000";

function logInPrompt() {
    let liprompt = document.getElementById('liprompt');
    
    liprompt.innerHTML = `
        <main class='prompt-main' 
            style="
                position: fixed; 
                top: 50%; left: 50%; 
                transform: translate(-50%, -50%);
                width: 80%; height: 75%;
                background: white; 
                padding: 20px; 
                box-shadow: 0px 0px 15px rgba(0,0,0,0.2); 
                border-radius: 15px;
                display: flex; 
                flex-direction: column; 
                justify-content: center; 
                align-items: center;
            ">
            
            <button onclick="document.getElementById('liprompt').style.display = 'none'" 
                style="
                    position: absolute; 
                    top: 15px; right: 15px; 
                    background: none; 
                    border: none; 
                    font-size: 24px; 
                    cursor: pointer;">
                &times;
            </button>

            <button onclick="googleLogin()" style="
                display: flex; 
                align-items: center; 
                padding: 12px 20px; 
                border: none; 
                background: #7FE883; 
                border-radius: 10px; 
                font-size: 18px; 
                cursor: pointer;
                width: 70%;
                max-width: 400px;
                justify-content: center;">
                <img src='google.svg' alt="Google Logo">
                Log In with Google
            </button>

            <p style="margin: 20px 0; font-size: 18px;">or</p>

            <a href="LogIn/" style="width: 70%; max-width: 400px;">
                <button style="
                    width: 100%;
                    padding: 12px;
                    border: none;
                    background: #7FE883;
                    border-radius: 10px;
                    font-size: 18px;
                    cursor: pointer;
                    margin-bottom: 10px;">
                    Log In
                </button>
            </a>

            <a href="SignUp/" style="width: 70%; max-width: 400px;">
                <button style="
                    width: 100%;
                    padding: 12px;
                    border: none;
                    background: #7FE883;
                    border-radius: 10px;
                    font-size: 18px;
                    cursor: pointer;">
                    Sign Up
                </button>
            </a>
        </main>
    `;

    liprompt.style.position = 'fixed';
    liprompt.style.top = '0';
    liprompt.style.left = '0';
    liprompt.style.width = '100vw';
    liprompt.style.height = '100vh';
    liprompt.style.background = 'rgba(0, 0, 0, 0.5)'; 
    liprompt.style.display = 'flex';
    liprompt.style.justifyContent = 'center';
    liprompt.style.alignItems = 'center';
    liprompt.style.display = 'block';
}

// Open Google Login
function googleLogin() {
    window.location.href = `${BASE_URL}/auth/google/callback`;
}

// Logout User
function logout() {
    const clientId = "464201624044-q0n0pj7qa1do8brnpnj78m2j0jh7vgin.apps.googleusercontent.com";
    const redirectUri = encodeURIComponent("http://localhost:8000/oauth/callback");
    const scope = "email profile";
    window.location.href = `${BASE_URL}/logout`;
}

// Check Login Status (Optional)
async function checkLoginStatus() {
    const response = await fetch(`${BASE_URL}/auth/status`, { credentials: "include" });
    const data = await response.json();
    
    if (data.user) {
        document.getElementById("user-info").innerHTML = `Welcome, ${data.user.username}!`;
    } else {
        document.getElementById("user-info").innerHTML = "Not logged in.";
    }
}

// Call on page load
checkLoginStatus();