import { useState, useEffect } from "react";
import styles from "./effect.module.css";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useRouter } from "next/router";
import Image from "next/image";

const steps = [
  {
    num: "01",
    title: "Погружаемся в продукт и ваш бизнес и собираем статистику",
    text: "Чтобы говорить на одном языке, знакомимся с продуктом, рынком, конкурентами и собираем данные за 6 месяцев",
  },
  {
    num: "02",
    title: "Поиск точек роста и упущенной прибыли",
    text: "Анализ данных и поиск закономерностей: что работало хорошо, а что можно улучшить",
  },
  {
    num: "03",
    title: "Анализ рынка и рекламы конкурентов",
    text: "С помощью наших партнеров и баз данных определяем, что эффективно работает у ваших конкурентов и на какие бенчмарки по рынку стоит ориентироваться",
  },
  {
    num: "04",
    title: "Расчет unit-экономики",
    text: "Определим целевые показатели и разрабатываем стратегию, при которой вы окупаете расходы на трафик",
  },
  {
    num: "05",
    title: "Составляем стратегию",
    text: "Разрабатываем понятный и поэтапный план работ",
  },
];

export default function Effect() {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = steps.length;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formatPhoneForDisplay = (digits: string): string => {
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
      const start = digits.startsWith("9") ? 0 : 1;
      const p1 = digits.slice(start, start + 3);
      const p2 = digits.slice(start + 3, start + 6);
      const p3 = digits.slice(start + 6, start + 8);
      const p4 = digits.slice(start + 8, start + 10);

      if (p1) res += `(${p1}`;
      if (p2) res += `)-${p2}`;
      if (p3) res += `-${p3}`;
      if (p4) res += `-${p4}`;
      return res;
    }

    return digits;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || phone.length < 11) {
      alert("Пожалуйста, заполните все поля корректно.");
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
          <div className={styles.tag}>
            Начинаем работу с расчета <span className="red">эффективной</span>{" "}
            стратегии
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
                      if (digits === "7" || digits === "8" || digits === "9") {
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
                  <Link href="/context">политики конфиденциальности</Link>
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
                    <img
                      src="/img/contostz.svg"
                      alt=""
                      aria-hidden="true"
                      width={461}
                      height={90}
                      className={styles.desktopSubmitGraphic}
                    />
                    Оставить заявку{" "}
                    <Image
                      src="/img/cartArrow.png"
                      alt="arrow"
                      width={40}
                      height={20}
                    />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className={`${styles.background} ${styles.mob}`}>
        <div className={styles.section}>
          <div className={styles.tag}>
            Начинаем работу с расчета <span className="red">эффективной</span>{" "}
            стратегии
          </div>

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
                    if (digits === "7" || digits === "8" || digits === "9") {
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
                <Link href="/context">политики конфиденциальности</Link>
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
                  Оставить заявку{" "}
                  <Image
                    src="/img/cartArrow.png"
                    alt="arrow"
                    width={36}
                    height={20}
                  />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
