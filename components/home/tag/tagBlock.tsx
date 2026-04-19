"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./tagBlock.module.css";
import ModalForm from "../../ModalForm/ModalForm";

type Measured = {
  startLeft: number;
  startTop: number;
  startBottom: number;
  startWidth: number;
  startHeight: number;
  dx: number;
  dy: number;
  scale: number;
  startScroll: number;
  endScroll: number;
};

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export default function TagBlock() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const logoRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMob = window.matchMedia("(max-width: 950px)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (isMob || reduceMotion) return;

    const logo = logoRef.current;
    const placeholder = placeholderRef.current;
    if (!logo || !placeholder) return;

    let raf = 0;
    let m: Measured | null = null;

    const resetLogo = () => {
      logo.style.position = "";
      logo.style.left = "";
      logo.style.top = "";
      logo.style.width = "";
      logo.style.height = "";
      logo.style.margin = "";
      logo.style.zIndex = "";
      logo.style.opacity = "";
      logo.style.pointerEvents = "";
      logo.style.transform = "";
    };

    const ensureFixed = (
      startLeft: number,
      startTop: number,
      startWidth: number,
      startHeight: number,
    ) => {
      logo.style.position = "fixed";
      logo.style.left = `${startLeft}px`;
      logo.style.top = `${startTop}px`;
      logo.style.width = `${startWidth}px`;
      logo.style.height = `${startHeight}px`;
      logo.style.margin = "0";
      logo.style.zIndex = "1200";
      logo.style.pointerEvents = "none";
    };

    const measure = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        if (document.fonts?.ready) await document.fonts.ready;
      } catch {}

      resetLogo();

      await new Promise<void>((r) => requestAnimationFrame(() => r()));
      await new Promise<void>((r) => requestAnimationFrame(() => r()));

      const startRect = logo.getBoundingClientRect();
      placeholder.style.height = `${startRect.height}px`;

      const targetEl = document.getElementById("header-logo");
      const targetRect = targetEl?.getBoundingClientRect();

      if (!targetRect || targetRect.width <= 0 || targetRect.height <= 0) {
        m = null;
        return;
      }

      const scaleW = targetRect.width / startRect.width;
      const scaleH = targetRect.height / startRect.height;
      const scale = Math.min(scaleW, scaleH);

      const dx = targetRect.left - startRect.left;
      const dy = targetRect.bottom - startRect.bottom;

      const startScroll = 0;
      const endScroll = 350;

      m = {
        startLeft: startRect.left,
        startTop: startRect.top,
        startBottom: startRect.bottom,
        startWidth: startRect.width,
        startHeight: startRect.height,
        dx,
        dy,
        scale,
        startScroll,
        endScroll,
      };
    };

    const apply = (pRaw: number) => {
      if (!m) return;

      const p = clamp(pRaw, 0, 1);
      const t = easeInOutCubic(p);

      if (p <= 0) {
        document.documentElement.classList.remove("ri-light");
        resetLogo();
        return;
      }

      ensureFixed(m.startLeft, m.startTop, m.startWidth, m.startHeight);

      const s = 1 + (m.scale - 1) * t;
      const x = m.dx * t;
      const y = m.dy * t;

      logo.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${s})`;

      if (p >= 1) {
        document.documentElement.classList.add("ri-light");
        logo.style.opacity = "0";
      } else {
        document.documentElement.classList.remove("ri-light");
        logo.style.opacity = "1";
      }
    };

    const render = () => {
      if (!m) return;
      const p =
        (window.scrollY - m.startScroll) / (m.endScroll - m.startScroll);
      apply(p);
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(render);
    };

    const onScroll = () => schedule();
    const onResize = async () => {
      await measure();
      schedule();
    };

    const start = async () => {
      await measure();
      schedule();
    };

    start();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.documentElement.classList.remove("ri-light");
      resetLogo();
    };
  }, []);

  return (
    <>
      <div className={`${styles.background} ${styles.pc}`}>
        <div className={styles.section}>
          <div ref={placeholderRef} className={styles.tagPlaceholder}>
            <div ref={logoRef} className={styles.tag} suppressHydrationWarning>
              RE SEARCH IT
            </div>
          </div>

          <div className={styles.block}>
            <div className={styles.leftBlock}>
              <div className={styles.textLeftBlock}>
                Маркетинговое агентство полного цикла: реализуем эффективные
                стратегии и{" "}
                <span className={styles.white}>
                  помогаем бизнесу зарабатывать больше
                </span>{" "}
                с помощью оптимизации бизнес-процессов
              </div>
              <div className={styles.imageBlock}>
                <Image
                  src="/img/hatter.png"
                  alt="hatter"
                  width={60}
                  height={60}
                />
                <Image
                  src="/img/flash.png"
                  alt="flash"
                  width={60}
                  height={60}
                />
                <Image
                  src="/img/target.png"
                  alt="target"
                  width={60}
                  height={60}
                />
              </div>
            </div>

            <div className={styles.rightBlock}>
              <div className={styles.tagRightBlock}>
                Создаем и реализуем{" "}
                <span className={styles.red}>эффективные</span> стратегии для
                роста бизнеса{" "}
              </div>

              <button
                type="button"
                className={styles.button}
                onClick={openModal}
              >
                <div className={styles.textButton}>
                  Начать с бесплатного аудита
                </div>
                <Image
                  src="/img/cartArrow.png"
                  alt="arrow"
                  width={40}
                  height={20}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.background} ${styles.mob}`}>
        <div className={styles.section}>
          <div className={styles.tag}>RE SEARCH IT</div>

          <div className={styles.imageBlock}>
            <Image src="/img/hatter.png" alt="hatter" width={35} height={35} />
            <Image src="/img/flash.png" alt="flash" width={35} height={35} />
            <Image src="/img/target.png" alt="target" width={35} height={35} />
          </div>

          <div className={styles.tagRightBlock}>
            Создаем и реализуем <span className={styles.red}>эффективные</span>{" "}
            стратегии для роста бизнеса{" "}
          </div>

          <div className={styles.textLeftBlock}>
            Маркетинговое агентство полного цикла: реализуем эффективные
            стратегии и{" "}
            <span className={styles.white}>
              помогаем бизнесу зарабатывать больше
            </span>{" "}
            с помощью оптимизации бизнес-процессов
          </div>

          <button type="button" className={styles.button} onClick={openModal}>
            <span className={styles.textButton}>
              Начать с бесплатного аудита
            </span>
            <Image
              src="/img/cartArrow.png"
              alt="arrow"
              width={75}
              height={70}
            />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div
          className={styles.modalOverlay}
          style={{ zIndex: 2000 }}
          onClick={closeModal}
        >
          <div
            className={styles.modal}
            style={{
              zIndex: 2001,
              background: "rgba(64, 72, 80, 1)",
              borderRadius: "12px",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.closeButton}
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "none",
                border: "none",
                fontSize: "24px",
                color: "white",
                cursor: "pointer",
              }}
            >
              ×
            </button>
            <ModalForm onClose={closeModal} />
          </div>
        </div>
      )}
    </>
  );
}
