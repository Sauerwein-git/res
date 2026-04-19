import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./settingBlock.module.css";

export default function SettingBlock() {
  return (
    <>
      <div className={` ${styles.background} ${styles.pc}`}>
        <div className={styles.section}>
          <div className={styles.tag}>
            Не только настроим рекламу, а{" "}
            <span className={styles.red}>«засунем нос» в ваш бизнес</span>
          </div>
          <div className={styles.invBlock}>
            <div className={styles.leftBlockInv}></div>
            <div className={styles.rightBlockInv}></div>
          </div>
          <div className={styles.bottomBlock}>
            <div className={styles.leftBlock}>
              <div className={styles.book}>
                <div className={styles.leftPage}>
                  <div className={styles.wdT}>
                    <span className={styles.white}>
                      Нам не интересно просто оказать услугу.
                    </span>{" "}
                    Подходим комплексно к любой задаче и учитываем конечную цель
                    бизнеса{" "}
                  </div>
                </div>
                <div className={styles.rightPage}>
                  <div className={styles.wdT}>
                    Если видим, что не работает что-то в воронке, в отделе
                    продаж или в продукте —{" "}
                    <span className={styles.white}>
                      найдем варианты решений и расскажем вам
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.miniTag}>
                Мы хотим <span className={styles.red}>расти вместе</span> с
                нашими клиентами
              </div>
            </div>
            <div className={styles.rightBlock}>
              <Image
                src="/img/otchet.webp"
                alt="yandex"
                width={677}
                height={409}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
