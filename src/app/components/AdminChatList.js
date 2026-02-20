import Link from "next/link";
import { db } from "@/lib/db"; // проверь, что db реально экспортируется из src/lib/db.js

async function AdminChatList() {
  const { rows: contacts } = await db.query(`
    SELECT DISTINCT u.id, u.name, u.email 
    FROM chat_messages m
    JOIN users u ON m.sender_id = u.id
    WHERE m.sender_id != 'admin'
  `);

  if (contacts.length === 0) {
    return (
      <p style={{ color: "#888", textAlign: "center", marginTop: "20px" }}>
        No messages yet
      </p>
    );
  }

  return (
    <div style={{ display: "grid", gap: "10px", marginTop: "20px" }}>
      {contacts.map((c) => (
        <Link
          href={`?chatWith=${c.id}`}
          key={c.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px",
            border: "1px solid #222",
            borderRadius: "8px",
            textDecoration: "none",
            color: "white",
            background: "#0a0a0a",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <strong style={{ fontSize: "16px" }}>{c.name}</strong>
            <span style={{ fontSize: "12px", color: "#888" }}>{c.email}</span>
          </div>
          <span style={{ fontSize: "20px", opacity: 0.5 }}>→</span>
        </Link>
      ))}
    </div>
  );
}

export default AdminChatList;