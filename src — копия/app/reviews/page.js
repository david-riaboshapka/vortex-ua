import { db } from "@/lib/db";
import { CreateReviews } from "../admin/reviews";
import styles from "./Reviews.module.css";

export default async function Reviews() {
  const { rows: projects } = await db.query(`
    SELECT id, title
    FROM portfolio_projects
    ORDER BY id DESC
  `);

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
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.mainTitle}>Отзывы клиентов</h2>

        {/* СПИСОК ОТЗЫВОВ */}
        <div className={styles.reviewsList}>
          {reviews.length === 0 && (
            <p className={styles.emptyMessage}>
              Пока нет опубликованных отзывов. Будьте первым!
            </p>
          )}

          {reviews.map((review) => (
            <div className={styles.reviewCard} key={review.id}>
              {/* Шапка карточки: Проект, Имя, Рейтинг */}
              <div className={styles.cardHeader}>
                <div>
                  <span className={styles.projectBadge}>
                    Проект: {review.project_title}
                  </span>
                  <h4 className={styles.authorName}>{review.author_name}</h4>
                </div>

                <div className={styles.ratingBadge}>
                  <span>★</span> {review.rating}/5
                </div>
              </div>

              {/* Тело карточки */}
              <p className={styles.reviewText}>{review.text}</p>
            </div>
          ))}
        </div>

        {/* ФОРМА ДОБАВЛЕНИЯ */}
        <div className={styles.formWrapper}>
          <form action={CreateReviews} className={styles.formGrid}>
            <h3 className={styles.formTitle}>Оставить отзыв</h3>

            <select name="project_id" required className={styles.select}>
              <option value="">Выберите проект...</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>

            <input
              name="author_name"
              placeholder="Ваше имя"
              required
              className={styles.input}
            />

            <select name="raiting" required className={styles.select}>
              <option value="">Оценка (1-5)</option>
              <option value="5">5 — Отлично</option>
              <option value="4">4 — Хорошо</option>
              <option value="3">3 — Нормально</option>
              <option value="2">2 — Плохо</option>
              <option value="1">1 — Ужасно</option>
            </select>

            <textarea
              name="text"
              placeholder="Расскажите подробнее о работе с нами..."
              required
              className={styles.textarea}
            />

            <button type="submit" className={styles.submitButton}>
              Отправить отзыв
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}