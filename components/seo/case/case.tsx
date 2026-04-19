import React, { useMemo, useState } from "react";
import styles from "./case.module.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { caseData } from "./caseData";
import { casePreviews } from "./casePreview";
import { CaseCard } from "./caseCard";

type CasePreview = {
  market: string;
  image: string;
  resultText: string;
  summaryText: string;
  storyText: string;
  tellText: string;
};

const previews = casePreviews as Record<number, CasePreview>;

const getCaseType = (id: number): "context" | "seo" => {
  return [1, 2, 3, 4, 5].includes(id) ? "context" : "seo";
};

export const Case: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<"all" | "context" | "seo">(
    "all",
  );
  const [activeModalId, setActiveModalId] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerSrc, setViewerSrc] = useState<string | null>(null);

  const filteredCaseIds = Object.keys(caseData)
    .map((key) => Number(key))
    .filter((id) => {
      const type = getCaseType(id);
      return activeFilter === "all" || activeFilter === type;
    });

  const seoBottomImages = useMemo((): string[] => {
    if (activeModalId == null) return [];
    if (!caseData[activeModalId]) return [];
    if (getCaseType(activeModalId) !== "seo") return [];
    return (caseData[activeModalId].images ?? []).slice(0, 4);
  }, [activeModalId]);

  const seoCols = Math.min(4, seoBottomImages.length);

  const openViewer = (src: string) => {
    setViewerSrc(src);
    setViewerOpen(true);
  };

  const closeViewer = () => {
    setViewerOpen(false);
    setViewerSrc(null);
  };

  return (
    <>
      <div className={styles.background}>
        <div className={styles.section}>
          <div className={styles.topBar}>
            <div className={styles.topCopy}>
              <div className={styles.topLine}>
                <span className={styles.topLineAccent}>Работаем в долгую:</span>{" "}
                средний срок сотрудничества &gt; 24 месяцев
              </div>
              <div className={styles.topText}>
                Залог результата работы - эффективная стратегия на старте и
                фокус в работе на конкретную цель
              </div>
            </div>
            <div className={styles.prevButton}>
              <div className={`custom-prevFive_Free ${styles.navButtonWrapper}`}>
                <Image
                  src="/img/leftButton.png"
                  alt="Previous"
                  width={70}
                  height={70}
                  className={`${styles.navButton}`}
                />
                <div className={`${styles.navButtonHover}`}>
                  <Image
                    src="/img/leftButtonHover.png"
                    alt="Previous Hover"
                    width={70}
                    height={70}
                  />
                </div>
              </div>

              <div className={`custom-nextFive_Free ${styles.navButtonWrapper}`}>
                <Image
                  src="/img/rightButton.png"
                  alt="Next"
                  width={70}
                  height={70}
                  className={`${styles.navButton}`}
                />
                <Image
                  src="/img/rightButtonHover.png"
                  alt="Next Hover"
                  width={70}
                  height={70}
                  className={`${styles.navButtonHover}`}
                />
              </div>
            </div>
          </div>
          <div className={styles.smallTag}>кейсы</div>
          <div className={styles.invBlock}>
            <div className={styles.leftBlockInv}></div>
            <div className={styles.rightBlockInv}></div>
          </div>
          <div className={styles.block}>
            <div className={styles.leftBlock}>Результаты клиентов</div>
            <div className={styles.rightBlock}>
              <div className={styles.textRightBlock}>
                Работаем в долгую: средний срок сотрудничества более 24 месяца
              </div>
              <div className={styles.prevButton}>
                <div
                  className={`custom-prevFive_Free ${styles.navButtonWrapper}`}
                >
                  <Image
                    src="/img/leftButton.png"
                    alt="Previous"
                    width={70}
                    height={70}
                    className={`${styles.navButton}`}
                  />
                  <div className={`${styles.navButtonHover}`}>
                    <Image
                      src="/img/leftButtonHover.png"
                      alt="Previous Hover"
                      width={70}
                      height={70}
                    />
                  </div>
                </div>

                <div
                  className={`custom-nextFive_Free ${styles.navButtonWrapper}`}
                >
                  <Image
                    src="/img/rightButton.png"
                    alt="Next"
                    width={70}
                    height={70}
                    className={`${styles.navButton}`}
                  />
                  <Image
                    src="/img/rightButtonHover.png"
                    alt="Next Hover"
                    width={70}
                    height={70}
                    className={`${styles.navButtonHover}`}
                  />
                </div>
              </div>
            </div>
          </div>

          <Swiper
            modules={[Navigation]}
            grabCursor={true}
            loop={false}
            navigation={{
              nextEl: ".custom-nextFive_Free",
              prevEl: ".custom-prevFive_Free",
            }}
            slidesPerView="auto"
            className={styles.swiper}
            onSlideChange={(swiper: SwiperClass) =>
              setActiveIndex(swiper.activeIndex)
            }
          >
            {filteredCaseIds.map((id) => {
              const preview = previews[id];
              if (!preview) return null;

              return (
                <SwiperSlide
                  className={`${styles.swiperSlide} ${styles.swiperSlideContent} MainProductSlider`}
                  key={id}
                >
                  <CaseCard
                    id={id}
                    market={preview.market}
                    image={preview.image}
                    resultText={preview.resultText}
                    summaryText={preview.summaryText}
                    storyText={preview.storyText}
                    tellText={preview.tellText}
                    onClick={() => setActiveModalId(id)}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>

          {filteredCaseIds.length > 0 && (
            <div className={styles.indicatorContainer}>
              <div className={styles.indicatorLine}>
                <div
                  className={styles.indicatorSlider}
                  style={{
                    left:
                      filteredCaseIds.length > 1
                        ? `${(activeIndex / (filteredCaseIds.length - 1)) * 90}%`
                        : "0%",
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {activeModalId !== null && caseData[activeModalId] && (
        <div
          className={styles.modalOverlay}
          onClick={() => setActiveModalId(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={() => setActiveModalId(null)}
              aria-label="Закрыть"
            >
              <Image
                src="/img/close-icon.svg"
                alt="Закрыть"
                width={25}
                height={25}
              />
            </button>

            <div className={styles.modalFirstSection}>
              <div className={styles.leftModalFirstSection}>
                <div className={styles.magazine}>
                  {caseData[activeModalId].title}
                </div>
                <div className={`${styles.tagModal} ${styles.firstTag}`}>
                  Цель клиента
                </div>
              </div>
              <div
                className={`${styles.rightBlockFirst} ${styles.fouRIghtBlockFirst} ${styles.client}`}
              >
                {caseData[activeModalId].clientGoal}
              </div>
            </div>

            <div
              className={`${styles.modalFirstSection} ${styles.secondModal}`}
            >
              <div className={styles.leftModalFirstSection}>
                <div className={styles.tagModal}>Что мы сделали</div>
              </div>
              <div className={styles.rightModalFirstSection}>
                {caseData[activeModalId].steps.map((step, index) => (
                  <div key={index} className={styles.stepItem}>
                    <div className={styles.stepLeft}>
                      <div className={styles.resultNumber}>{step.number}</div>
                      <div className={styles.resultTitle}>{step.title}</div>
                    </div>
                    <div
                      className={styles.stepDescription}
                      dangerouslySetInnerHTML={{ __html: step.description }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.modalResultsSection}>
              <div className={styles.tagModal}>
                {caseData[activeModalId]?.resultsTitle || "Результаты"}
              </div>
              <div className={styles.resultBlock}>
                <div className={styles.firstResultBlock}>
                  {caseData[activeModalId].resultsList.map((result, index) => (
                    <div
                      key={index}
                      className={`${styles.resultItem} ${styles.firstResultItem}`}
                    >
                      <div className={styles.resultLeft}>
                        <div
                          className={`${styles.resultTitle} ${styles.margintResult}`}
                        >
                          {result.title}
                        </div>
                      </div>
                      <div
                        className={`${styles.resultDescription} ${styles.widthResult}`}
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: result.description,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.secondResultBlock}>
                  {caseData[activeModalId].secondResultList?.map(
                    (result, index) => (
                      <div
                        key={`second-${index}`}
                        className={styles.secondResultItem}
                      >
                        <div className={styles.secondResultLeft}>
                          <div className={styles.secondResultTitle}>
                            <div
                              dangerouslySetInnerHTML={{ __html: result.title }}
                            />
                          </div>
                        </div>
                        <div className={styles.secondResultDescription}>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: result.description,
                            }}
                          />
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            {getCaseType(activeModalId) === "seo" &&
              seoBottomImages.length > 0 && (
                <div className={styles.seoImagesWrap}>
                  <div
                    className={styles.seoImagesGrid}
                    style={{
                      gridTemplateColumns: `repeat(${seoCols}, minmax(0, 1fr))`,
                    }}
                  >
                    {seoBottomImages.map((src, idx) => (
                      <button
                        key={`${activeModalId}_${idx}`}
                        type="button"
                        className={styles.seoImageItem}
                        onClick={() => openViewer(src)}
                        aria-label={`Открыть изображение ${idx + 1}`}
                      >
                        <Image
                          src={encodeURI(src)}
                          alt={`Изображение ${idx + 1}`}
                          fill
                          sizes="(max-width: 760px) 100vw, 1200px"
                          className={styles.seoImage}
                        />
                        <div className={styles.seoImageHint}>
                          Нажми, чтобы увеличить
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>
      )}

      {viewerOpen && viewerSrc && (
        <div className={styles.imageViewerOverlay} onClick={closeViewer}>
          <div
            className={styles.imageViewerContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.imageViewerClose}
              onClick={closeViewer}
              aria-label="Закрыть изображение"
            >
              <Image
                src="/img/close-icon.svg"
                alt="Закрыть"
                width={25}
                height={25}
              />
            </button>
            <div className={styles.imageViewerImg}>
              <Image
                src={encodeURI(viewerSrc)}
                alt="Увеличенное изображение"
                fill
                sizes="100vw"
                className={styles.imageViewerImgInner}
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
