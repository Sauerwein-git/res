"use client";

import Image from "next/image";
import styles from "../home/tag/tagBlock.module.css";

type AuditButtonProps = {
  onClick: () => void;
  label?: string;
  arrowWidth?: number;
  arrowHeight?: number;
  className?: string;
  textClassName?: string;
  arrowStyle?: React.CSSProperties;
};

export default function AuditButton({
  onClick,
  label = "Начать с бесплатного аудита",
  arrowWidth = 40,
  arrowHeight = 20,
  className,
  textClassName,
  arrowStyle,
}: AuditButtonProps) {
  return (
    <button
      type="button"
      className={`${styles.button}${className ? ` ${className}` : ""}`}
      onClick={onClick}
    >
      <div
        className={`${styles.textButton}${textClassName ? ` ${textClassName}` : ""}`}
      >
        {label}
      </div>

      <Image
        src="/img/cartArrow.png"
        alt="arrow"
        width={arrowWidth}
        height={arrowHeight}
        style={arrowStyle}
      />
    </button>
  );
}
