import { createPost, deletePost, updatePost } from '../posts';
export default function Post({ posts }) {

    return (
        <section>
            <h1>Посты</h1>

            <form action={createPost} className='formRess'>
                <input name="title" placeholder="Новый пост" required />
                <button>Добавить</button>
            </form>

            <ul className='ulRess'>
                {posts.map(post => (
                    <li key={post.id} className='liRess'>
                        <form action={updatePost} className='formRess'>
                            <input type="hidden" name="id" value={post.id} />
                            <input name="title" defaultValue={post.title} />
                            <button>💾</button>
                        </form>

                        <form
                            className='formRess'
                            action={deletePost.bind(null, post.id)}
                        >
                            <button>❌</button>
                        </form>
                    </li>
                ))}
            </ul>
        </section>
    );
}
