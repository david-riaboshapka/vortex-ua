import { db } from '@/lib/db';

export default async function ProjectPage({ params }) {
  const { id } = await params;

  const { rows } = await db.query(
    `
    SELECT
      p.id,
      p.title,
      p.description,
      p.tech_stack,

      i.image_url,
      i.is_main

    FROM portfolio_projects p
    LEFT JOIN portfolio_images i
      ON i.project_id = p.id

    WHERE p.id = $1
    `,
    [id]
  );

  if (rows.length === 0) {
    return <h1>Проект не найден</h1>;
  }

  // ===== собираем проект =====
  const project = {
    id: rows[0].id,
    title: rows[0].title,
    description: rows[0].description,
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
    <section>
      <div className="container">
        <h2>{project.title}</h2>

        <p>{project.description}</p>

        <p>
          <b>Стек:</b> {project.tech_stack}
        </p>

        <div className="project-gallery">
          {project.images.map((img, index) => (
            <img
              key={index}
              src={img.image_url}
              alt={project.title}
              style={{ width: 300, marginRight: 10 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
