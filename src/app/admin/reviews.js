"use server"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
export async function CreateReviews(formData) {
  const author_name = formData.get('author_name');
  const raiting = formData.get('raiting');
  const text = formData.get('text');
  const project_id = formData.get('project_id');

  await db.query(
    `
    INSERT INTO portfolio_reviews
      (author_name, rating, text, project_id)
    VALUES
      ($1, $2, $3, $4)
    `,
    [author_name, raiting, text, project_id]
  );

  revalidatePath("/admin");
}
// export async function UpdateReviews(formData) {
//   const id = formData.get('id');
//   const author_name = formData.get('author_name');
//   const rating = Number(formData.get('rating'));
//   const text = formData.get('text');
//   const is_public = formData.get('is_public');

//   await db.query(
//     `UPDATE portfolio_reviews
//      SET author_name = $2,
//          rating = $3,
//          text = $4,
//          is_public = $5
//      WHERE id = $1`,
//     [id, author_name, rating, text, is_public]
//   );

//   revalidatePath("/admin");
// }
export async function UpdateReviews(formData) {
  const id = formData.get('id');
  const author_name = formData.get('author_name');
  const text = formData.get('text');
  const is_public = formData.get('is_public') === 'on';

  // 1. Принудительно превращаем в целое число
  let rating = parseInt(formData.get('rating'), 10);

  // 2. Валидация: если рейтинг не число или вне диапазона 1-5
  if (isNaN(rating) || rating < 1) {
    rating = 1; // Минимальное значение по умолчанию
  } else if (rating > 5) {
    rating = 5; // Максимальное значение по умолчанию
  }

  try {
    await db.query(
      `UPDATE portfolio_reviews
       SET author_name = $2,
           rating = $3,
           text = $4,
           is_public = $5
       WHERE id = $1`,
      [id, author_name, rating, text, is_public]
    );
  } catch (error) {
    console.error("Database Error Details:", error);
    throw error;
  }

  revalidatePath("/admin");
}
export async function DeleteReviews(formData) {
  const id = formData.get('id');

  await db.query(
    `DELETE FROM portfolio_reviews
     WHERE id = $1`,
    [id]
  );

  revalidatePath("/admin");
}