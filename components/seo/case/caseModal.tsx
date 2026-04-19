// CaseModal.tsx
import React from "react";
import styles from "./caseModal.module.css";
import Image from "next/image";

interface CaseData {
  market: string;
  image: string;
  resultText: string;
  summaryText: string;
  storyText: string;
  tellText: string;
}

interface CaseModalProps {
  data: CaseData | null;
  onClose: () => void;
}

export const CaseModal: React.FC<CaseModalProps> = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <div className={styles.header}>
          <h2>{data.market}</h2>
          <span className={styles.resultText}>{data.resultText}</span>
        </div>

        <div className={styles.content}>
          <Image
            src={data.image}
            alt={data.market}
            width={500}
            height={300}
            className={styles.modalImage}
            priority
          />

          <div className={styles.textBlock}>
            <div
              className={styles.summary}
              dangerouslySetInnerHTML={{ __html: data.summaryText }}
            />
            <div
              className={styles.story}
              dangerouslySetInnerHTML={{ __html: data.storyText }}
            />
            <div
              className={styles.tell}
              dangerouslySetInnerHTML={{ __html: data.tellText }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
