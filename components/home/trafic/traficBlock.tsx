"use client";

import React, { FormEvent, useCallback, useMemo, useState } from "react";
import Image from "next/image";
import styles from "./traficBlock.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

function normalizePhoneDigits(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";

  if (digits.startsWith("8")) return ("7" + digits.slice(1)).slice(0, 11);
  if (digits.startsWith("9")) return ("7" + digits).slice(0, 11);
  if (digits.startsWith("7")) return digits.slice(0, 11);

  return digits.slice(0, 11);
}

function formatPhoneForDisplay(digits: string): string {
  if (!digits) return "";

  const d = digits.startsWith("7") ? digits.slice(1) : digits;

  const p1 = d.slice(0, 3);
  const p2 = d.slice(3, 6);
  const p3 = d.slice(6, 8);
  const p4 = d.slice(8, 10);

  let res = "+7";
  if (p1) res += `(${p1}`;
  if (p1 && p1.length === 3) res += ")";
  if (p2) res += `-${p2}`;
  if (p3) res += `-${p3}`;
  if (p4) res += `-${p4}`;

  return res;
}

function getErrorMessage(data: unknown): string | null {
  if (typeof data !== "object" || data === null) return null;
  if (!("error" in data)) return null;

  const err = (data as { error?: unknown }).error;
  return typeof err === "string" && err.trim() ? err : null;
}

const ARROW_W = 37.65;
const ARROW_H = 20;

const ARROW_W_MOB = 30.12;
const ARROW_H_MOB = 14.56;

export default function TraficBlock() {
  const [name, setName] = useState("");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const phoneDisplay = useMemo(
    () => formatPhoneForDisplay(phoneDigits),
    [phoneDigits],
  );

  const toggleAgree = useCallback(() => setIsAgreed((v) => !v), []);

  const handlePhoneChange = useCallback((value: string) => {
    setPhoneDigits(normalizePhoneDigits(value));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanName = name.trim();
    const cleanPhone = phoneDigits;

    if (!cleanName || cleanPhone.length !== 11) {
      setError("Пожалуйста, заполните имя и корректный номер телефона.");
      return;
    }

    if (!isAgreed) {
      setError("Пожалуйста, примите условия политики конфиденциальности.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://research-it.ru/api/send-form.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: cleanName, phone: cleanPhone }),
      });

      let data: unknown = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (response.ok) {
        setName("");
        setPhoneDigits("");
        setIsAgreed(false);
        router.push("/thanks");
        return;
      }

      const msg = getErrorMessage(data) ?? "Неизвестная ошибка";
      setError(`Ошибка: ${msg}`);
    } catch (err) {
      console.error(err);
      setError("Не удалось отправить заявку. Проверьте соединение.");
    } finally {
      setIsLoading(false);
    }
  };

  const submitClassName = `${styles.affButton} ${!isAgreed || isLoading ? styles.affButtonDisabled : ""}`;

  return (
    <div className={styles.background}>
      <div className={styles.section}>
        <div className={styles.smallTag}>УСЛУГИ</div>

        <div className={styles.invBlock} aria-hidden="true">
          <div className={styles.leftBlockInv} />
          <div className={styles.rightBlockInv} />
        </div>

        <div className={styles.block}>
          <div className={styles.leftBlock}>Трафик и клиенты</div>
          <div className={styles.rightBlock}>
            Составляем стратегию строго от вашей экономики, чтобы не просто
            увеличивать рекламные бюджеты, а наращивать прибыль бизнеса
          </div>
        </div>

        <div className={styles.cartBlock}>
          <div className={styles.leftCartBlock}>
            <Link href="/context">
              <div className={styles.contextCart}>
                <div className={styles.upFloor}>
                  <div className={styles.leftPos}>
                    <span className={styles.redDotWrapper}>
                      <Image
                        src="/img/redDot.png"
                        alt="dot"
                        width={16.68}
                        height={16.68}
                      />
                    </span>
                    <div className={styles.cartTag}>
                      Контекстная реклама в Я.Директ
                    </div>
                  </div>
                  <Image
                    src="/img/yandexDirect.png"
                    alt="yandex"
                    width={70}
                    height={70}
                  />
                </div>

                <div className={styles.botFloor}>
                  <div className={styles.contextText}>
                    Выстроим стратегию и полностью заберем ответственность за
                    канал трафика
                  </div>
                  <Image
                    src="/img/cartArrow.png"
                    alt="arrow"
                    width={ARROW_W}
                    height={ARROW_H}
                    className={styles.arrowImg}
                  />
                </div>

                <div className={`${styles.mob} ${styles.bottomContent}`}>
                  <Image
                    src="/img/yandexDirect.png"
                    alt="yandex"
                    width={48}
                    height={48}
                  />
                  <div className={styles.smallArrow}>
                    <Image
                      src="/img/cartArrow.png"
                      alt="arrow"
                      width={ARROW_W_MOB}
                      height={ARROW_H_MOB}
                      className={styles.arrowImg}
                    />
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/seo">
              <div className={styles.seoCart}>
                <div className={styles.upFloor}>
                  <div className={styles.leftPos}>
                    <span className={styles.redDotWrapper}>
                      <Image
                        src="/img/redDot.png"
                        alt="dot"
                        width={16.68}
                        height={16.68}
                      />
                    </span>
                    <div className={`${styles.cartTag} ${styles.seoTagWidth}`}>
                      SEO-продвижение
                      <br className={styles.mob} /> в Яндекс и Google
                    </div>
                  </div>

                  <div className={styles.imgCart}>
                    <Image
                      src="/img/yandex.png"
                      alt="yandex"
                      width={70}
                      height={70}
                    />
                    <Image
                      src="/img/google.png"
                      alt="google"
                      width={70}
                      height={70}
                    />
                  </div>
                </div>

                <div className={styles.botFloor}>
                  <div className={styles.contextText}>
                    Привлекаем лидов в 5 раз дешевле, <br />
                    чем с других каналов трафика
                  </div>
                  <Image
                    src="/img/cartArrow.png"
                    alt="arrow"
                    width={ARROW_W}
                    height={ARROW_H}
                    className={styles.arrowImg}
                  />
                </div>

                <div className={`${styles.mob} ${styles.bottomContent}`}>
                  <div className={styles.imgCart}>
                    <Image
                      src="/img/yandex.png"
                      alt="yandex"
                      width={48}
                      height={48}
                    />
                    <Image
                      src="/img/google.png"
                      alt="google"
                      width={48}
                      height={48}
                    />
                  </div>
                  <div className={styles.smallArrow}>
                    <Image
                      src="/img/cartArrow.png"
                      alt="arrow"
                      width={ARROW_W_MOB}
                      height={ARROW_H_MOB}
                      className={styles.arrowImg}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className={styles.rightCartBlock}>
            <div className={styles.auditTag}>Аудит вашей рекламы</div>

            <div className={styles.auditText}>
              Найдем эффективные действия и ошибки в текущих процессах, соберем
              детальную аналитику по рынку:{" "}
              <strong>что успешного делают ваши конкуренты</strong> и какие
              проверенные действия можно повторить, чтобы не слить деньги на
              тест
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputs}>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.formInput}
                  autoComplete="name"
                  required
                />

                <input
                  type="tel"
                  placeholder="Номер телефона"
                  value={phoneDisplay}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  className={styles.formInput}
                  inputMode="tel"
                  autoComplete="tel"
                  required
                />
              </div>

              {error && <div className={styles.errorMessage}>{error}</div>}

              <div className={styles.confirmZone}>
                <div className={styles.buttonZone}>
                  <button
                    type="button"
                    className={`${styles.checkBox} ${isAgreed ? styles.checked : ""}`}
                    onClick={toggleAgree}
                    aria-pressed={isAgreed}
                    aria-label="Согласие с политикой конфиденциальности"
                  />
                  <div className={styles.conf}>
                    Я принимаю условия
                    <br />
                    <Link href="/politica" className={styles.confLink}>
                      политики конфиденциальности
                    </Link>
                  </div>
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

              <button
                type="submit"
                disabled={!isAgreed || isLoading}
                className={submitClassName}
              >
                {isLoading ? (
                  "Отправка..."
                ) : (
                  <>
                    <Image
                      src="/img/whiteStartButton.svg"
                      alt="Начать с бесплатного аудита"
                      width={689}
                      height={90}
                      className={styles.affButtonGraphic}
                    />
                    <span className={styles.affButtonMobileContent}>
                      <span className={styles.textButtontext}>
                      Начать с бесплатного аудита
                    </span>
                      <Image
                      src="/img/cartArrow.png"
                      alt="arrow"
                      width={ARROW_W}
                      height={ARROW_H}
                      className={styles.arrowImg}
                    />
                    </span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className={styles.soon}>
          <img src="/img/SoonBut.svg" alt="Скоро" width={75} height={34} />
        </div>

        <div className={styles.invBlock} aria-hidden="true">
          <div className={styles.leftBlockInv} />
          <div className={styles.rightBlockInv} />
        </div>

        <div className={styles.block}>
          <div className={styles.leftBlock}>Сайты и приложения</div>
          <div className={`${styles.rightBlock} ${styles.textSite}`}>
            Заходим в любые изменения сайта или разработку после расчета
            плановых метрик. Строим работу прозрачно, поэтапно и озвучиваем
            точные бюджеты перед стартом работы
          </div>
        </div>

        <div className={styles.blockBox}>
          <div className={styles.box}>
            <div className={styles.boxUp}>
              <div className={styles.upTag}>Разработка приложения</div>
              <Image src="/img/phone.png" alt="phone" width={40} height={40} />
            </div>
            <div className={styles.boxBot}>
              Реализуем вашу задумку качественно, с прозрачными сроками и
              бюджетом
            </div>
          </div>

          <div className={styles.box}>
            <div className={styles.boxUp}>
              <div className={styles.upTag}>
                Повышение <br className={styles.mob} />
                конверсии сайта
              </div>
              <Image
                src="/img/converse.png"
                alt="converse"
                width={40}
                height={40}
              />
            </div>
            <div className={styles.boxBot}>
              Повышаем эффективность сайта, чтобы увеличить доход бизнеса
            </div>
          </div>

          <div className={styles.box}>
            <div className={styles.boxUp}>
              <div className={styles.upTag}>
                Разработка
                <br /> сайта
              </div>
              <Image src="/img/pcmob.svg" alt="pcmob" width={40} height={40} />
            </div>
            <div className={styles.boxBot}>
              Полностью погружаемся в специфику и делаем эффективный сайт с нуля
              без лишних тестов
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
