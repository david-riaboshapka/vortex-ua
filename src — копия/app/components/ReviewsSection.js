
// ReviewsSection.tsx
import { db } from '@/lib/db';
import ReviewsSlider from './ReviewsSlider';

export const dynamic = 'force-dynamic'; // 👈 важно при работе с БД

export default async function ReviewsSection() {
    const { rows } = await db.query(`
        SELECT
          id,
          project_id,
          author_name,
          rating,
          text,
          created_at
        FROM portfolio_reviews
        WHERE is_public = true
        ORDER BY created_at DESC
    `);

    const reviews = rows.map((r) => ({
        ...r,
        created_at: r.created_at.toISOString(), // 👈 КЛЮЧЕВО
    }));

    return (
        <section className="reviews-section">
            <div className="container">
                <h2>Reviews</h2>
                <ReviewsSlider reviews={reviews} />
            </div>
        </section>
    );
}

