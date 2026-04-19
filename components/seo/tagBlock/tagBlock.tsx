"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./tagBlock.module.css";
import ModalForm from "../../ModalForm/ModalForm"; // ← убедись, что путь верный

export default function TagBlock() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Десктоп */}
      <div className={`${styles.background} ${styles.pc}`}>
        <div className={styles.section}>
          <div className={styles.tag}>
            Оптимизация и <span className="red">seo продвижение</span> сайтов{" "}
            <br />в ТОП в Google и Яндекс
          </div>
          <div className={styles.block}>
            <div className={styles.leftBlock}>
              <div className={styles.back}>
                <Link href="/">
                  [<span className="arrow">←</span>] Назад
                </Link>
              </div>
              <div className={styles.imageBlock}>
                <Image
                  src="/img/hatter.png"
                  alt="hatter"
                  width={60}
                  height={60}
                />
                <Image
                  src="/img/flash.png"
                  alt="flash"
                  width={60}
                  height={60}
                />
                <Image
                  src="/img/target.png"
                  alt="target"
                  width={60}
                  height={60}
                />
              </div>
            </div>
            <div className={styles.rightBlock}>
              <div className={styles.text}>
                Эффективные кампании на основе аналитики рынка и вашей
                unit-экономики для роста продаж и прибыли
              </div>
              <button
                type="button"
                className={styles.button}
                onClick={openModal}
              >
                <div className={styles.textButton}>
                  Начать с бесплатного аудита
                </div>
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

      {/* Мобильная версия */}
      <div className={`${styles.background} ${styles.mob}`}>
        <div className={styles.section}>
          <div className={styles.back}>
            <Link href="/">
              [<span className="arrow">←</span>] Назад
            </Link>
          </div>
          <div className={styles.tag}>
            Настройка
            <br /> и ведение <span className="red">контекстной</span> рекламы
          </div>
          <div className={styles.imageBlock}>
            <Image src="/img/hatter.png" alt="hatter" width={60} height={60} />
            <Image src="/img/flash.png" alt="flash" width={60} height={60} />
            <Image src="/img/target.png" alt="target" width={60} height={60} />
          </div>
          <div className={styles.text}>
            Эффективные кампании на основе аналитики рынка и вашей
            unit-экономики для роста продаж <br />и прибыли
          </div>
          <button
            type="button"
            className={styles.anchorBut}
            onClick={openModal}
          >
            Начать с бесплатного аудита [<span className="arrow">→</span>]
          </button>
        </div>
      </div>

      {/* Модальное окно — поверх всего */}
      {isModalOpen && (
        <div
          className={styles.modalOverlay}
          style={{ zIndex: 2000 }}
          onClick={closeModal}
        >
          <div
            className={styles.modal}
            style={{
              zIndex: 2001,
              maxWidth: "840px",
              width: "90%",
              padding: "40px",
              background: "rgba(64, 72, 80, 1)",
              borderRadius: "12px",
              position: "relative",
              color: "white",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.closeButton}
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "none",
                border: "none",
                fontSize: "24px",
                color: "white",
                cursor: "pointer",
              }}
            >
              ×
            </button>
            <ModalForm onClose={closeModal} />
          </div>
        </div>
      )}
    </>
  );
}
