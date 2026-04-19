"use client";

import Image from "next/image";
import styles from "./footer.module.css";
import Link from "next/link";
import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import ModalForm from "../ModalForm/ModalForm";

function normalizePhoneDigits(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("9")) digits = `7${digits}`;
  if (digits.length > 11) digits = digits.slice(0, 11);
  return digits;
}

function formatPhoneForDisplay(digits: string): string {
  if (!digits) return "";

  if (digits.startsWith("8")) {
    const p0 = digits.slice(0, 1);
    const p1 = digits.slice(1, 4);
    const p2 = digits.slice(4, 7);
    const p3 = digits.slice(7, 9);
    const p4 = digits.slice(9, 11);
    return [p0, p1, p2, p3, p4].filter(Boolean).join("-");
  }

  if (digits.startsWith("7")) {
    const p1 = digits.slice(1, 4);
    const p2 = digits.slice(4, 7);
    const p3 = digits.slice(7, 9);
    const p4 = digits.slice(9, 11);

    let res = "+7";
    if (p1) res += `(${p1}`;
    if (p2) res += `)-${p2}`;
    if (p3) res += `-${p3}`;
    if (p4) res += `-${p4}`;
    return res;
  }

  return digits;
}

function isValidRuPhone(digits: string): boolean {
  return (
    digits.length === 11 && (digits.startsWith("7") || digits.startsWith("8"))
  );
}

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const [name, setName] = useState("");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const isThanksPage = pathname === "/thanks";

  const phoneDisplay = useMemo(
    () => formatPhoneForDisplay(phoneDigits),
    [phoneDigits],
  );

  const bigWrapRef = useRef<HTMLDivElement | null>(null);
  const bigTextRef = useRef<HTMLDivElement | null>(null);
  const [bigScaleX, setBigScaleX] = useState(1);

  const recalcBig = useCallback(() => {
    const wrap = bigWrapRef.current;
    const text = bigTextRef.current;
    if (!wrap || !text) return;

    const maxW = wrap.clientWidth;
    const textW = text.scrollWidth;

    if (!maxW || !textW) return;

    const s = Math.min(1, maxW / textW);
    const safe = Math.max(0.01, Math.min(1, s * 0.999));
    const nextScale = Number(safe.toFixed(4));
    setBigScaleX((prev) => (prev === nextScale ? prev : nextScale));
  }, []);

  useLayoutEffect(() => {
    recalcBig();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => recalcBig());
      if (bigWrapRef.current) ro.observe(bigWrapRef.current);
      if (bigTextRef.current) ro.observe(bigTextRef.current);
    }

    window.addEventListener("resize", recalcBig);
    return () => {
      window.removeEventListener("resize", recalcBig);
      if (ro) ro.disconnect();
    };
  }, [recalcBig]);

  const handleNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value),
    [],
  );

  const handlePhoneChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setPhoneDigits(normalizePhoneDigits(e.target.value)),
    [],
  );

  const toggleAgreement = useCallback(() => setIsAgreed((v) => !v), []);
  const isSubmitDisabled = !isAgreed || isLoading;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const n = name.trim();
    if (!n) {
      alert("Пожалуйста, укажите имя.");
      return;
    }

    if (!isValidRuPhone(phoneDigits)) {
      alert("Пожалуйста, введите корректный номер телефона (11 цифр).");
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: n, phone: phoneDigits }),
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
      } else {
        const msg =
          typeof data === "object" && data && "error" in data
            ? String(
                (data as { error?: unknown }).error ?? "Неизвестная ошибка",
              )
            : "Неизвестная ошибка";
        alert(`Ошибка: ${msg}`);
      }
    } catch {
      alert("Не удалось отправить заявку. Проверьте соединение.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <footer className={styles.background}>
        <div className={styles.section}>
          {!isThanksPage && (
            <div className={styles.smallTag}>
              Бесплатный аудит вашей рекламы
            </div>
          )}

          <div className={styles.invBlock}>
            <div className={styles.leftBlockInv} />
            <div className={styles.rightBlockInv} />
          </div>

          {!isThanksPage && (
            <div className={`${styles.block} ${styles.auditBlock}`}>
              <div className={styles.leftBlock}>
                <div className={styles.firstTag}>
                  Есть запрос на рост бизнеса?{" "}
                  <span className={styles.red}>Давайте пообщаемся</span>
                </div>
                <div className={styles.firstText}>
                  Мы оценим текущую ситуацию и расскажем, чем можем быть вам
                  полезны. Свяжемся в течение 24-х часов и все организуем
                </div>
              </div>

              <div className={styles.rightBlock}>
                <form onSubmit={handleSubmit} className={styles.footerForm}>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={name}
                    onChange={handleNameChange}
                    className={styles.footerInput}
                    autoComplete="name"
                    required
                  />

                  <input
                    type="tel"
                    placeholder="Номер телефона"
                    value={phoneDisplay}
                    onChange={handlePhoneChange}
                    inputMode="tel"
                    autoComplete="tel"
                    className={styles.footerInput}
                    required
                  />

                  <div className={styles.footerAgreement}>
                    <button
                      type="button"
                      className={`${styles.footerCheckbox} ${
                        isAgreed ? styles.checked : ""
                      }`}
                      aria-pressed={isAgreed}
                      aria-label="Согласие с политикой конфиденциальности"
                      onClick={toggleAgreement}
                    />
                    <div className={styles.footerLabel}>
                      Я принимаю условия{" "}
                      <Link
                        href="/politica"
                        className={styles.footerPolicyLink}
                      >
                        политики конфиденциальности
                      </Link>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitDisabled}
                    className={`${styles.footerSubmitButton} ${
                      isSubmitDisabled ? styles.disabled : ""
                    }`}
                  >
                    {isLoading ? "Отправка..." : "Оставить заявку"}
                    <Image
                      src="/img/cartArrow.png"
                      alt="arrow"
                      width={40}
                      height={20}
                    />
                  </button>
                </form>
              </div>
            </div>
          )}

          <div className={styles.block}>
            <div className={styles.leftBlock}>
              <div className={styles.leftF}>
                <div className={styles.lTag}>RE SEARCH IT</div>
                <div className={styles.lText}>rock your business</div>

                <div className={styles.imgBlock}>
                  <Image
                    src="/img/hatter.png"
                    alt="icon"
                    width={45}
                    height={45}
                  />
                  <Image
                    src="/img/flash.png"
                    alt="icon"
                    width={45}
                    height={45}
                  />
                  <Image
                    src="/img/target.png"
                    alt="icon"
                    width={45}
                    height={45}
                  />
                </div>
              </div>
            </div>

            <div className={styles.rightBlock}>
              Ваш партнер <br className={styles.mobOnly} /> в
              digital-маркетинге. Повышаем{" "}
              <span className={styles.red}>
                продажи <br className={styles.mobOnly} /> и прибыль
              </span>{" "}
              в вашем бизнесе
            </div>
          </div>

          <div className={styles.block}>
            <div className={`${styles.leftBlock} ${styles.obl}`}>
              <div className={styles.leftF}>
                <div className={styles.tagPlaceHolder}>
                  <div className={styles.placeText}>Позвонить</div>
                  <div className={styles.placeAnswer}>
                    <Link href="tel:+79999999999">+7 999 999 99 99</Link>
                  </div>
                </div>

                <div className={styles.tagPlaceHolder}>
                  <div className={styles.placeText}>Написать</div>
                  <div className={styles.placeAnswer}>
                    <Link href="mailto:hi@research-it.ru">
                      hi@research-it.ru
                    </Link>
                  </div>
                </div>

                <div className={styles.tagPlaceHolder}>
                  <div className={styles.placeText}>Быстрая связь</div>
                  <div className={styles.placeAnswer}>
                    <Link
                      href="https://web.telegram.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Telegram
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles.rightBlock} ${styles.flex}`}>
              <div className={styles.clientBlock}>
                <div className={styles.tagClient}>
                  <Link href="/seo">Трафик и клиенты</Link>
                </div>

                <div className={styles.textClient}>
                  <Link href="/context">Контекстная реклама в Я.Директ</Link>
                </div>
                <div className={styles.textClient}>
                  <Link href="/context">SEO-продвижение</Link>
                </div>
                <div className={styles.textClient}>
                  <button
                    type="button"
                    className={styles.linkButton}
                    onClick={openModal}
                  >
                    Бесплатный аудит вашей рекламы
                  </button>
                </div>
              </div>

              <div className={styles.caseBlock}>
                <div className={styles.caseTag}>
                  <Link href="/case">Кейсы</Link>
                </div>
                <div className={styles.caseTag}>
                  <Link href="/about">О нас</Link>
                </div>
              </div>
            </div>
          </div>

          <div
            className={styles.bigTagWrap}
            ref={bigWrapRef}
            aria-hidden="true"
          >
            <div
              className={styles.bigTag}
              ref={bigTextRef}
              style={{ transform: `scaleX(${bigScaleX})` }}
            >
              RE SEARCH IT
            </div>
          </div>

          <div className={styles.divrBlock}>
            <div className={styles.divrLink}>
              <Link href="/">© RE SEARCH IT, 2026</Link>
            </div>
            <div className={styles.divrLink}>
              <Link href="/politica">
                Политика обработки персональных данных
              </Link>
            </div>
            <div className={styles.divrLink}>
              <Link href="/agreement">Пользовательское соглашение</Link>
            </div>
          </div>
        </div>
      </footer>

      {isModalOpen && <ModalForm onClose={closeModal} />}
    </>
  );
}
