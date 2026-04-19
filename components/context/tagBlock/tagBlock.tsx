"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./tagBlock.module.css";
import ModalForm from "../../ModalForm/ModalForm";

export default function TagBlock() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className={`${styles.background} ${styles.pc}`}>
        <div className={styles.section}>
          <div className={styles.tag}>
            Настройка и ведение <span className="red">контекстной</span> рекламы
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
                className={styles.anchorBut}
                onClick={openModal}
                aria-label="Начать с бесплатного аудита"
              >
                <img
                  src="/img/contfb.svg"
                  alt=""
                  aria-hidden="true"
                  width={720}
                  height={90}
                  className={styles.desktopAuditGraphic}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

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
