import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./rule.module.css";

export default function Rule() {
  return (
    <>
      <div className={` ${styles.background} ${styles.pc}`}>
        <div className={styles.section}>
          <Image
            src="/img/cube.png"
            className={styles.cube}
            alt="cube"
            width={80}
            height={80}
          />
          <div className={styles.tag}>
            Мы переворачиваем правила игры: главная наша цель — ваш рост, а не
            наши проценты
          </div>
          <Image
            src="/img/iphone.webp"
            className={styles.iphone}
            alt="iphone"
            width={459}
            height={648}
          />
        </div>
      </div>
    </>
  );
}
