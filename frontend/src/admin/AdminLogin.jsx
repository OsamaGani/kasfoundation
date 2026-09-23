import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    if (!username.trim()) {
      setError("Please enter username.");
      return;
    }

    if (!password) {
      setError("Please enter password.");
      return;
    }

    setLoading(true);

    /*
      Temporary admin login.

      You can change these credentials later
      when we connect proper backend authentication.
    */

    const ADMIN_USERNAME = "admin";
    const ADMIN_PASSWORD = "admin123";

    setTimeout(() => {
      if (
        username.trim() === ADMIN_USERNAME &&
        password === ADMIN_PASSWORD
      ) {
        localStorage.setItem(
          "kas_admin_logged_in",
          "true"
        );

        navigate("/admin/dashboard");
      } else {
        setError(
          "Invalid username or password."
        );
      }

      setLoading(false);
    }, 500);
  };

  return (
    <main className="admin-login-page">

      {/* =========================================
          LEFT SIDE
      ========================================= */}

      <section className="admin-login-brand">

        <div className="admin-login-brand-overlay"></div>

        <div className="admin-login-brand-content">

          <img
            src="/assets/images/kaslogo.png"
            alt="KAS Foundation"
            className="admin-login-logo"
          />

          <span className="admin-login-brand-label">
            KHEL AUR SHIKSHA FOUNDATION
          </span>

          <h1>
            KAS Foundation
          </h1>

          <p>
            Manage your foundation website,
            galleries and content from one
            powerful admin panel.
          </p>

        </div>

      </section>


      {/* =========================================
          RIGHT SIDE
      ========================================= */}

      <section className="admin-login-section">

        <div className="admin-login-card">

          <div className="admin-login-icon">
            <LockKeyhole size={28} />
          </div>

          <div className="admin-login-heading">

            <span>
              ADMIN PANEL
            </span>

            <h2>
              Welcome Back
            </h2>

            <p>
              Sign in to access the KAS Foundation
              administration panel.
            </p>

          </div>


          {/* ERROR */}

          {error && (
            <div className="admin-login-error">
              {error}
            </div>
          )}


          {/* FORM */}

          <form
            className="admin-login-form"
            onSubmit={handleSubmit}
          >

            {/* USERNAME */}

            <div className="admin-login-field">

              <label htmlFor="admin-username">
                Username
              </label>

              <input
                id="admin-username"
                type="text"
                value={username}
                onChange={(event) =>
                  setUsername(event.target.value)
                }
                placeholder="Enter username"
                autoComplete="username"
                disabled={loading}
              />

            </div>


            {/* PASSWORD */}

            <div className="admin-login-field">

              <label htmlFor="admin-password">
                Password
              </label>

              <div className="admin-password-wrapper">

                <input
                  id="admin-password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Enter password"
                  autoComplete="current-password"
                  disabled={loading}
                />

                <button
                  type="button"
                  className="admin-password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (current) => !current
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

            </div>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="admin-login-button"
              disabled={loading}
            >

              {loading ? (
                <>
                  <span className="admin-login-loader"></span>
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn size={19} />
                  Sign In
                </>
              )}

            </button>

          </form>


          {/* DEMO CREDENTIALS */}

          <div className="admin-login-demo">

            <span>
              Admin Access
            </span>

            <p>
              Username: <strong>admin</strong>
            </p>

            <p>
              Password: <strong>admin123</strong>
            </p>

          </div>


          <div className="admin-login-footer">
            © {new Date().getFullYear()} Khel Aur
            Shiksha Foundation
          </div>

        </div>

      </section>

    </main>
  );
}

export default AdminLogin;