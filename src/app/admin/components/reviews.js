import { CreateReviews, UpdateReviews, DeleteReviews } from "../reviews";

export default function Reviews({ reviews, projects }) {
  return (
    <section>
      <h2>Отзывы (админка)</h2>

      {reviews.map(review => {
        const project = projects.find(
          project => project.id === review.project_id
        );

        return (
          <div key={review.id} className="review-block">
            <div className="review-cont">
              <span>
                Проект: {project ? project.title : "Не найден"}
              </span>

              <span>Имя автора: {review.author_name}</span>
              <span>Рейтинг отзыва: {review.rating}</span>
              <span>
                Опубликован: {review.is_public ? "да" : "нет"}
              </span>
              <span>Текст отзыва: {review.text}</span>
            </div>

            {/* UPDATE */}
            <form action={UpdateReviews}>
              <input type="hidden" name="id" value={review.id} />

              <input
                name="author_name"
                defaultValue={review.author_name}
              />

              <input
                name="rating"
                type="number"
                min="1"
                max="5"
                defaultValue={review.rating}
              />

              <textarea
                name="text"
                defaultValue={review.text}
              />

              <label>
                <input
                  type="checkbox"
                  name="is_public"
                  defaultChecked={review.is_public}
                />
                Опубликован
              </label>

              <button type="submit">Сохранить</button>
            </form>

            {/* DELETE */}
            <form action={DeleteReviews}>
              <input type="hidden" name="id" value={review.id} />
              <button type="submit">Удалить</button>
            </form>
          </div>
        );
      })}

      <hr />

      {/* CREATE */}
      <form action={CreateReviews}>
        <h3>Добавить отзыв</h3>

        <select name="project_id" required>
          <option value="">Выберите проект</option>
          {projects.map(project => (
            <option key={project.id} value={project.id}>
              {project.title}
            </option>
          ))}
        </select>

        <input
          name="author_name"
          placeholder="Имя автора"
          required
        />

        {/* ❗ ИСПРАВЛЕНО */}
        <select name="rating" required>
          <option value="">Выберите оценку</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <textarea
          name="text"
          placeholder="Текст отзыва"
          required
        />

        <button type="submit">Добавить</button>
      </form>
    </section>
  );
}
