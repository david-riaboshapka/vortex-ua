'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createPost(formData) {
  const title = formData.get('title');

  await db.query(
    'INSERT INTO posts (title) VALUES ($1)',
    [title]
  );

  revalidatePath('/admin');
}

export async function deletePost(id) {
  await db.query(
    'DELETE FROM posts WHERE id = $1',
    [id]
  );

  revalidatePath('/admin');
}

// ✏️ РЕДАКТИРОВАНИЕ
export async function updatePost(formData) {
  const id = formData.get('id');
  const title = formData.get('title');

  await db.query(
    'UPDATE posts SET title = $1 WHERE id = $2',
    [title, id]
  );

  revalidatePath('/admin');
}
