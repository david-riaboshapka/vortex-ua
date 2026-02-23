// ReviewsSlider.tsx
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function ReviewsSlider({ reviews = [] }) {
    if (!reviews.length) {
        return <p>No reviews yet</p>;
    }

    return (
        <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            }}
        >
            {reviews.map((rev) => (
                <SwiperSlide key={rev.id}>
                    <div className="item-review">
                        <strong>{rev.author_name}</strong>
                        <p>{rev.text}</p>
                        <small>
                            Rating {rev.rating}/5 · Date # {new Date(rev.created_at).toLocaleDateString()}
                        </small>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

