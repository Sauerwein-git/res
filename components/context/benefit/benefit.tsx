import React, { useState } from "react";
import styles from "./benefit.module.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { reviewsData } from "./benefitData";
import ModalForm from "../../ModalForm/ModalForm";

export const Benefit: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className={`${styles.background} ${styles.pc}`}>
        <div className={styles.section}>
          <div className={styles.tag}>
            Когда мы
            <br className="mob" /> будем <span className="red">полезны?</span>
          </div>
          <div className={styles.invBlock}>
            <div className={styles.leftBlockInv}></div>
            <div className={styles.rightBlockInv}></div>
          </div>
          <div className="pc">
            <div className={styles.block}>
              <div className={styles.leftBlock}>
                <div className={styles.numl}>01</div>
                <div className={styles.tagl} style={{ maxWidth: "500px" }}>
                  Вы запускали рекламу, а{" "}
                  <span className="red">результатов нет</span>
                </div>
              </div>
              <div className={styles.rightBlock}>
                <div className={styles.textr}>
                  Подрядчик запускал кампании без стратегии и приоритизации:
                  запускали всё подряд и получили слив бюджета без качественных
                  выводов и результатов.
                </div>
                <div className={styles.textr}>
                  Итоговый отчёт можно описать фразой{" "}
                  <span className="black">«из пушки по воробьям»</span>.
                </div>
                <div className={styles.textr}>
                  Перед стартом работы мы рассчитываем экономику на основе ваших
                  данных и прогнозируем целевые значения по кампаниям, опираясь
                  на нашу базу <span className="black">аналитики по рынку</span>
                </div>
              </div>
            </div>
            <div className={styles.block}>
              <div className={styles.leftBlock}>
                <div className={styles.numl}>02</div>
                <div className={styles.tagl} style={{ maxWidth: "500px" }}>
                  Реклама окупалась, <br />
                  но{" "}
                  <span className="red">подрядчик потерял проактивность</span>
                </div>
              </div>
              <div className={styles.rightBlock}>
                <div className={styles.textr}>
                  Меньше идей, гипотез и вы опасаетесь, что вот-вот увидите
                  снижение показателей по кампаниям.
                </div>
                <div className={styles.textr}>
                  Регулярно узнаем и внедряем то, что есть нового и что работает
                  в вашей нише: консультируемся с экспертами Яндекса, коллегами
                  по рынку и покупаем исследования и аналитику по тематикам,{" "}
                  <span className="black">
                    чтобы не тратить ваш бюджет на тесты, а сразу делать то, что
                    работает
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.block}>
              <div className={styles.leftBlock}>
                <div className={styles.numl}>03</div>
                <div className={styles.tagl} style={{ maxWidth: "450px" }}>
                  вы <span className="red">Впервые запускаете</span> рекламу
                </div>
              </div>
              <div className={`${styles.rightBlock} ${styles.last}`}>
                <div className={styles.textr}>
                  Поможем подойти к запуску структурно, последовательно и
                  эффективно.
                </div>
                <div className={styles.textr}>
                  Проработаем стратегию, которая позволит быстрее окупить даже
                  небольшие бюджеты. Это поможет вам постепенно увеличивать
                  количество клиентов с рекламы и{" "}
                  <span className="black">повышать продажи</span> вашего бизнеса
                </div>
              </div>
            </div>
          </div>
          <div className="mob">
            <Swiper
              modules={[Navigation]}
              grabCursor={true}
              loop={false}
              slidesPerView="auto"
              className={styles.swiper}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
              {reviewsData.map((review) => (
                <SwiperSlide
                  className={`${styles.swiperSlide} ${styles.reviewSlide}`}
                  key={review.id}
                >
                  <div className={styles.reviewCard}>
                    <div className={styles.reviewNum}>{review.num}</div>
                    <div
                      className={styles.reviewTag}
                      dangerouslySetInnerHTML={{ __html: review.tagS }}
                    />
                    <div className={styles.reviewText}>
                      {review.textS.map((text, idx) => (
                        <div
                          key={idx}
                          className={styles.reviewTextItem}
                          dangerouslySetInnerHTML={{ __html: text }}
                        />
                      ))}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <button type="button" className={styles.button} onClick={openModal}>
            <img
              src="/img/contsb.svg"
              alt=""
              aria-hidden="true"
              width={1520}
              height={90}
              className={styles.desktopAuditGraphic}
            />
            <span className={styles.mobileButtonLabel}>
            Начать с бесплатного аудита [<span className={styles.arrow}>→</span>
            ]
            </span>
          </button>

          <div className="mob">
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
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <span className={styles.modalClose} onClick={closeModal}></span>
            <ModalForm onClose={closeModal} />
          </div>
        </div>
      )}
    </>
  );
};
