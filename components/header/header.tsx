"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import styles from "./header.module.css";
import ModalForm from "../ModalForm/ModalForm";

const DynamicHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeadStickyVisible, setIsHeadStickyVisible] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const closeAuditModal = useCallback(() => setIsAuditModalOpen(false), []);

  const openAuditModal = useCallback(() => {
    setIsMenuOpen(false);
    setIsAuditModalOpen(true);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsAuditModalOpen(false);
    setIsMenuOpen((v) => !v);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsHeadStickyVisible(window.scrollY >= 350);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const anyOpen = isMenuOpen || isAuditModalOpen;
    document.body.style.overflow = anyOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, isAuditModalOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setIsMenuOpen(false);
      setIsAuditModalOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <div
        className={`${styles.headSticky} ${isHeadStickyVisible ? styles.visible : ""}`}
        role="banner"
      >
        <div className={styles.underFlex}>
          <div className={styles.flex}>
            <div className={styles.flexss}>
              <div className={styles.leftBlock}>
                <Link href="/" aria-label="На главную">
                  <div id="header-logo" className={styles.Tag}>
                    RE SEARCH IT
                  </div>
                  <div className={styles.description}>rock your business</div>
                </Link>
              </div>

              <div className={styles.mediumBlock}>
                <div className={styles.borderMediumBlock}>
                  <div className={styles.textMediumBlock}>
                    Ваш партнер в digital-маркетинге.
                    <br />
                    Повышаем продажи и прибыль в вашем бизнесе
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.rightBLock}>
              <button
                type="button"
                className={styles.menu}
                onClick={toggleMenu}
                aria-expanded={isMenuOpen}
                aria-controls="header-menu-modal"
                aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
              >
                <img
                  className={styles.buttonGraphic}
                  src={
                    isMenuOpen
                      ? "/img/menuButtonClose.svg"
                      : "/img/menuButton.svg"
                  }
                  alt=""
                  aria-hidden="true"
                  width={168}
                  height={60}
                />
                <span className={styles.mobileMenuContent} aria-hidden="true">
                  <img
                    className={styles.mobileButtonLabelSvg}
                    src="/img/menuMob.svg"
                    alt=""
                    width={80}
                    height={15}
                  />
                </span>
              </button>

              <button
                type="button"
                className={styles.report}
                onClick={openAuditModal}
                aria-label="Оставить заявку"
              >
                <img
                  className={styles.buttonGraphic}
                  src="/img/zayavkaButton.svg"
                  alt=""
                  aria-hidden="true"
                  width={270}
                  height={60}
                />
                <span className={styles.mobileReportContent} aria-hidden="true">
                  <img
                    className={styles.mobileButtonLabelSvg}
                    src="/img/zayavMob.svg"
                    alt=""
                    width={84}
                    height={15}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.fon} aria-hidden="true" />
      </div>

      {isMenuOpen && (
        <div
          className={styles.modalOverlay}
          onClick={closeMenu}
          role="dialog"
          aria-modal="true"
        >
          <div
            id="header-menu-modal"
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.modalClose}
              onClick={closeMenu}
              aria-label="Закрыть меню"
            >
              ×
            </button>

            <div className={`${styles.modalContent} ${styles.deskModal}`}>
              <div className={styles.root}>
                <div className={styles.modalColumn}>
                  <div className={styles.underMovalColumn}>
                    <div className={styles.modalTitle}>
                      <Link href="/seo">ТРАФИК И КЛИЕНТЫ</Link>
                    </div>

                    <ul className={styles.modalList}>
                      <li>
                        <Link href="/context">
                          Контекстная реклама в Я.Директ
                        </Link>
                      </li>
                      <li>
                        <Link href="/seo">SEO-продвижение</Link>
                      </li>
                      <li>
                        <button
                          type="button"
                          className={styles.modalLinkButton}
                          onClick={openAuditModal}
                        >
                          <span className={styles.modalRedText}>
                            <span className={styles.red}>Бесплатный аудит</span>{" "}
                            вашей рекламы
                          </span>
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div className={styles.metaLink}>
                    <div className={styles.numberLink}>Позвонить</div>
                    <a className={styles.linkOfMeta} href="tel:+79999999999">
                      +7 999 999 99 99
                    </a>
                  </div>
                </div>

                <div className={styles.modalColumn}>
                  <div className={styles.underMovalColumn}>
                    <div className={`${styles.modalTitle} ${styles.flMT}`}>
                      <div className={styles.titleTitle}>
                        Сайты и приложения
                      </div>
                      <img
                        className={styles.textSoon}
                        src="/img/menusoon.svg"
                        alt="скоро"
                        width={75}
                        height={34}
                      />
                    </div>

                    <ul className={styles.modalList}>
                      <li>Повышение конверсии сайта</li>
                      <li>Разработка сайта</li>
                      <li>Разработка приложения</li>
                    </ul>
                  </div>

                  <div className={styles.metaLink}>
                    <div className={styles.numberLink}>Написать</div>
                    <a
                      className={styles.linkOfMeta}
                      href="mailto:hi@research-it.ru"
                    >
                      hi@research-it.ru
                    </a>
                  </div>
                </div>

                <div className={styles.modalColumn}>
                  <div className={styles.underMovalColumn}>
                    <div
                      className={styles.modalTitle}
                      style={{ maxWidth: "460px" }}
                    >
                      <Link href="/about">О нас</Link>
                    </div>

                    <div className={`${styles.modalTitle} ${styles.TitleFlex}`}>
                      Наши клиенты заработали
                      <br />
                      <span className={styles.red}>
                        более 1 368 000 000 <span className="rub">₽</span>
                      </span>
                    </div>

                    <ul className={styles.modalList}>
                      <li>
                        <Link href="/case">
                          <span className={styles.modalRedText}>
                            Смотреть все кейсы [&nbsp;
                            <span className={styles.arrowEl}>→</span>&nbsp;]
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div
                    className={`${styles.metaLink} ${styles.metaLinkLastChild}`}
                  >
                    <div className={styles.numberLink}>Быстрая связь</div>
                    <div className={styles.typeOfLink}>
                      <Link href="https://web.telegram.org/a/">
                        <div className={styles.linkOfMeta}>Telegram</div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles.modalContent} ${styles.mobModal}`}>
              <div className={styles.root1}>
                <div className={styles.modalColumn}>
                  <div className={styles.modalTitle}>ТРАФИК И КЛИЕНТЫ</div>
                  <ul className={styles.modalList}>
                    <li>
                      <Link href="/context">
                        Контекстная реклама в Я.Директ
                      </Link>
                    </li>
                    <li>
                      <Link href="/seo">SEO-продвижение</Link>
                    </li>
                    <li>
                      <button
                        type="button"
                        className={styles.modalLinkButton}
                        onClick={openAuditModal}
                      >
                        <span className={styles.modalRedText}>
                          <span className={styles.red}>Бесплатный аудит</span>{" "}
                          вашей рекламы
                        </span>
                      </button>
                    </li>
                  </ul>
                </div>

                <div className={styles.modalColumn}>
                  <div className={styles.modalTitle}>Сайты и приложения</div>
                  <ul className={styles.modalList}>
                    <li>
                      <Link href="/context">Повышение конверсии сайта</Link>
                    </li>
                    <li>
                      <Link href="/seo">Разработка сайта</Link>
                    </li>
                    <li>
                      <Link href="/services" className={styles.modalRedText}>
                        Разработка приложения
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className={styles.modalColumn}>
                  <div className={styles.modalTitle}>О нас</div>
                  <div
                    className={`${styles.modalTitle} ${styles.modalTitleLastChild}`}
                  >
                    Наши клиенты заработали
                    <br />
                    <span className={styles.red}>более 1 368 000 000</span>
                  </div>
                  <ul className={styles.modalList}>
                    <li>
                      <Link href="/case" className={styles.modalRedText}>
                        смотреть все кейсы [&nbsp;
                        <span className={styles.arrowEl}>→</span>&nbsp;]
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className={styles.metaLink}>
                  <div className={styles.numberLink}>Позвонить</div>
                  <a className={styles.linkOfMeta} href="tel:+79999999999">
                    +7 999 999 99 99
                  </a>
                </div>

                <div className={styles.metaLink}>
                  <div className={styles.numberLink}>Написать</div>
                  <a
                    className={styles.linkOfMeta}
                    href="mailto:hi@research-it.ru"
                  >
                    hi@research-it.ru
                  </a>
                </div>

                <div
                  className={`${styles.metaLink} ${styles.metaLinkLastChild}`}
                >
                  <div className={styles.numberLink}>Быстрая связь</div>
                  <div className={styles.typeOfLink}>
                    <Link href="https://web.telegram.org/a/">
                      <div className={styles.linkOfMeta}>Telegram</div>
                    </Link>
                    <div className={styles.linkOfMeta}> / </div>
                    <Link href="https://www.whatsapp.com/?lang=ru_RU">
                      <div className={styles.linkOfMeta}>WhatsApp</div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isAuditModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={closeAuditModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={`${styles.modal} ${styles.modalAudit}`}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalForm onClose={closeAuditModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default DynamicHeader;
