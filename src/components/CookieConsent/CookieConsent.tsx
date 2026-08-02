import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./CookieConsent.module.css";

const NOTICE_KEY = "research-it-cookie-notice-seen";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!window.localStorage.getItem(NOTICE_KEY)) {
      setIsVisible(true);
    }
  }, []);

  const closeNotice = () => {
    window.localStorage.setItem(NOTICE_KEY, "true");
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
        <section className={styles.banner} aria-label="Уведомление о файлах cookie">
          <div className={styles.marker} aria-hidden="true" />
          <div className={styles.content}>
            <p className={styles.title}>Немного данных — больше точности</p>
            <p className={styles.text}>
              Мы используем cookie, чтобы сайт работал стабильно, а мы понимали,
              как сделать его удобнее. Подробнее — в{" "}
              <Link href="/politica/" className={styles.link}>
                политике конфиденциальности
              </Link>
              .
            </p>
          </div>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={closeNotice}
            >
              Принять
            </button>
          </div>
        </section>
  );
}
