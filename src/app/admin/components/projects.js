import {
  CreateProject,
  DeleteProject,
  UpdateProject,
  CreateProjectImage,
  UpdateProjectImage,
  DeleteProjectImage,
  CreateProjectVideo,
  MakeMainImage,
} from '../projects';

export default function Projects({ projects }) {

  return (
    <section className='wrapper'>
      <h1 className='titleRess'>Проекты</h1>

      <form action={CreateProject} className='formRess'>
        <input name="title" placeholder="Название" required />
        <input name="description" placeholder="Описание" required />
        <input name="tech_stack" placeholder="Стек (через запятую)" required />
        <input name="client_name" placeholder="Имя клиента" required />
        <input name="client_feedback" placeholder="Отзыв клиента" required />
        <input name="site_url" placeholder="link in project" required />
        <button>Добавить проект</button>
      </form>

      <ul className='listRess'>
        {projects.map(project => (
          <li key={project.id} className='projectRess'>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p className='metaRess'><b>Клиент:</b> {project.client_name}</p>
            <p className='metaRess'><b>Стек:</b> {project.tech_stack}</p>

            {/* РЕДАКТИРОВАНИЕ */}
            <form action={UpdateProject} className='formRess'>
              <input type="hidden" name="id" value={project.id} />
              <input name="title" defaultValue={project.title} />
              <input name="description" defaultValue={project.description} />
              <input name="tech_stack" defaultValue={project.tech_stack} />
              <input name="client_name" defaultValue={project.client_name} />
              <input name="client_feedback" defaultValue={project.client_feedback} />
              <input name="site_url" defaultValue={project.site_url} />
              <button>💾 Сохранить</button>
            </form>

            {project.images.length === 0 && (
              <form className='formRess' action={DeleteProject.bind(null, project.id)}>
                <button className='danger'>❌ Удалить проект</button>
              </form>
            )}

            <h4>Картинки</h4>

            <form action={CreateProjectImage} className='formRess'>
              <input type="hidden" name="project_id" value={project.id} />
              <input name="image_url" placeholder="URL изображения" required />
              <button>Добавить картинку</button>
            </form>

            <div className='photosRess'>
              {project.images.map(image => (
                <div key={image.id} className='photoCardRess'>
                  <div className='photoPreviewRess'>
                    <img src={image.image_url} alt={project.title} />
                    {image.is_main && <span className='badgeRess'>⭐ Главная</span>}
                  </div>

                  <form action={UpdateProjectImage} className='photoFormRess'>
                    <input type="hidden" name="id" value={image.id} />
                    <input name="image_url" defaultValue={image.image_url} />
                    <button>💾</button>
                  </form>

                  <div className='photoActionsRess'>
                    {!image.is_main && (
                      <form action={MakeMainImage}>
                        <input type="hidden" name="image_id" value={image.id} />
                        <button className='mainBtnRess'>⭐</button>
                      </form>
                    )}

                    <form className='Ress' action={DeleteProjectImage.bind(null, image.id)}>
                      <button className='deleteBtn'>❌</button>
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
