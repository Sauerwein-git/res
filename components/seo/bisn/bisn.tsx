import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./bisn.module.css";
import Link from "next/link";

export default function Bisn() {
  return (
    <>
      <div className={` ${styles.background} ${styles.pc}`}>
        <div className={styles.section}>
          <div className={styles.tag}>
            Какой бизнес
            <br className="mob" /> мы <span className="red">продвигаем</span>
          </div>
          <div className={styles.smallTag}>типы сайтов</div>
          <div className={styles.upBox}>
            <div className={styles.contUpBox}>
              <div className={styles.num}>01</div>
              <div className={styles.textBot}>
                Интернет-
                <br />
                магазины
              </div>
            </div>
            <div className={styles.contUpBox}>
              <div className={styles.num}>02</div>
              <div className={styles.textBot}>Корпоративные сайты</div>
            </div>
            <div className={`${styles.contUpBox} ${styles.news}`}>
              <div className={styles.num}>03</div>
              <div className={styles.textBot}>Новостные сайты</div>
            </div>
          </div>
          <div className={styles.nisha}>ниши</div>
          <div className={styles.box}>
            <div
              className={styles.smallBox}
              style={{
                color: "rgba(64, 72, 80, 1)",
                background: "rgba(242, 242, 242, 1)",
              }}
            >
              <div className={styles.boxTag}>Недвижимость</div>
              <Image src="/img/hotel.png" alt="ship" width={40} height={40} />
            </div>
            <div
              className={styles.smallBox}
              style={{
                color: "rgba(255, 255, 255, 1)",
                background: "rgba(134, 145, 156, 1)",
              }}
            >
              <div className={styles.boxTag}>b2b</div>
              <Image src="/img/bag.png" alt="bag" width={40} height={40} />
            </div>
            <div
              className={styles.smallBox}
              style={{
                color: "rgba(64, 72, 80, 1)",
                background: "rgba(242, 242, 242, 1)",
              }}
            >
              <div className={styles.boxTag}>Мода</div>
              <Image src="/img/shop.png" alt="shop" width={40} height={40} />
            </div>
            <div
              className={styles.smallBox}
              style={{
                color: "rgba(64, 72, 80, 1)",
                background: "rgba(242, 242, 242, 1)",
              }}
            >
              <div className={styles.boxTag}>Строительство и ремонт</div>
              <Image src="/img/tool.png" alt="tool" width={40} height={40} />
            </div>
            <div
              className={styles.smallBox}
              style={{
                color: "rgba(255, 255, 255, 1)",
                background: "rgba(64, 72, 80, 1)",
              }}
            >
              <div className={styles.boxTag}>Мебель и товары для дома</div>
              <Image src="/img/tool.png" alt="tool" width={40} height={40} />
            </div>
            <div
              className={styles.smallBox}
              style={{
                color: "rgba(64, 72, 80, 1)",
                background: "rgba(242, 242, 242, 1)",
              }}
            >
              <div className={styles.boxTag}>и многое другое</div>
              <Image
                src="/img/rocket.png"
                alt="rocket"
                width={40}
                height={40}
              />
            </div>
            <div className={styles.bigBox}>
              <div className={styles.bigBoxTag}>
                Напишите нам
                <br /> и мы отправим кейсы
                <br /> для вашей ниши
              </div>
              <div className={styles.massZone}>
  <noindex>
    <a
      href="https://t.me/researchit_team"
      target="_blank"
      rel="noopener noreferrer nofollow"
      className={styles.massLink}
    >
    Telegram
    </a>
  </noindex>
</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
