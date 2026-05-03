"use client";

import { useState, useEffect } from "react";
import ContentForm from "@/components/ContentForm";
import ContentList from "@/components/ContentList";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function Home() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchContents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/contents`);
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setContents(data);
      setError("");
    } catch (err) {
      setError("Failed to load contents");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  const handleCreate = async (formData) => {
    try {
      const response = await fetch(`${API_URL}/api/contents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to create");
      setSuccess("Content created successfully!");
      setTimeout(() => setSuccess(""), 3000);
      fetchContents();
    } catch (err) {
      setError("Failed to create content");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      const response = await fetch(`${API_URL}/api/contents/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete");
      setSuccess("Content deleted successfully!");
      setTimeout(() => setSuccess(""), 3000);
      fetchContents();
    } catch (err) {
      setError("Failed to delete content");
    }
  };

  return (
    <main>
      <section style={{ marginBottom: "40px" }}>
        <h2>Create New Content</h2>
        <ContentForm onSubmit={handleCreate} />
      </section>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <section>
        <h2>All Contents</h2>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <ContentList contents={contents} onDelete={handleDelete} />
        )}
      </section>
    </main>
  );
}
