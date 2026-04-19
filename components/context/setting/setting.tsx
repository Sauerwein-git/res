import { useState } from "react";
import styles from "./setting.module.css";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ModalForm from "../../ModalForm/ModalForm";

import Image from "next/image";

const steps = [
  {
    num: "01",
    title: "Настройка сквозной аналитики и создание единого отчета",
    text: "Чтобы наша работа была прозрачной и всегда “под рукой” были данные для принятия решений",
  },
  {
    num: "02",
    title: "Разрабатываем структуру личного кабинета",
    text: "Чтобы в работе был порядок, а если решите уйти, то все будет понятно новому подрядчику",
  },
  {
    num: "03",
    title: "Распределяем бюджет и выделяем маржинальные продукты",
    text: "Поймем, как быстрее вывести рекламу на окупаемость и ускорить рост. Если потребуется, для консультации подключим дополнительных специалистов",
  },
  {
    num: "04",
    title: "Запускаем кампании",
    text: "Сроки запуска индивидуальны, их сообщаем клиентам сразу после аудита. После запуска отслеживаем кампании ежедневно, чтобы не откланяться от плановых показателей",
  },
  {
    num: "05",
    title: "Находим точки роста и оптимизируем",
    text: "Ищем то, что можно улучшить и составляем гипотезы на внедрение. Смотрим на работу всей воронки: эффективность сайта, работа отдела продаж и тд",
  },
];

export default function Setting() {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = steps.length;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className={`${styles.background} ${styles.pc}`}>
        <div className={styles.section}>
          <div className={styles.upBox}>
            <div className={styles.tag}>Дальше – настройка кампаний</div>
            <button type="button" className={styles.button} onClick={openModal}>
              <img
                src="/img/contthb.svg"
                alt=""
                aria-hidden="true"
                width={459}
                height={90}
                className={styles.desktopButtonGraphic}
              />
              Начать с бесплатного аудита{" "}
              <Image
                src="/img/cartArrow.png"
                alt="arrow"
                width={40}
                height={20}
              />
            </button>
          </div>
          <div className={styles.botBox}>
            {steps.map((step, index) => (
              <div className={styles.contBox} key={index}>
                <div className={styles.leftCont}>
                  <div className={styles.num}>{step.num}</div>
                  <div className={styles.title}>{step.title}</div>
                </div>
                <div className={styles.rightCont}>
                  <div className={styles.text}>{step.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`${styles.background} ${styles.mob}`}>
        <div className={styles.section}>
          <div className={styles.tag}>Дальше – настройка кампаний</div>
          <button type="button" className={styles.button} onClick={openModal}>
            Начать с бесплатного аудита{" "}
            <Image
              src="/img/cartArrow.png"
              alt="arrow"
              width={40}
              height={20}
            />
          </button>
          <div className={styles.invBlock}>
            <div className={styles.leftBlockInv}></div>
            <div className={styles.rightBlockInv}></div>
          </div>

          <div className={styles.blogMobile}>
            <Swiper
              slidesPerView="auto"
              spaceBetween={20}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              className={styles.swiperMobile}
            >
              {steps.map((step, index) => (
                <SwiperSlide key={index}>
                  <div className={styles.blogBox}>
                    <div className={styles.num}>{step.num}</div>
                    <div className={styles.boxTag}>{step.title}</div>
                    <div className={styles.textTag}>{step.text}</div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className={styles.customProgress}>
              <div
                className={styles.progressFill}
                style={{
                  width: `${((activeIndex + 1) / totalSlides) * 100}%`,
                }}
              ></div>
            </div>
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
}
