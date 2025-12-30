import { createPost, deletePost, updatePost } from '../posts';
export default function Post({ posts }) {

    return (
        <section>
            <h1>Посты</h1>

            <form action={createPost}>
                <input name="title" placeholder="Новый пост" required />
                <button>Добавить</button>
            </form>

            <ul>
                {posts.map(post => (
                    <li key={post.id} style={{ marginTop: 10 }}>
                        <form action={updatePost} style={{ display: 'inline' }}>
                            <input type="hidden" name="id" value={post.id} />
                            <input name="title" defaultValue={post.title} />
                            <button>💾</button>
                        </form>

                        <form
                            action={deletePost.bind(null, post.id)}
                            style={{ display: 'inline', marginLeft: 5 }}
                        >
                            <button>❌</button>
                        </form>
                    </li>
                ))}
            </ul>
        </section>
    );
}
