import {
  CreateProject,
  DeleteProject,
  UpdateProject,
  CreateProjectImage,
  UpdateProjectImage,
  DeleteProjectImage,
  MakeMainImage,
} from '../projects';
import '@/app/admin/admin.css';
export default function Projects({ projects }) {

    return (
        <section>
        <h1>Проекты</h1>

        {/* ➕ СОЗДАНИЕ ПРОЕКТА */}
        <form action={CreateProject} style={{ marginBottom: 20 }}>
          <input name="title" placeholder="Название" required />
          <input name="description" placeholder="Описание" required />
          <input name="tech_stack" placeholder="Стек (через запятую)" required />
          <input name="client_name" placeholder="Имя клиента" required />
          <input name="client_feedback" placeholder="Отзыв клиента" required />
          <input name="site_url" placeholder="link in project" required />
          <button>Добавить проект</button>
        </form>

        <ul>
          {projects.map(project => (
            <li key={project.id} style={{ marginBottom: 50 }}>
              {project.id}
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p><b>Клиент:</b> {project.client_name}</p>
              <p><b>Стек:</b> {project.tech_stack}</p>

              {/* ===== РЕДАКТИРОВАНИЕ ПРОЕКТА ===== */}
              <form action={UpdateProject} style={{ marginBottom: 15 }}>
                <input type="hidden" name="id" value={project.id} />
                <input name="title" defaultValue={project.title} />
                <input name="description" defaultValue={project.description} />
                <input name="tech_stack" defaultValue={project.tech_stack} />
                <input name="client_name" defaultValue={project.client_name} />
                <input name="client_feedback" defaultValue={project.client_feedback} />
                <input name="site_url" defaultValue={project.site_url} />
                <button>💾 Сохранить проект</button>
              </form>

              
              {project.images.length === 0 && (
                <form action={DeleteProject.bind(null, project.id)}>
                  <button>❌ Удалить проект</button>
                </form>
              )}
              <h4>Картинки</h4>

              {/* ➕ ДОБАВЛЕНИЕ КАРТИНКИ */}
              <form action={CreateProjectImage} style={{ marginBottom: 10 }}>
                <input type="hidden" name="project_id" value={project.id} />
                <input name="image_url" placeholder="URL изображения" required />
                <button>Добавить картинку</button>
              </form>
              <div className="photos">
                {project.images.map(image => (
                  <div key={image.id} className="photo-card">
                    <div className="photo-preview">
                      <img src={image.image_url} alt={project.title} />
                      {image.is_main && <span className="badge">⭐ Главная</span>}
                    </div>

                    <form action={UpdateProjectImage} className="photo-form">
                      <input type="hidden" name="id" value={image.id} />
                      <input name="image_url" defaultValue={image.image_url} />
                      <button>💾</button>
                    </form>

                    <div className="photo-actions">
                      {!image.is_main && (
                        <form action={MakeMainImage}>
                          <input type="hidden" name="image_id" value={image.id} />
                          <button className="main-btn">⭐</button>
                        </form>
                      )}

                      <form action={DeleteProjectImage.bind(null, image.id)}>
                        <button className="delete-btn">❌</button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>

            </li>
          ))}
        </ul>
      </section>
    );
}
