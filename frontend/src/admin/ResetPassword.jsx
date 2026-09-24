import { useState } from "react";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
} from "lucide-react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import "./ResetPassword.css";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!token) {
      setError("Invalid reset link.");
      return;
    }

    if (!password) {
      setError("Please enter a new password.");
      return;
    }

    if (password.length < 8) {
      setError(
        "Password must be at least 8 characters."
      );
      return;
    }

    if (!confirmPassword) {
      setError(
        "Please confirm your new password."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/admin/reset-password/${token}`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(
          "Password reset successful. Redirecting to login..."
        );

        setPassword("");
        setConfirmPassword("");

        setTimeout(() => {
          navigate("/admin/login");
        }, 2000);

        return;
      }

      setError(
        data.message ||
          "Unable to reset password."
      );
    } catch (error) {
      console.error(
        "Reset password error:",
        error
      );

      setError(
        "Unable to connect to server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="reset-password-page">

      {/* LEFT BRAND SECTION */}
      <section className="reset-password-brand">

        <div className="reset-password-brand-overlay"></div>

        <div className="reset-password-brand-content">

          <img
            src="/assets/images/kaslogo.png"
            alt="KAS Foundation"
            className="reset-password-logo"
          />

          <span className="reset-password-brand-label">
            KHEL AUR SHIKSHA FOUNDATION
          </span>

          <h1>KAS Foundation</h1>

          <p>
            Create a new secure password for your
            foundation administration account.
          </p>

        </div>

      </section>

      {/* RIGHT FORM SECTION */}
      <section className="reset-password-section">

        <div className="reset-password-card">

          <div className="reset-password-icon">
            <LockKeyhole size={28} />
          </div>

          <div className="reset-password-heading">

            <span>SECURITY</span>

            <h2>Reset Password</h2>

            <p>
              Create a new password for your
              administrator account.
            </p>

          </div>

          {error && (
            <div className="reset-password-error">
              {error}
            </div>
          )}

          {success && (
            <div className="reset-password-success">
              <CheckCircle2 size={18} />
              <span>{success}</span>
            </div>
          )}

          <form
            className="reset-password-form"
            onSubmit={handleSubmit}
          >

            {/* PASSWORD */}
            <div className="reset-password-field">

              <label htmlFor="new-password">
                New Password
              </label>

              <div className="reset-password-input-wrapper">

                <LockKeyhole size={18} />

                <input
                  id="new-password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  disabled={loading}
                />

                <button
                  type="button"
                  className="reset-password-toggle"
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
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

              <small>
                Password must contain at least
                8 characters.
              </small>

            </div>

            {/* CONFIRM PASSWORD */}
            <div className="reset-password-field">

              <label htmlFor="confirm-password">
                Confirm Password
              </label>

              <div className="reset-password-input-wrapper">

                <LockKeyhole size={18} />

                <input
                  id="confirm-password"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(
                      event.target.value
                    )
                  }
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                  disabled={loading}
                />

                <button
                  type="button"
                  className="reset-password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      (current) => !current
                    )
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            <button
              type="submit"
              className="reset-password-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="reset-password-loader"></span>
                  Resetting...
                </>
              ) : (
                <>
                  <LockKeyhole size={18} />
                  Reset Password
                </>
              )}
            </button>

          </form>

          <Link
            to="/admin/login"
            className="reset-password-login-link"
          >
            Back to Login
          </Link>

          <div className="reset-password-footer">
            © {new Date().getFullYear()} Khel Aur
            Shiksha Foundation
          </div>

        </div>

      </section>

    </main>
  );
}

export default ResetPassword;