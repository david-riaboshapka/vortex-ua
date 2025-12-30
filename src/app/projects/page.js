import Link from 'next/link';
import { db } from '@/lib/db';
export default async function Portfolio() {
  const { rows } = await db.query(
    ` 
    SELECT
      portfolio_projects.id,
      portfolio_projects.title,
      portfolio_projects.site_url,
      portfolio_images.image_url AS main_image
    FROM portfolio_projects
    LEFT JOIN portfolio_images
      ON portfolio_images.project_id = portfolio_projects.id
      AND portfolio_images.is_main = true
    ORDER BY portfolio_projects.id DESC;

  `
  );
  return (
    <section>
      <div className="container">
        <h2>Портфолио</h2>
        <div className="project-cont">
          {rows.map(project => (
            <Link href={`/projects/${project.id}`} className="project-item" key={project.id}>
              <h4>{project.title}</h4>
              <img src={project.main_image} />
            </Link >
          ))}
        </div>
      </div>
    </section>

  );
}
