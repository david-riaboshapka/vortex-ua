import { db } from '@/lib/db';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from 'next/link';
import ProjectForm from "./../dashboard/ProjectForm";
import Chat from './../components/Chat';

export default async function DashboardPage({ searchParams }) {
  // 1. Сначала проверяем, кто зашел
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const { chatWith } = await searchParams;
  const isAdmin = session.user.role === 'admin';

  // 2. Безопасность: если не админ лезет в чужой чат — выкидываем
  if (chatWith && !isAdmin) {
    redirect("/dashboard");
  }

  // 3. Загружаем заявки (через обычный if/else, так понятнее)
  let requests = [];
  if (isAdmin) {
    const res = await db.query(`SELECT * FROM project_requests ORDER BY created_at DESC`);
    requests = res.rows;
  } else {
    const res = await db.query(`SELECT * FROM project_requests WHERE user_id = $1 ORDER BY created_at DESC`, [session.user.id]);
    requests = res.rows;
  }

  // 4. Если это админ и он еще не выбрал чат — грузим список контактов прямо здесь
  let contacts = [];
  if (isAdmin && !chatWith) {
    const res = await db.query(`
      SELECT DISTINCT u.id, u.first_name, u.last_name, u.email 
      FROM chat_messages m
      JOIN users u ON m.sender_id = u.id::text
      WHERE m.sender_id != 'admin'
    `);
    contacts = res.rows;
  }

  return (
    <section className='dashboard'>
      <div className='infoUse-box'>
        <h1>{isAdmin ? 'Admin Dashboard' : 'Personal account'}</h1>
        <div className='userInfo'>
          <span>👋 {session.user.name}</span>
          <span>{session.user.email}</span>
        </div>
      </div>

      <div className='gridDash'>
        <div className='cardDash'>
          <h2>{isAdmin ? 'All requests' : 'New application'}</h2>
          {!isAdmin ? <ProjectForm /> : <p>Просмотр всех входящих заявок</p>}
        </div>

        <div className='cardDash'>
          <h2>{isAdmin ? 'Database log' : 'My applications'}</h2>
          {requests.length === 0 && <p className='empty'>No data found</p>}
          <div className='requestsDash'>
            {requests.map(request => (
              <div key={request.id} className='requestDash'>
                <div className='reqHeaderDash'>
                  <strong>{request.title}</strong>
                  <span className='statusDash'>{request.status}</span>
                </div>
                <p className='descriptionDash'>{request.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='chat-section' style={{ marginTop: '50px' }}>
        <h2 style={{ marginBottom: '20px' }}>
          {isAdmin ? 'Messages with clients' : 'Chat with manager'}
        </h2>

        {/* Логика админа */}
        {isAdmin && (
          <div>
            {chatWith ? (
              <>
                <Link href="/dashboard" style={{ display: 'inline-block', marginBottom: '15px', color: '#888' }}>
                  ← Back to list
                </Link>
                <Chat 
                  roomId={`room_${chatWith}`} 
                  senderId={session.user.id} 
                  senderName="Администратор"
                />
              </>
            ) : (
              /* Список контактов (вместо отдельного компонента AdminChatList) */
              <div style={{ display: 'grid', gap: '10px', marginTop: '20px' }}>
                {contacts.length === 0 && <p style={{ color: '#888', textAlign: 'center' }}>No messages yet</p>}
                {contacts.map(c => (
                  <Link 
                    href={`?chatWith=${c.id}`} 
                    key={c.id} 
                    style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '15px', border: '1px solid #222', borderRadius: '8px',
                      textDecoration: 'none', color: 'white', background: '#0a0a0a'
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <strong style={{ fontSize: '16px' }}>
                        {c.first_name || c.last_name ? `${c.first_name || ''} ${c.last_name || ''}`.trim() : c.email}
                      </strong>
                      <span style={{ fontSize: '12px', color: '#888' }}>{c.email}</span>
                    </div>
                    <span style={{ fontSize: '20px', opacity: 0.5 }}>→</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Логика пользователя */}
        {!isAdmin && (
          <Chat 
            roomId={`room_${session.user.id}`} 
            senderId={session.user.id} 
            senderName={session.user.name}
          />
        )}
      </div>
    </section>
  );
}