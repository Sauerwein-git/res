import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./producerBlock.module.css";

export default function ProducerBlock() {
  return (
    <>
      <div className={` ${styles.background} ${styles.pc}`}>
        <div className={styles.section}>
          <div className={styles.tag}>Александр Коновалов</div>
          <div className={`${styles.block} ${styles.bt}`}>
            <div className={styles.leftBlock}>
              <div className={styles.wlb}>
                Серийный предприниматель и маркетолог с опытом более 12 лет. По
                опыту знает, как сложно найти подрядчика или агентство, которые
                будут вовлечены в бизнес как ты сам
              </div>
            </div>
            <div className={styles.invBlock}>
              <div className={styles.leftBlockInv}></div>
              <div className={styles.rightBlockInv}></div>
            </div>
            <div className={`${styles.rightBlock} ${styles.blr}`}>
              <div className={styles.leftRightBlock}>
                <Image
                  src="/img/Alexs.png"
                  alt="Alexandr"
                  width={173}
                  height={173}
                />
              </div>

              <div className={styles.rightRightBlock}>
                <div className={styles.miniTag}>
                  Основатель агентства <br className={`${styles.mob} `} />
                  <span className={styles.red}>RE SEARCH IT</span>
                </div>
                <div className={`${styles.miniText} ${styles.pcs}`}>
                  Опыт и компетенции не только в маркетинге, но и в создании и
                  развитии бизнеса в различных направлениях
                </div>
              </div>
            </div>
            <div className={`${styles.miniText} ${styles.mob} ${styles.mlrt}`}>
              Опыт и компетенции не только <br />в маркетинге, но и в создании
              <br /> и развитии бизнеса в различных направлениях
            </div>
          </div>
          <div className={styles.block}>
            <div className={styles.leftBlock}>
              <div className={styles.fourBlock}>
                <div className={`${styles.mass} ${styles.t1}`}>
                  <div className={styles.massTag}>&gt;12 лет</div>
                  <div className={`${styles.massText} ${styles.m1}`}>
                    опыта на позициях в маркетинге и продажах. Работал в крупных
                    компаниях: Мегафон, Procter & Gamble, Bosch
                  </div>
                </div>
                <div className={`${styles.mass} ${styles.t2}`}>
                  <div className={styles.massTag}>№1</div>
                  <div className={`${styles.massText} ${styles.m2}`}>
                    Федеральный интернет-магазин АЭРОС: №1 по объему продаж
                    бризеров в России
                  </div>
                </div>
                <div className={`${styles.mass} ${styles.t3}`}>
                  <div className={styles.massTag}>в 2025</div>
                  <div className={`${styles.massText} ${styles.m3}`}>
                    запуск бизнеса по аренде строительной технике в Москве
                  </div>
                </div>
                <div className={`${styles.mass} ${styles.t4}`}>
                  <div className={styles.massTag}>
                    &gt;800 МЛН<span className={styles.rub}>₽</span>
                  </div>
                  <div className={`${styles.massText} ${styles.m4}`}>
                    Суммарный доход всех проектов в 2024 году
                  </div>
                </div>
              </div>
            </div>
            <div className={`${styles.rightBlock} ${styles.dfc}`}>
              <div className={styles.kov}>« »</div>
              <div className={styles.secText}>
                Раз в месяц анализирую ситуацию в бизнесе каждого клиента,
                перекладываю свой опыт по захвату лидерской доли рынка и делюсь
                советами, как бы я вел бизнес и какие процессы можно изменить,
                чтобы ускорить рост.
              </div>
              <div className={styles.thText}>
                Заказывая рекламу, вы покупаете не настройку рекламного
                кабинета, а комплексную работу по росту вашего бизнеса
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
