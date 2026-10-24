import {useState } from "react";
import "./App.css";
import bookHavenLogo from "./BookHavenLogo.png";
import bookshelfImage from "./Bookshelf.jpg";

type SwitchAuthMode = "login" | "register";

function App() {
  const [mode, setMode] = useState<SwitchAuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [message, setMessage] = useState("");

  const isRegister = mode === "register";

  function changeMode(nextMode: SwitchAuthMode) {
    setMode(nextMode);
    setMessage("");
    setShowPassword(false);
    setAcceptedTerms(false);
  }

  function handleSubmit() {
    setMessage("");
    let isValid = true;

    if (isRegister && username.trim() === "") {
      setMessage("Please enter your username.");
      isValid = false;
    }

    if (isRegister && !acceptedTerms) {
      setMessage("Please agree to the Terms of Service and Privacy Policy to create an account.");
      isValid = false;
    }

    if (email.trim() === "") {
      setMessage("Please enter your email.");
      isValid = false;
    }
    else if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email.");
      isValid = false;
    }

    if (password.trim() === "") {
      setMessage("Please enter your password.");
      isValid = false;
    }
    else if (!passwordRegex.test(password)) {
      setMessage("Your password must be at least 8 characters long.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    setMessage(
      isRegister
        ? "Registration form validated successfully!"
        : "Login form validated successfully!"
    );
  }

  return (
    <main className="page">
      <header className="header">
        <img src={bookHavenLogo} alt="Book Haven Club Logo" width={50} height={50} />

        <a href="#home" className="brand" aria-label="Book Haven Club home">
          <span className="brand-name">Book Haven Club</span>
        </a>

        <span className="header-note">Your next chapter starts here</span>
      </header>

      <section className="layout" id="home">
        <section className="welcome" aria-label="Welcome to Book Haven Club">
          <img className="welcome-image" src={bookshelfImage} alt="A cozy bookshelf filled with books"/>

          <div className="welcome-copy">
            <span className="eyebrow">A COMMUNITY FOR READERS</span>
            <h1> Find your next <em>favorite</em> story. </h1>
            <p> Make room for new ideas, familiar worlds, and stories worth sharing. </p>
          </div>
        </section>

        <section className="card" aria-labelledby="auth-heading">
          <div className="heading">
            <span className="eyebrow">WELCOME TO THE CLUB</span>
            <h2 id="auth-heading">{isRegister ? "Create your account" : "Welcome back"}</h2>
            <p>{isRegister ? "Join a community made for people who love to read." : "Log in to continue your reading journey."}</p>
          </div>

          <div className="tabs" role="group" aria-label="Choose authentication mode">
            <button
              className={!isRegister ? "tab active" : "tab"}
              aria-pressed={!isRegister}
              type="button"
              onClick={() => changeMode("login")}
            >
              Log In
            </button>

            <button
              className={isRegister ? "tab active" : "tab"}
              aria-pressed={isRegister}
              type="button"
              onClick={() => changeMode("register")}
            >
              Sign Up
            </button>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            {isRegister && (
              <div className="field">
                <label htmlFor="username">Username</label>
                <input id="username"
                       type="text"
                       placeholder="Angela"
                       value={username}
                       onChange={(event) => setUserName(event.target.value)}
                       required
                />
              </div>
            )}

            <div className="field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="angela@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>

              <div className="password">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={isRegister ? "new-password" : "current-password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />

                <button
                  className="password-toggle"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {!isRegister && (
              <div className="options">
                <button className="text-button" type="button"
                  onClick={() =>
                    setMessage(
                      "Forgot Password is a demo feature and is not connected to a server."
                    )
                  }
                >
                  Forgot password?
                </button>
              </div>
            )}

            {isRegister && (
              <label className="terms">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(event) => setAcceptedTerms(event.target.checked)}
                  required
                />
                <span>
                  By creating an account, you agree to our <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>.
                </span>
              </label>
            )}

            {message && (
              <div className="message" role="status" aria-live="polite">
                {message}
              </div>
            )}

            <button className="submit" type="submit">
              {isRegister ? "Create my account" : "Log In"}
            </button>
          </form>

          <div className="card-footer">
            <span>
              {isRegister
                ? "Already have an account?"
                : "New to Book Haven Club?"}
            </span>

            <button
              className="text-button"
              type="button"
              onClick={() =>
                changeMode(isRegister ? "login" : "register")
              }
            >
              {isRegister ? "Log in" : "Create an account"}
            </button>
          </div>
        </section>
      </section>

      <footer className="page-footer">
        <span>© 2026 Book Haven Club</span>
      </footer>
    </main>
  );
}

export default App;
