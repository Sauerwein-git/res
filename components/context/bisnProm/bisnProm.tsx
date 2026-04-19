import Image from "next/image";
import styles from "./bisnProm.module.css";
import Link from "next/link";

export default function BisnProm() {
  return (
    <>
      <div className={` ${styles.background} ${styles.pc}`}>
        <div className={styles.section}>
          <div className={styles.tag}>
            Какой бизнес
            <br className="mob" /> мы <span className="red">продвигаем</span>
          </div>
          <div className={styles.box}>
            <div
              className={styles.smallBox}
              style={{
                color: "rgba(64, 72, 80, 1)",
                background: "rgba(242, 242, 242, 1)",
              }}
            >
              <div className={styles.boxTag}>Логистика</div>
              <Image src="/img/ship.png" alt="ship" width={40} height={40} />
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
                <Link
                  href="https://web.telegram.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaButton}
                >
                  TG
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
