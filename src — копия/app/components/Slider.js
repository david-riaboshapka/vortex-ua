'use client'; // Обязательно, так как Swiper использует скрипты на клиенте
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Импорт стилей Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ProjectSlider({ images, title }) {
    const secondaryImages = images.filter((img) => !img.is_main);

    if (secondaryImages.length === 0) return null;

    return (
        <div className="project-gallery">
            <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={1}
                navigation
                
                pagination={{ clickable: true }}
                loop={secondaryImages.length > 1} // Включаем петлю, если больше 1 фото
                autoHeight={true}              // Подстраивает высоту под картинку
                spaceBetween={30}                // Расстояние между слайдами
            >
                {secondaryImages.map((img, index) => (
                    <SwiperSlide key={index}>
                        <div className="slider-image-wrapper">
                            <img
                                src={img.image_url}
                                alt={`${title} - screenshot ${index + 1}`}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <style jsx>
                {`
                    .project-gallery {
                    padding: 20px 0;
                    width: 100%;
                    max-width: 1000px; /* Ограничьте ширину под ваш дизайн */
                    margin: 0 auto;
                    }
                    /* Стилизация стрелочек под ваш цвет #888888 */
                    :global(.swiper-button-next),
                    :global(.swiper-button-prev) {
                    color: #888888 !important;
                    }
                    :global(.swiper-pagination-bullet-active) {
                    background: #888888 !important;
                    }
                `}
            </style>
        </div>
    );
}