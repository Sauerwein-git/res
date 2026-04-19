"use client";

import { useState } from "react";
import styles from "./effect.module.css";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useRouter } from "next/router";

// Данные для шагов
const steps = [
  {
    num: "01",
    title: (
      <>
        Анализ текущей
        <br /> ситуации
      </>
    ),
    text: (
      <>
        Оценка текущего положения в<br /> выдаче и анализ динамики
        <br /> органического трафика
      </>
    ),
  },
  {
    num: "02",
    title: (
      <>
        Первичный аудит
        <br /> сайта
      </>
    ),
    text: (
      <>
        Проверка технической части,
        <br /> оценка параметров самого
        <br /> сайта и домена
      </>
    ),
  },
  {
    num: "03",
    title: "Проверка эффективности контента",
    text: (
      <>
        Оцениваем уникальность контента,
        <br /> конверсии и юзабилити
      </>
    ),
  },
  {
    num: "04",
    title: (
      <>
        Анализ стратегии и контента
        <br /> конкурентов
      </>
    ),
    text: (
      <>
        Выделим сильные и слабые стороны, чтобы использовать выигрышные решения
      </>
    ),
  },
  {
    num: "05",
    title: (
      <>
        Прогноз трафика
        <br /> и рекомендации
      </>
    ),
    text: <>Сформируем стратегию роста и план достижения целевых показателей</>,
  },
];

// === Функция форматирования телефона (как в ModalForm) ===
const formatPhoneForDisplay = (digits: string) => {
  if (digits.startsWith("8")) {
    const parts = [
      digits.slice(0, 1),
      digits.slice(1, 4),
      digits.slice(4, 7),
      digits.slice(7, 9),
      digits.slice(9, 11),
    ].filter(Boolean);
    return parts.join("-");
  }

  if (digits.startsWith("7") || digits.startsWith("9")) {
    let res = "+7";
    const p1 = digits.slice(
      digits.startsWith("9") ? 0 : 1,
      digits.startsWith("9") ? 3 : 4
    );
    const p2 = digits.slice(
      digits.startsWith("9") ? 3 : 4,
      digits.startsWith("9") ? 6 : 7
    );
    const p3 = digits.slice(
      digits.startsWith("9") ? 6 : 7,
      digits.startsWith("9") ? 8 : 9
    );
    const p4 = digits.slice(
      digits.startsWith("9") ? 8 : 9,
      digits.startsWith("9") ? 10 : 11
    );

    if (p1) res += `(${p1}`;
    if (p2) res += `)-${p2}`;
    if (p3) res += `-${p3}`;
    if (p4) res += `-${p4}`;
    return res;
  }

  return digits;
};

export default function Effect() {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = steps.length;

  // === Состояния формы ===
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Пожалуйста, укажите имя.");
      return;
    }

    if (phone.length < 11) {
      alert("Номер телефона должен содержать 11 цифр.");
      return;
    }

    if (!isAgreed) {
      alert("Пожалуйста, примите условия политики конфиденциальности.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://research-it.ru/api/send-form.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone }),
      });

      const data = await response.json();

      if (response.ok) {
        // Очистка полей после отправки (опционально)
        setName("");
        setPhone("");
        setIsAgreed(false);
        router.push("/thanks");
      } else {
        alert(`Ошибка отправки: ${data.error || "Неизвестная ошибка"}`);
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
      {/* Desktop */}
      <div className={`${styles.background} ${styles.pc}`}>
        <div className={styles.section}>
          <div className={styles.miniTag}>Этапы работы</div>
          <div className={styles.upBox}>
            <div className={styles.left}>
              <div className={styles.tag}>Проводим аудит</div>
            </div>
            <div className={styles.right}></div>
          </div>

          <div className={styles.blog}>
            {steps.map((step, index) => (
              <div
                key={index}
                className={`${styles.blogBox} ${styles[`n${index + 1}`]}`}
              >
                <div className={styles.num}>{step.num}</div>
                <div className={styles.boxTag}>{step.title}</div>
                <div className={styles.textTag}>{step.text}</div>
              </div>
            ))}

            {/* Форма */}
            <form onSubmit={handleSubmit} className={styles.auditForm}>
              <div className={styles.formTag}>Получить бесплатный аудит</div>
              <div className={styles.inputs}>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.name}
                  required
                />
                <input
                  type="tel"
                  placeholder="Номер телефона"
                  value={formatPhoneForDisplay(phone)}
                  onChange={(e) => {
                    const input = e.target.value;
                    const digits = input.replace(/\D/g, "");
                    if (digits === "") {
                      setPhone("");
                    } else if (digits.length === 1) {
                      if (["7", "8", "9"].includes(digits)) {
                        setPhone(digits);
                      }
                    } else if (digits.length <= 11) {
                      setPhone(digits);
                    }
                  }}
                  className={styles.number}
                  required
                />
              </div>
              <div className={styles.affBut}>
                <div
                  className={`${styles.cube} ${isAgreed ? styles.checked : ""}`}
                  onClick={() => setIsAgreed(!isAgreed)}
                ></div>
                <div className={styles.polit}>
                  Я принимаю условия{" "}
                  <Link href="/politica">политики конфиденциальности</Link>
                </div>
              </div>
              <button
                type="submit"
                disabled={!isAgreed || isLoading}
                className={`${styles.anchorBut} ${
                  (!isAgreed || isLoading) && styles.anchorButDisabled
                }`}
              >
                {isLoading ? (
                  "Отправка..."
                ) : (
                  <>
                    Оставить заявку  <span className="arrow" aria-hidden="true"></span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className={`${styles.background} ${styles.mob}`}>
        <div className={styles.section}>
          <div className={styles.etap}>Этапы работы</div>
          <div className={styles.invBlock}>
            <div className={styles.leftBlockInv}></div>
            <div className={styles.rightBlockInv}></div>
          </div>
          <div className={styles.tag}>Проводим аудит</div>

          <div className={styles.blogMobile}>
            <Swiper
              slidesPerView="auto"
              spaceBetween={20}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              className={styles.swiperMobile}
            >
              {steps.map((step, index) => (
                <SwiperSlide key={index}>
                  <div className={styles.blogBox}>
                    <div className={styles.num}>{step.num}</div>
                    <div className={styles.boxTag}>{step.title}</div>
                    <div className={styles.textTag}>{step.text}</div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className={styles.customProgress}>
              <div
                className={styles.progressFill}
                style={{
                  width: `${((activeIndex + 1) / totalSlides) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Форма (мобилка) */}
          <form onSubmit={handleSubmit} className={styles.auditForm}>
            <div className={styles.formTag}>Получить бесплатный аудит</div>
            <div className={styles.inputs}>
              <input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.name}
                required
              />
              <input
                type="tel"
                placeholder="Номер телефона"
                value={formatPhoneForDisplay(phone)}
                onChange={(e) => {
                  const input = e.target.value;
                  const digits = input.replace(/\D/g, "");
                  if (digits === "") {
                    setPhone("");
                  } else if (digits.length === 1) {
                    if (["7", "8", "9"].includes(digits)) {
                      setPhone(digits);
                    }
                  } else if (digits.length <= 11) {
                    setPhone(digits);
                  }
                }}
                className={styles.number}
                required
              />
            </div>
            <div className={styles.affBut}>
              <div
                className={`${styles.cube} ${isAgreed ? styles.checked : ""}`}
                onClick={() => setIsAgreed(!isAgreed)}
              ></div>
              <div className={styles.polit}>
                Я принимаю условия <br />
                <Link href="/politica">политики конфиденциальности</Link>
              </div>
            </div>
            <button
              type="submit"
              disabled={!isAgreed || isLoading}
              className={`${styles.anchorBut} ${
                (!isAgreed || isLoading) && styles.anchorButDisabled
              }`}
            >
              {isLoading ? (
                "Отправка..."
              ) : (
                <>
                  Оставить заявку  <span className="arrow" aria-hidden="true"></span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}