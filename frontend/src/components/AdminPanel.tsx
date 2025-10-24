import React, { useState } from "react";
import "./AdminPanel.css";

interface AdminPanelProps {
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [adminKey, setAdminKey] = useState("");
  const [tonsCollected, setTonsCollected] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/garbage-collection",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tonsCollected: parseFloat(tonsCollected),
            adminKey: adminKey,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage("✅ Garbage collection data updated successfully!");
        setTonsCollected("");
        // Refresh the page to show updated data
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setMessage(`❌ Error: ${result.message}`);
      }
    } catch (error) {
      setMessage("❌ Error updating data. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-overlay">
      <div className="admin-panel">
        <div className="admin-header">
          <h3>🔧 Admin Panel</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="admin-content">
          <p>Update garbage collection data for the website.</p>

          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label htmlFor="adminKey">Admin Key:</label>
              <input
                type="password"
                id="adminKey"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="Enter admin key"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="tonsCollected">Tons of Garbage Collected:</label>
              <input
                type="number"
                id="tonsCollected"
                value={tonsCollected}
                onChange={(e) => setTonsCollected(e.target.value)}
                placeholder="Enter tons collected"
                step="0.1"
                min="0"
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Data"}
            </button>
          </form>

          {message && (
            <div
              className={`admin-message ${
                message.includes("✅") ? "success" : "error"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
