import { useEffect, useState } from "react";
import { Mail, Send, Users } from "lucide-react";

const API_URL = `${import.meta.env.VITE_API_URL}/api/subscribers`;

function AdminNewsletter() {
  const [subscribers, setSubscribers] = useState([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState("");

  /* =========================================================
     FETCH SUBSCRIBERS
  ========================================================= */

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch subscribers."
        );
      }

      setSubscribers(data.subscribers || []);
    } catch (error) {
      console.error("Subscribers fetch error:", error);
      setError(
        error.message || "Unable to load subscribers."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  /* =========================================================
     SEND NEWSLETTER
  ========================================================= */

  const handleSendNewsletter = async (event) => {
    event.preventDefault();

    if (!subject.trim()) {
      setError("Please enter a subject.");
      setStatusMessage("");
      return;
    }

    if (!message.trim()) {
      setError("Please enter a message.");
      setStatusMessage("");
      return;
    }

    if (subscribers.length === 0) {
      setError("No subscribers available.");
      setStatusMessage("");
      return;
    }

    const confirmed = window.confirm(
      `Send this newsletter to ${subscribers.length} subscriber(s)?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setSending(true);
      setError("");
      setStatusMessage("");

      const response = await fetch(`${API_URL}/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: subject.trim(),
          message: message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to send newsletter."
        );
      }

      setStatusMessage(
        data.message || "Newsletter sent successfully!"
      );

      setSubject("");
      setMessage("");
    } catch (error) {
      console.error("Newsletter send error:", error);

      setError(
        error.message ||
          "Unable to send newsletter."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <span className="admin-page-eyebrow">
            NEWSLETTER
          </span>

          <h1>Newsletter</h1>

          <p>
            Manage subscribers and send newsletter
            updates.
          </p>
        </div>
      </div>

      {error && (
        <div
          style={{
            marginBottom: "20px",
            padding: "12px 15px",
            borderRadius: "8px",
            background: "#fff1f1",
            color: "#c33c3c",
            fontSize: "13px",
          }}
        >
          {error}
        </div>
      )}

      {statusMessage && (
        <div
          style={{
            marginBottom: "20px",
            padding: "12px 15px",
            borderRadius: "8px",
            background: "#edf8f1",
            color: "#278045",
            fontSize: "13px",
          }}
        >
          {statusMessage}
        </div>
      )}

      {/* =====================================================
          SUBSCRIBER COUNT
      ===================================================== */}

      <section
        style={{
          marginBottom: "25px",
          padding: "22px",
          background: "#ffffff",
          borderRadius: "12px",
          border: "1px solid #e1e7ea",
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "10px",
            background: "#edf6f9",
            color: "#0b6385",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Users size={23} />
        </div>

        <div>
          <div
            style={{
              fontSize: "12px",
              color: "#7d8b94",
              marginBottom: "3px",
            }}
          >
            Total Subscribers
          </div>

          <strong
            style={{
              fontSize: "24px",
              color: "#1b2e3d",
            }}
          >
            {subscribers.length}
          </strong>
        </div>
      </section>

      {/* =====================================================
          SEND NEWSLETTER
      ===================================================== */}

      <section
        style={{
          marginBottom: "30px",
          padding: "25px",
          background: "#ffffff",
          borderRadius: "12px",
          border: "1px solid #e1e7ea",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <Mail size={19} color="#0b6385" />

          <h2
            style={{
              margin: 0,
              fontSize: "19px",
              color: "#1b2e3d",
            }}
          >
            Send Newsletter
          </h2>
        </div>

        <form onSubmit={handleSendNewsletter}>
          <div style={{ marginBottom: "18px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "7px",
                fontSize: "12px",
                fontWeight: "700",
                color: "#344754",
              }}
            >
              Subject
            </label>

            <input
              type="text"
              value={subject}
              onChange={(event) =>
                setSubject(event.target.value)
              }
              placeholder="Enter newsletter subject"
              disabled={sending}
              style={{
                width: "100%",
                height: "44px",
                padding: "0 13px",
                boxSizing: "border-box",
                border: "1px solid #dce4e8",
                borderRadius: "9px",
                outline: "none",
                fontSize: "13px",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "7px",
                fontSize: "12px",
                fontWeight: "700",
                color: "#344754",
              }}
            >
              Message
            </label>

            <textarea
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              placeholder="Write your newsletter message..."
              rows="10"
              disabled={sending}
              style={{
                width: "100%",
                padding: "13px",
                boxSizing: "border-box",
                border: "1px solid #dce4e8",
                borderRadius: "9px",
                outline: "none",
                resize: "vertical",
                fontSize: "13px",
                lineHeight: "1.6",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={sending || subscribers.length === 0}
            style={{
              minHeight: "44px",
              padding: "0 18px",
              border: "none",
              borderRadius: "8px",
              background:
                sending || subscribers.length === 0
                  ? "#b9c4c9"
                  : "#0b6385",
              color: "#ffffff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              fontSize: "13px",
              fontWeight: "700",
              cursor:
                sending || subscribers.length === 0
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            <Send size={16} />

            {sending
              ? "Sending..."
              : "Send Newsletter"}
          </button>
        </form>
      </section>

      {/* =====================================================
          SUBSCRIBERS
      ===================================================== */}

      <section
        style={{
          padding: "25px",
          background: "#ffffff",
          borderRadius: "12px",
          border: "1px solid #e1e7ea",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "19px",
              color: "#1b2e3d",
            }}
          >
            Subscribers
          </h2>

          <span
            style={{
              fontSize: "12px",
              color: "#7d8b94",
            }}
          >
            {subscribers.length} Subscribers
          </span>
        </div>

        {loading ? (
          <div
            style={{
              padding: "40px 20px",
              textAlign: "center",
              color: "#7d8b94",
              fontSize: "13px",
            }}
          >
            Loading subscribers...
          </div>
        ) : subscribers.length === 0 ? (
          <div
            style={{
              padding: "40px 20px",
              textAlign: "center",
              color: "#7d8b94",
              fontSize: "13px",
            }}
          >
            No subscribers yet.
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              overflowX: "auto",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "500px",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "12px",
                      background: "#f7f9fa",
                      color: "#53636e",
                      fontSize: "11px",
                    }}
                  >
                    #
                  </th>

                  <th
                    style={{
                      textAlign: "left",
                      padding: "12px",
                      background: "#f7f9fa",
                      color: "#53636e",
                      fontSize: "11px",
                    }}
                  >
                    EMAIL
                  </th>

                  <th
                    style={{
                      textAlign: "left",
                      padding: "12px",
                      background: "#f7f9fa",
                      color: "#53636e",
                      fontSize: "11px",
                    }}
                  >
                    DATE
                  </th>

                  <th
                    style={{
                      textAlign: "left",
                      padding: "12px",
                      background: "#f7f9fa",
                      color: "#53636e",
                      fontSize: "11px",
                    }}
                  >
                    STATUS
                  </th>
                </tr>
              </thead>

              <tbody>
                {subscribers.map(
                  (subscriber, index) => (
                    <tr key={subscriber._id}>
                      <td
                        style={{
                          padding: "13px 12px",
                          borderBottom:
                            "1px solid #edf0f2",
                          fontSize: "12px",
                          color: "#7d8b94",
                        }}
                      >
                        {index + 1}
                      </td>

                      <td
                        style={{
                          padding: "13px 12px",
                          borderBottom:
                            "1px solid #edf0f2",
                          fontSize: "13px",
                          color: "#263946",
                          fontWeight: "600",
                        }}
                      >
                        {subscriber.email}
                      </td>

                      <td
                        style={{
                          padding: "13px 12px",
                          borderBottom:
                            "1px solid #edf0f2",
                          fontSize: "12px",
                          color: "#7d8b94",
                        }}
                      >
                        {subscriber.createdAt
                          ? new Date(
                              subscriber.createdAt
                            ).toLocaleDateString()
                          : "-"}
                      </td>

                      <td
                        style={{
                          padding: "13px 12px",
                          borderBottom:
                            "1px solid #edf0f2",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-block",
                            padding:
                              "5px 9px",
                            borderRadius: "20px",
                            background:
                              subscriber.isActive
                                ? "#eaf8ef"
                                : "#f1f3f4",
                            color:
                              subscriber.isActive
                                ? "#278045"
                                : "#7a858d",
                            fontSize: "10px",
                            fontWeight: "800",
                          }}
                        >
                          {subscriber.isActive
                            ? "Active"
                            : "Inactive"}
                        </span>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminNewsletter;