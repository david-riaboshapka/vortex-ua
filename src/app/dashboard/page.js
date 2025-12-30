import { db } from '@/lib/db';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ProjectForm from "./../dashboard/ProjectForm";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const { rows: requests } = await db.query(`
    SELECT id, title, description, budget, status, created_at
    FROM project_requests
    WHERE user_id = $1
    ORDER BY created_at DESC
  `, [session.user.id]);

  return (
    <section>
      <h1>Личный кабинет</h1>
      <div className="user-info">
        <p>Здравствуйте, {session.user.name}</p>
        <p>Email: {session.user.email}</p>
      </div>

      <h1>Форма заявки</h1>
      <ProjectForm />

      <h2>Мои заявки</h2>
      <div className="cont-req">
        {requests.map(request => (
          <div key={request.id} className="req-dashboard">
            <strong>{request.title}</strong>
            <p>{request.description}</p>
            <span>Статус: {request.status}</span>
            <span>Бюджет: {request.budget || 'Не указан'}</span>
            {/* Исправляем ошибку removeChild через атрибут гидратации */}
            <span suppressHydrationWarning>
              Дата: {new Date(request.created_at).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}