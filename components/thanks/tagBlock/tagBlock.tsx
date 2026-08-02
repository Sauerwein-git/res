import Image from "next/image";
import styles from "./tagBlock.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TagBlock() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <>
      <div className={`${styles.background} `}>
        <div className={styles.section}>
          <div
            className={styles.back}
            onClick={goBack}
            role="button"
            tabIndex={0}
          >
            [<span className={styles.arrow}>←</span>] Назад
          </div>
          <div className={styles.box}>
            <div className={styles.tag}>
              Уже получили вашу <span className="red">заявку</span>
            </div>
            <div className={styles.textR}>
              Свяжемся в течение 24 часов и обо всем договоримся
            </div>
          </div>
          <div className={styles.botBox}>
            <div className={styles.left}>
              Если не можете
              <br className="mob" />
              <br className="pc" /> ждать — свяжитесь с нами:
            </div>
            <div className={styles.right}></div>
          </div>

          <div className={styles.footer}>
            <div className={styles.fleft}>
              <div className={styles.blocks}>
                <div className={styles.num}>Позвонить</div>
                <div className={styles.fTag}>+7 995 101 70 41</div>
              </div>
              <div className={styles.blocks}>
                <div className={styles.num}>Написать</div>
                <div className={styles.fTag}>hello@research-it.ru</div>
              </div>
            </div>
            <div className={styles.fright}>
              <div className={styles.blocks}>
                <div className={styles.num}>Быстрая связь</div>
                <div className={styles.faq}>
                  <div className={styles.fTag}>
                    <noindex>
                      <Link
                        href="https://web.telegram.org/"
                        rel="noopener noreferrer nofollow"
                      >
                        Telegram
                      </Link>
                    </noindex>
                  </div>
                  <div className={styles.fTag}>/</div>
                  <div className={styles.fTag}>
                    <Link href="https://www.whatsapp.com/?lang=ru_RU">
                      WhatsApp
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
