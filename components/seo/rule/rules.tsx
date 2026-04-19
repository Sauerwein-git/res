import React, { useState } from "react";
import styles from "./rules.module.css";
import ModalForm from "../../ModalForm/ModalForm";

export const Rules: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className={`${styles.background} ${styles.pc}`}>
        <div className={styles.section}>
          <div className={styles.tag}>
            Как правило,
            <br className="mob" /> цена клиента
            <br className="mob" /> в <span className="red">5 раз ниже,</span>{" "}
            чем <br className="mob" />с рекламы в Яндекс Директ
          </div>
          <div className={styles.invBlock}>
            <div className={styles.leftBlockInv}></div>
            <div className={styles.rightBlockInv}></div>
          </div>
          <div className={styles.box}>
            <div className={styles.left}>
              <div className={styles.boxTag}>
                Если ещё
                <br /> <span className="red">не работаете</span> с SEO
              </div>
              <div className={styles.divText}>
                <div className={styles.LboxText}>
                  <span className="black">
                    SEO – важный элемент общей маркетинговой стратегии,
                  </span>{" "}
                  который помогает с гарантией привлекать клиентов дешевле, а в
                  перспективе{" "}
                  <span className="black">гарантировано повысите прибыль</span>{" "}
                  бизнеса.
                </div>
                <div className={styles.boxText}>
                  Если прямо сейчас вы тратите маркетинговый бюджет на другие
                  каналы, но не используете SEO, вы можете{" "}
                  <span className="black">
                    недополучать десятки миллионов рублей
                  </span>{" "}
                  в год
                </div>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.boxTag}>
                Если вы
                <br /> <span className="red">уже работаете</span> с SEO
              </div>
              <div className={styles.divText}>
                <div className={styles.RboxText}>
                  Работаем с ситуациями,{" "}
                  <span className="black">когда нет ожидаемых результатов</span>{" "}
                  и пока вы за пределами ТОП 5 в выдаче, не видите ожидаемого
                  роста трафика и клиентов.
                </div>
                <div className={styles.boxText}>
                  <span className="black">
                    Первое, что делаем – проводим детальный анализ сильных
                    конкурентов,
                  </span>{" "}
                  оцифровываем их стратегию и находим эффективные действия,
                  чтобы в быстрые сроки дойти до их уровня. После этого
                  разрабатываем стратегию, как их{" "}
                  <span className="black">обогнать</span>
                </div>
              </div>
            </div>
          </div>
          <button type="button" className={styles.button} onClick={openModal}>
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
};
