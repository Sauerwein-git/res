import React from "react";
import styles from "./case.module.css";
import Image from "next/image";

import type { ReactNode } from "react";

type CaseCardProps = {
  id: number;
  market: string;
  image: string;
  resultText: ReactNode;
  summaryText: ReactNode;
  storyText: ReactNode;
  tellText: ReactNode;
  onClick: () => void;
};

export const CaseCard: React.FC<CaseCardProps> = ({
  id,
  market,
  image,
  resultText,
  summaryText,
  storyText,
  tellText,
  onClick,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.topBlock}>
        <div className={styles.upBlock}>
          <div className={styles.upper}>
            <div className={styles.market}>{market}</div>
            <Image src={image} alt={market} width={70} height={70} />
          </div>
          <div className={styles.lower}>
            <div className={styles.result}>{resultText}</div>
            <div className={styles.summary}>{summaryText}</div>
          </div>
        </div>
        <div className={styles.botBlock}>
          <div className={styles.story}>{storyText}</div>
          <div
            className={styles.tell}
            dangerouslySetInnerHTML={{ __html: tellText as string }}
          />
        </div>
      </div>
      <div onClick={onClick} className={styles.readButton}>
        <img
          src="/img/readbuttoncont.svg"
          alt=""
          aria-hidden="true"
          width={506}
          height={90}
          className={styles.desktopReadGraphic}
        />
        <div className={styles.textRB}>читать полностью</div>
        <div className={styles.imgRB}>
          <Image src="/img/cartArrow.png" alt="arrow" width={35} height={20} />
        </div>
      </div>
    </div>
  );
};
