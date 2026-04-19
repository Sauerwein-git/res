import { useState } from "react";
import styles from "./nose.module.css";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import ModalForm from "../../ModalForm/ModalForm";

export default function Nose() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className={`${styles.background} ${styles.pc}`}>
        <div className={styles.section}>
          <div className={styles.tag}>
            Не только настроим рекламу, а{" "}
            <span className="red">«засунем нос» в ваш бизнес</span>
          </div>
          <div className={styles.box}>
            <div className={styles.left}>
              <Image
                src="/img/nose.png"
                alt="Previous"
                width={744}
                height={435}
                className={styles.navButton}
              />
            </div>
            <div className={styles.right}>
              <div className={styles.up}>
                <div className={styles.lr}>
                  <div className={styles.wlr}>
                    Нам не интересно просто настроить рекламу.{" "}
                    <span className="white">
                      Наша цель — рост вашего бизнеса, увеличение прибыли и доли
                      рынка
                    </span>
                  </div>
                </div>
                <div className={styles.rr}>
                  <div className={styles.wrr}>
                    Если мы понимаем,
                    <br className="pc" /> что есть потенциал для роста, мы
                    проконсультируемся
                    <br className="pc" />
                    со своими специалистами, соберем гипотезы и презентуем
                  </div>
                </div>
              </div>
              <div className={styles.underText}>
                Если что-то на сайте, в воронке, в продажах
                <br /> и даже продукте{" "}
                <span className="white">
                  работает не так мы найдем <br />
                  это,
                </span>{" "}
                скажем вам и предложим варианты решения
              </div>
              <button
                type="button"
                className={styles.button}
                onClick={openModal}
              >
                <img
                  src="/img/contsib.svg"
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
