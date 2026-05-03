"use client";

import { useState, useEffect } from "react";
import axios from "axios";
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
      const response = await axios.get(`${API_URL}/api/contents`);
      setContents(response.data);
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
      await axios.post(`${API_URL}/api/contents`, formData);
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
      await axios.delete(`${API_URL}/api/contents/${id}`);
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
