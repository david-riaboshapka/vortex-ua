import { db } from '@/lib/db';
import Link from 'next/link'
import Slider from '@/app/components/Slider';
import styles from './ProjectPage.module.css';

const formatUrl = (url) => {
  if (!url) return "#";
  return url.startsWith('http') ? url : `https://${url}`;
};

export default async function ProjectPage({ params }) {
  const { id } = await params;

  // 1. ЗАПРОС ПРОЕКТА (ПОЛНЫЙ)
  const { rows } = await db.query(
    `
    SELECT
      p.id,
      p.title,
      p.description,
      p.tech_stack,
      p.client_name,
      p.created_at,
      p.site_url,
      i.image_url,
      i.is_main
    FROM portfolio_projects p
    LEFT JOIN portfolio_images i
      ON i.project_id = p.id
    WHERE p.id = $1
    `,
    [id]
  );

  // 2. ЗАПРОС ОТЗЫВОВ (ПОЛНЫЙ)
  const { rows: reviews } = await db.query(
    `
    SELECT 
      id,
      project_id,
      author_name,
      rating,
      text,
      is_public,
      created_at
    FROM portfolio_reviews 
    WHERE project_id = $1 AND is_public = true
    ORDER BY created_at DESC
    `,
    [id]
  );

  if (rows.length === 0) {
    return <h1 className={styles.title}>Проект не найден</h1>;
  }

  // ===== Собираем объект проекта =====
  const project = {
    id: rows[0].id,
    title: rows[0].title,
    created_at: rows[0].created_at,
    client_name: rows[0].client_name,
    description: rows[0].description,
    site_url: rows[0].site_url,
    tech_stack: rows[0].tech_stack,
    images: []
  };

  rows.forEach(row => {
    if (row.image_url) {
      project.images.push({
        image_url: row.image_url,
        is_main: row.is_main
      });
    }
  });

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.contentGrid}>

          {/* ЛЕВАЯ ЧАСТЬ: ИНФО */}
          <div className={styles.infoColumn}>
            <h2 className={styles.title}>{project.title}</h2>

            <Link href={formatUrl(project.site_url)} target="_blank" className={styles.link}>
              {project.site_url || "Перейти на сайт"} →
            </Link>

            <span className={styles.date}>
              Дата создания: {new Date(project.created_at).toLocaleDateString()}
            </span>

            <p className={styles.description}>{project.description}</p>

            {/* ОТЗЫВЫ */}
            <div className={styles.reviewsContainer}>
              {reviews.length > 0 && <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>Отзывы</h3>}
              {reviews.map(rev => (
                <div key={rev.id} className={styles.reviewCard}>
                  <div className={styles.reviewTop}>
                    <strong className={styles.author}>{rev.author_name}</strong>
                    <span className={styles.rating}>★ {rev.rating}/5</span>
                  </div>
                  <div className={styles.containerInfo}>
                    <span className={styles.reviewText}>&quot;{rev.text}&quot;</span>
                    <small className={styles.reviewDate}>
                      {new Date(rev.created_at).toLocaleDateString()}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ПРАВАЯ ЧАСТЬ: СЛАЙДЕР */}
          <div className={styles.galleryColumn}>
            {/* тут было видео */}

            <iframe
              className="iframe"
              src="https://www.youtube.com/embed/jpqhTcEf1BY"
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen

            />
          </div>

        </div>
      </div>
    </section>
  );
}