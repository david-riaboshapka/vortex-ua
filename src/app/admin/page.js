import { db } from '@/lib/db';
import Post from './components/posts';
import Projects from './components/projects';
import Reviews from './components/reviews';
import Requests from './components/requests';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";
export const revalidate = 0;

  export default async function AdminPage() {
    const session = await getServerSession(authOptions);

    // 2. Проверяем роль. Если не админ — выкидываем на главную
    if (!session || session.user.role !== "admin") {
        redirect("/"); // Серверный редирект
    }
    const { rows: posts } = await db.query(
      'SELECT * FROM posts ORDER BY id DESC'
    );
    const { rows } = await db.query(`
      SELECT
        p.id,
        p.title,
        p.description,
        p.tech_stack,
        p.client_name,
        p.client_feedback,
        P.site_url,

        i.id AS image_id,
        i.image_url,
        i.is_main

      FROM portfolio_projects p
      LEFT JOIN portfolio_images i
        ON i.project_id = p.id

      ORDER BY p.id DESC
    `);
    const { rows: requests } = await db.query(`
      SELECT 
        project_requests.id,
        project_requests.title,
        project_requests.description,
        project_requests.budget,
        project_requests.status,
        project_requests.created_at,

        users.id AS user_id,
        users.email,
        users.first_name,
        users.last_name,
        users.phone

      FROM project_requests

      JOIN users
        ON users.id = project_requests.user_id

      ORDER BY project_requests.created_at DESC
    `);

    const projectsMap = new Map();
    rows.forEach(row => {
      if (!projectsMap.has(row.id)) {
        projectsMap.set(row.id, {
          id: row.id,
          title: row.title,
          description: row.description,
          tech_stack: row.tech_stack,
          client_name: row.client_name,
          client_feedback: row.client_feedback,
          site_url: row.site_url,
          images: [],
        });
      }

      if (row.image_id) {
        projectsMap.get(row.id).images.push({
          id: row.image_id,
          image_url: row.image_url,
          is_main: row.is_main,
        });
      }
    });
    const projects = Array.from(projectsMap.values());

    const { rows: reviews } = await db.query(
      'SELECT * FROM portfolio_reviews ORDER BY id DESC'
    );
    return (
      <div className='wrapperRess'>
        <Post posts={posts} />
        <Projects projects={projects} />
        <Reviews reviews={reviews} projects={projects} />
        <Requests requests={requests} />

      </div>

    );
  }

















