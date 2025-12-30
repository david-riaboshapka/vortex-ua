"use server"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function UpdateRequests(formData) {
  const id = formData.get("id");
  const status = formData.get("status");

  await db.query(
    `
    UPDATE project_requests
    SET status = $1
    WHERE id = $2
    `,
    [status, id]
  );

  revalidatePath("/admin");
}
export async function DeleteRequests(id_req) {
    const id = id_req.get('id');

  await db.query(
    'DELETE FROM project_requests WHERE id = $1',
    [id]
  );

  revalidatePath("/admin");
}

