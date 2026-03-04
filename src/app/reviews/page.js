export const dynamic = 'force-dynamic';

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
        <h2 className={styles.mainTitle}>Customer Reviews</h2>

        {/* СПИСОК ОТЗЫВОВ */}
        <div className={styles.reviewsList}>
          {reviews.length === 0 && (
            <p className={styles.emptyMessage}>
              There are no reviews published yet. Be the first!
            </p>
          )}

          {reviews.map((review) => (
            <div className={styles.reviewCard} key={review.id}>
              {/* Шапка карточки: Проект, Имя, Рейтинг */}
              <div className={styles.cardHeader}>
                <div>
                  <span className={styles.projectBadge}>
                    project: {review.project_title}
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
            <h3 className={styles.formTitle}>Leave a review</h3>

            <select name="project_id" required className={styles.select}>
              <option value="">Select a project...</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>

            <input
              name="author_name"
              placeholder="Name"
              required
              className={styles.input}
            />

            <select name="raiting" required className={styles.select}>
              <option value="">Assessment (1-5)</option>
              <option value="5">5 — Excellent</option>
              <option value="4">4 — Good</option>
              <option value="3">3 — Normal</option>
              <option value="2">2 — Bad</option>
              <option value="1">1 — Terrible</option>
            </select>

            <textarea
              name="text"
              placeholder="Tell us more about working with us..."
              required
              className={styles.textarea}
            />

            <button type="submit" className={styles.submitButton}>
              Send feedback
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}