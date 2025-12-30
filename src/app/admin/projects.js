"use server"
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function CreateProject(formData) {
    const title = formData.get('title');
    const description = formData.get('description');
    const tech_stack_raw = formData.get('tech_stack');
    const client_name = formData.get('client_name');
    const client_feedback = formData.get('client_feedback');
    const site_url = formData.get('site_url');

    const tech_stack = tech_stack_raw.split(',').map(s => s.trim());

    await db.query(
        `
    INSERT INTO portfolio_projects
    (title, description, tech_stack, client_name, client_feedback, site_url)
    VALUES ($1, $2, $3, $4, $5, $6)
    `,
        [title, description, JSON.stringify(tech_stack), client_name, client_feedback, site_url]
    );

    revalidatePath('/admin');
}
export async function UpdateProject(formData) {
    const id = formData.get('id');
    const title = formData.get('title');
    const description = formData.get('description');
    const tech_stack_raw = formData.get('tech_stack');
    const client_name = formData.get('client_name');
    const client_feedback = formData.get('client_feedback');

    const tech_stack = tech_stack_raw.split(',').map(s => s.trim());

    await db.query(
        `
        UPDATE portfolio_projects
        SET
            title = $1,
            description = $2,
            tech_stack = $3,
            client_name = $4,
            client_feedback = $5
        WHERE id = $6
        `,
        [
            title,
            description,
            JSON.stringify(tech_stack),
            client_name,
            client_feedback,
            id,
        ]
    );

    revalidatePath("/admin");
}
export async function DeleteProject(id) {
    await db.query(
        'DELETE FROM portfolio_projects WHERE id = $1',
        [id]
    );
    revalidatePath('/admin');
}
export async function CreateProjectImage(formData) {
    const project_id = formData.get("project_id");
    const image_url = formData.get("image_url");
    const is_main = formData.get("is_main") === "on";

    await db.query(
        `
        INSERT INTO portfolio_images
        (project_id, image_url, is_main)
        VALUES ($1, $2, $3)
        `,
        [project_id, image_url, is_main]
    );

    revalidatePath("/admin");
}
export async function UpdateProjectImage(formData) {
  const id = formData.get('id');
  const image_url = formData.get('image_url');

  if (!id || !image_url) return;

  await db.query(
    `
    UPDATE portfolio_images
    SET image_url = $1
    WHERE id = $2
    `,
    [image_url, id]
  );

  revalidatePath('/admin');
}
export async function MakeMainImage(formData) {
    const image_id = formData.get('image_id');

    if (!image_id) return;

    const { rows } = await db.query(
        'SELECT project_id FROM portfolio_images WHERE id = $1',
        [image_id]
    );

    const project_id = rows[0]?.project_id;
    if (!project_id) return;

    await db.query(
        'UPDATE portfolio_images SET is_main = false WHERE project_id = $1',
        [project_id]
    );

    await db.query(
        'UPDATE portfolio_images SET is_main = true WHERE id = $1',
        [image_id]
    );

    revalidatePath('/admin');
}
export async function DeleteProjectImage(id) {
    await db.query(
        `DELETE FROM portfolio_images WHERE id = $1`,
        [id]
    );

    revalidatePath("/admin");
}