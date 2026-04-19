import { useState } from "react";
import styles from "./enemy.module.css";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import ModalForm from "../../ModalForm/ModalForm";

export default function Enemy() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className={`${styles.background} ${styles.pc}`}>
        <div className={styles.section}>
          <div className={styles.tag}>
            мы Знаем, <span className="red">что хорошо работает</span> у ваших
            конкурентов
          </div>
          <div className={styles.box}>
            <div className={styles.left}>
              <div className={styles.num}>01</div>
              <div className={styles.text} style={{ maxWidth: "400px" }}>
                Сильный отдел аналитиков
                <br className="mob" /> с опытом в разных нишах
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.num}>02</div>
              <div className={styles.text} style={{ maxWidth: "643px" }}>
                Общаемся
                <br className="mob" /> и консультируемся
                <br className="mob" /> с коллегами по рынку{" "}
                <br className="mob" />и экспертами Яндекса,{" "}
                <br className="mob" />
                чтобы быстро узнавать <br className="mob" />
                об изменениях и лучших стратегиях{" "}
              </div>
            </div>
          </div>
          <div className={styles.box}>
            <div className={`${styles.left} ${styles.bT}`}>
              <div className={styles.num}>03</div>
              <div className={styles.text} style={{ maxWidth: "700px" }}>
                Собираем информацию <br className="mob" />о рынке из открытых
                источников и платных исследований, чтобы понимать текущую
                ситуацию и прогнозировать ключевые показатели
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.num}>04</div>
              <div className={styles.text} style={{ maxWidth: "700px" }}>
                Так мы можем с высокой точностью и уверенностью прогнозировать
                рыночные тренды и выстраивать стратегию, которая{" "}
                <span className="red">
                  поможет вам увеличить свою долю на рынке
                </span>{" "}
                уже на ранних этапах сотрудничества
              </div>
            </div>
          </div>
          <button type="button" className={styles.button} onClick={openModal}>
            <img
              src="/img/contfivb.svg"
              alt=""
              aria-hidden="true"
              width={1520}
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
