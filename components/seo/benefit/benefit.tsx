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
      <div className={` ${styles.background} ${styles.pc}`}>
        <div className={styles.section}>
          <div className={styles.upT}>
            <div className={styles.tagUp}>
              <div className={styles.tag}>
                Решаем <span className="red">разные</span> задачи
              </div>
            </div>
            <div className={styles.textTag}>
              <div className={styles.textR}>
                Мы можем составить стратегию работы с SEO и оценить
                потенциальный доход уже на бесплатном аудите.
              </div>
            </div>
          </div>
          <div className={styles.invBlock}>
            <div className={styles.leftBlockInv}></div>
            <div className={styles.rightBlockInv}></div>
          </div>
          <div className="pc">
            <div className={styles.block}>
              <div className={styles.leftBlock}>
                <div className={styles.numl}>01</div>
                <div className={styles.tagl} style={{ maxWidth: "550px" }}>
                  Привлечение <span className="red">потенциальных</span>{" "}
                  клиентов
                </div>
              </div>
              <div className={styles.rightBlock}>
                <div className={styles.textr}>
                  Фокусируемся на увеличении объема продаж, повышении конверсий
                  и оптимизации затрат. Даже при временной остановке работы{" "}
                  <span className="black">вы продолжите получать лидов,</span> а
                  для многих ниш{" "}
                  <span className="black">
                    стоимость привлечения клиента через SEO ниже,
                  </span>
                  чем в других каналах.
                </div>
                <div className={styles.secText} style={{ maxWidth: "655px" }}>
                  Подходит для любых{" "}
                  <span className="red">интернет-магазинов</span> и других
                  площадок с онлайн-продажей{" "}
                  <span className="red">услуг и товаров</span>
                </div>
              </div>
            </div>
            <div className={styles.block}>
              <div className={styles.leftBlock}>
                <div className={styles.numl}>02</div>
                <div className={styles.tagl} style={{ maxWidth: "470px" }}>
                  Повышение{" "}
                  <span className="red">
                    <br />
                    известности
                  </span>{" "}
                  компании и лояльности к бренду
                </div>
              </div>
              <div className={styles.rightBlock}>
                <div className={styles.textr} style={{ maxWidth: "700px" }}>
                  Сосредоточены на повышении узнаваемости бренда, расширении
                  географии и целевой аудитории вашего бизнеса. Эффективно
                  работает в связке с медийными кампаниями, а при правильной
                  стратегии становится самостоятельным инструментом.
                </div>
                <div className={styles.secText} style={{ maxWidth: "705px" }}>
                  Подходит практически{" "}
                  <span className="red">любому бизнесу,</span> который в
                  долгосрочной перспективе стремится получать{" "}
                  <span className="red">дешёвых и лояльных</span>
                  клиентов по <span className="red">брендовым</span> запросам
                </div>
              </div>
            </div>
            <div className={styles.block}>
              <div className={styles.leftBlock}>
                <div className={styles.numl}>03</div>
                <div className={styles.tagl} style={{ maxWidth: "450px" }}>
                  Привлечение <span className="red">целевых</span> посетителей
                  сайта
                </div>
              </div>
              <div className={`${styles.rightBlock} ${styles.last}`}>
                <div className={styles.textr}>
                  Рост количества ежедневных целевых посещений сайта. Оцениваем
                  эффективность по вовлеченности и успешности монетизации
                  входящего трафика.
                </div>
                <div className={styles.secText} style={{ maxWidth: "705px" }}>
                  Подходит для <span className="red">информационных</span>{" "}
                  платформ и <span className="red">контентных</span> площадок
                </div>
              </div>
            </div>
            <div className={styles.block}>
              <div className={styles.leftBlock}>
                <div className={styles.ltb}>
                  <div className={styles.numl}>04</div>
                  <div className={styles.tagl} style={{ maxWidth: "700px" }}>
                    Продвижение в выдаче <span className="red">нейросетей</span>
                  </div>
                </div>
                <div className={styles.NEW}>
                  <img
                    src="/img/seonew.jpg"
                    alt="NEW"
                    width={75}
                    height={34}
                    className={styles.newBadgeGraphic}
                  />
                </div>
              </div>
              <div className={`${styles.rightBlock} ${styles.last}`}>
                <div className={styles.textr}>
                  Возможность получить лояльный трафик из нейросетей одними из
                  первых и закрепиться на позициях.
                </div>
                <div className={styles.secText} style={{ maxWidth: "705px" }}>
                  Подходит для <span className="red">любого бизнеса</span>{" "}
                  необходимо для тех, кто работает в сферах{" "}
                  <span className="red">туризма, ритейла, красоты и моды</span>
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
                    <div className={styles.reviewTh}>
                      {review.textT.map((text, idx) => (
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

          <div className={styles.button} onClick={openModal}>
            <img
              src="/img/seo2.svg"
              alt=""
              aria-hidden="true"
              width={1520}
              height={90}
              className={styles.desktopButtonGraphic}
            />
            Начать с бесплатного аудита [<span className={styles.arrow}>→</span>
            ]
          </div>
          {isModalOpen && <ModalForm onClose={closeModal} />}
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
    </>
  );
};
