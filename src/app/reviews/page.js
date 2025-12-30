import { db } from "@/lib/db";
import { CreateReviews } from "../admin/reviews";

export default async function Reviews() {
  // Проекты для select
  const { rows: projects } = await db.query(`
    SELECT id, title
    FROM portfolio_projects
    ORDER BY id DESC
  `);

  // Опубликованные отзывы + название проекта
  const { rows: reviews } = await db.query(`
    SELECT
      r.id,
      r.author_name,
      r.rating,
      r.text,
      p.title AS project_title
    FROM portfolio_reviews r
    JOIN portfolio_projects p
      ON p.id = r.project_id
    WHERE r.is_public = true
    ORDER BY r.id DESC
  `);

  return (
    <section>
      <div className="container">
        <h2>Отзывы</h2>

        {/* СПИСОК ОТЗЫВОВ */}
        {reviews.length === 0 && (
          <p>Пока нет опубликованных отзывов</p>
        )}

        {reviews.map(review => (
          <div className="review-cont" key={review.id}>
            <span>Отзыв о проекте: {review.project_title}</span>
            <span>Имя автора: {review.author_name}</span>
            <span>Рейтинг отзыва: {review.rating}</span>
            <span>Текст отзыва: {review.text}</span>
          </div>
        ))}

        {/* ФОРМА ДОБАВЛЕНИЯ */}
        <form action={CreateReviews}>
          <h3>Оставить отзыв</h3>

          <select name="project_id" required>
            <option value="">Выберите проект</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
          </select>

          <input
            name="author_name"
            placeholder="Имя автора"
            required
          />

          {/* ⚠️ ИСПРАВЛЕНО: rating */}
          <select name="rating" required>
            <option value="">Выберите оценку</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <textarea
            name="text"
            placeholder="Текст отзыва"
            required
          />

          <button type="submit">Отправить</button>
        </form>
      </div>
    </section>
  );
}
