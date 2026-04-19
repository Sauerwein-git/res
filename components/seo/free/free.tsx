// components/Free.jsx
import styles from "./free.module.css";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Free() {
  // === Состояния формы ===
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }

    if (!isAgreed) {
      alert("Пожалуйста, примите условия политики конфиденциальности.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://formspree.io/f/mvgkjbjb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone }),
      });

      if (response.ok) {
        setName("");
        setPhone("");
        setIsAgreed(false);
        router.push("/thanks");
      } else {
        alert("Ошибка отправки. Попробуйте позже.");
      }
    } catch (err) {
      console.error(err);
      alert("Не удалось отправить заявку. Проверьте соединение.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={`${styles.background} ${styles.pc}`}>
        <div className={styles.section}>
          <div className={styles.smallTag}>Бесплатный аудит</div>
          <div className={styles.box}>
            <div className={styles.left}>
              <div className={styles.tag}>Бесплатный аудит</div>
              <div className={styles.parts}>
                <div className={styles.num}>01</div>
                <div className={styles.line}></div>
                <div className={styles.text} style={{ maxWidth: "358px" }}>
                  Анализ выдачи и трафика, оценка стратегии конкурентов
                </div>
              </div>
              <div className={styles.parts} style={{ marginTop: "36px" }}>
                <div className={styles.num}>02</div>
                <div className={styles.line}></div>
                <div className={styles.text} style={{ maxWidth: "358px" }}>
                  Аудит технической части, контента и конверсий сайта
                </div>
              </div>
              <div className={styles.parts} style={{ marginTop: "36px" }}>
                <div className={styles.num}>03</div>
                <div className={styles.line}></div>
                <div className={styles.text} style={{ maxWidth: "520px" }}>
                  Расчет прогнозных значений и формирование стратегии по
                  достижению цели
                </div>
              </div>
            </div>

            <div className={styles.right}>
              <div className={styles.smallText}>
                Свяжемся в течение 24-х часов и все организуем
              </div>

              <form onSubmit={handleSubmit} className={styles.form}>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.input}
                  required
                />
                <input
                  type="tel"
                  placeholder="Номер телефона"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={styles.input}
                  required
                />

                <div className={styles.agreement}>
                  <div
                    className={`${styles.checkbox} ${
                      isAgreed ? styles.checked : ""
                    }`}
                    onClick={() => setIsAgreed(!isAgreed)}
                  ></div>
                  <label className={styles.label}>
                    Я принимаю условия{" "}
                    <span className={styles.pol}>
                      политики конфиденциальности
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!isAgreed || isLoading}
                  className={styles.submitButton}
                >
                  {isLoading ? (
                    "Отправка..."
                  ) : (
                    <Image
                      src="/img/seo3.svg"
                      alt="Оставить заявку"
                      width={719}
                      height={90}
                    />
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.background} ${styles.mob}`}>
        <div className={styles.section}>
          <div className={styles.smallTag}>Бесплатный аудит</div>
          <div className={styles.invBlock}>
            <div className={styles.leftBlockInv}></div>
            <div className={styles.rightBlockInv}></div>
          </div>
          <div className={styles.tag}>Бесплатный аудит</div>
          <div className={styles.smallText}>
            Свяжемся в течение
            <br /> 24-х часов и все организуем
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              placeholder="Ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              required
            />
            <input
              type="tel"
              placeholder="Номер телефона"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={styles.input}
              required
            />

            <div className={styles.agreement}>
              <div
                className={`${styles.checkbox} ${
                  isAgreed ? styles.checked : ""
                }`}
                onClick={() => setIsAgreed(!isAgreed)}
              ></div>
              <label className={styles.label}>
                Я принимаю условия
                <br />{" "}
                <span className={styles.pol}>политики конфиденциальности</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={!isAgreed || isLoading}
              className={`${styles.submitButton} ${
                (!isAgreed || isLoading) && styles.disabled
              }`}
            >
              {isLoading ? (
                "Отправка..."
              ) : (
                <>
                  Оставить заявку [ <span className={styles.arrow}>→</span> ]
                </>
              )}
            </button>
          </form>
          <div className={styles.parts}>
            <div className={styles.num}>01</div>
            <div className={styles.line}></div>
            <div className={styles.text} style={{ maxWidth: "277px" }}>
              Сбор статистики и анализ вашей рекламы за 6 месяцев
            </div>
          </div>
          <div className={styles.parts} style={{ marginTop: "36px" }}>
            <div className={styles.num}>02</div>
            <div className={styles.line}></div>
            <div className={styles.text} style={{ maxWidth: "277px" }}>
              Сбор данных по рынку: эффективные решения конкурентов и бенчмарки
            </div>
          </div>
          <div className={styles.parts} style={{ marginTop: "36px" }}>
            <div className={styles.num}>03</div>
            <div className={styles.line}></div>
            <div className={styles.text} style={{ maxWidth: "277px" }}>
              Расчет прогнозных значений, список рекомендаций и пошаговый план
              по достижению вашей цели
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
