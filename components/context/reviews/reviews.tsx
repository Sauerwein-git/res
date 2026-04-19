import React, { useState } from "react";
import styles from "./reviews.module.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { reviewsData } from "./reviewsData";
import Link from "next/link";

export const Reviews: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.background}>
      <div className={styles.section}>
        <div className={styles.smallTag}>отзывы</div>
        <div className={styles.invBlock}>
          <div className={styles.leftBlockInv}></div>
          <div className={styles.rightBlockInv}></div>
        </div>
        <div className={styles.block}>
          <div className={styles.leftBlock}>Отзывы клиентов</div>
          <div className={styles.rightBlock}>
            <div className={styles.prevButton}>
              <div className={`custom-prevReviews ${styles.navButtonWrapper}`}>
                <Image
                  src="/img/leftButtonHover.png"
                  alt="Previous"
                  width={70}
                  height={70}
                  className={styles.navButton}
                />
              </div>

              <div className={`custom-nextReviews ${styles.navButtonWrapper}`}>
                <Image
                  src="/img/rightButtonHover.png"
                  alt="Next"
                  width={70}
                  height={70}
                  className={styles.navButton}
                />
              </div>
            </div>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          grabCursor={true}
          loop={false}
          navigation={{
            nextEl: ".custom-nextReviews",
            prevEl: ".custom-prevReviews",
          }}
          slidesPerView="auto"
          className={styles.swiper}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} // ← обновляем индекс
        >
          {reviewsData.map((review) => {
            const isOdd = review.id % 2 === 1;
            return (
              <SwiperSlide
                className={`${styles.swiperSlide} ${styles.reviewSlide}`}
                key={review.id}
              >
                <div className={styles.reviewCard}>
                  {isOdd ? (
                    <>
                      <div className={styles.reviewText}>
                        {review.text.map((paragraph, idx) => (
                          <p key={idx}>{paragraph}</p>
                        ))}
                      </div>
                      <div className={styles.mediaAndTheses}>
                        <div className={styles.images}>
                          {review.images.map((src, idx) => (
                            <div key={idx} className={styles.imageWrapper}>
                              <Image
                                src={src}
                                alt={`Review ${review.id} image ${idx + 1}`}
                                width={147}
                                height={81}
                                style={{
                                  objectFit: "cover",
                                  width: "100%",
                                  height: "100%",
                                }}
                              />
                            </div>
                          ))}
                        </div>
                        <div className={styles.thesesList}>
                          {review.theses.map((thesis, idx) => (
                            <div key={idx} className={styles.thesisItem}>
                              {thesis}
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={styles.mediaAndTheses}>
                        <div className={styles.images}>
                          {review.images.map((src, idx) => (
                            <div key={idx} className={styles.imageWrapper}>
                              <Image
                                src={src}
                                alt={`Review ${review.id} image ${idx + 1}`}
                                width={147}
                                height={81}
                                style={{
                                  objectFit: "cover",
                                  width: "100%",
                                  height: "100%",
                                }}
                              />
                            </div>
                          ))}
                        </div>
                        <div className={styles.thesesList}>
                          {review.theses.map((thesis, idx) => (
                            <div key={idx} className={styles.thesisItem}>
                              {thesis}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className={styles.reviewText}>
                        {review.text.map((paragraph, idx) => (
                          <p key={idx}>{paragraph}</p>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        {reviewsData.length > 1 && (
          <div className={styles.indicatorContainer}>
            <div className={styles.indicatorLine}>
              <div
                className={styles.indicatorSlider}
                style={{
                  left: `${(activeIndex / (reviewsData.length - 1)) * 90}%`,
                }}
              />
            </div>
          </div>
        )}
        <div className={styles.proza}>
          <div className={styles.tagProza}>Все прозрачно</div>
          <div className={styles.bottonBlog}>
            <div className={styles.textBotL}>
              Можем дать контакты наших клиентов, чтобы вы пообщались и
              убедились лично
            </div>
            <div className={styles.rightPos}>
              <div className={styles.shortText}>
                Напишите нам и мы все организуем:
              </div>
              <div className={styles.massZone}>
                <Link
                  href="https://web.telegram.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaButton}
                >
                  TG
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
