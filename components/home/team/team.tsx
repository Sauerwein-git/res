import React, { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./team.module.css";

export const Team: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const scrollBar = scrollBarRef.current;

    if (!scrollContainer || !scrollBar) return;

    const updateScrollIndicator = () => {
      const scrollWidth = scrollContainer.scrollWidth;
      const containerWidth = scrollContainer.clientWidth;
      const scrollPosition = scrollContainer.scrollLeft;

      if (scrollWidth <= containerWidth) {
        scrollBar.style.width = "0%";
        return;
      }

      const scrollPercentage =
        (scrollPosition / (scrollWidth - containerWidth)) * 100;

      scrollBar.style.width = `${scrollPercentage}%`;
    };

    // Инициализация при загрузке
    updateScrollIndicator();

    // Слушатель скролла
    scrollContainer.addEventListener("scroll", updateScrollIndicator);

    // Очистка
    return () => {
      scrollContainer.removeEventListener("scroll", updateScrollIndicator);
    };
  }, []);
  return (
    <>
      <section className={styles.team}>
        {/* <div className={styles.tag}>команда</div>
      <div className={styles.tagBlock}>
        <div className={styles.left}>
          <div className={styles.tagContent}>наша Команда</div>
        </div>
        <div className={styles.right}>
          <div className={styles.textBlock}>
            Каждый из нас эксперт в своей специальности.
            <br />
            Со старта работ, мы закрепим за вами проектную команду, KPI которой — рост
            <br />
            <span className={styles.black}>вашего дохода</span>
          </div>
        </div>
      </div>
      <div className={styles.meneg}>
        <div className={styles.lastBlock}>
          <div className={styles.firstBlock}>
            <div className={styles.firstBlockPart}>
              <div className={styles.img}>
                <Image
                  src="/img/Elena.webp"
                  alt="Elena"
                  width={173}
                  height={173}
                />
              </div>
              <div className={styles.firstBlock_name}>Елена</div>
            </div>
          </div>
          <div className={styles.secondBlock}>
            <div className={styles.secondBlockPart}>
              <div className={styles.img}>
                <Image
                  src="/img/Mich.webp"
                  alt="Mich"
                  width={173}
                  height={173}
                />
              </div>
              <div className={styles.secondBlock_name}>Михаил</div>
            </div>
          </div>
          <div className={styles.thirdBlock}>
            <div className={styles.img}>
              <Image src="/img/Anna.webp" alt="Anna" width={173} height={173} />
            </div>
            <div className={styles.thirdBlock_name}>Анна</div>
          </div>
        </div>
        <div className={styles.jobBlock}>
          <div className={styles.firstBlock_job}>Аналитик</div>
          <div className={styles.secondBlock_job}>
            Специалист <br className={styles.pc} /> по{' '}
            <br className={styles.mob} />
            контекстной <br className={styles.mob} />{' '}
            <br className={styles.pc} /> рекламе
          </div>
          <div className={`${styles.thirdBlock_job} ${styles.lastInv}`}>
            Менеджер по работе
            <br />с клиентами
          </div>
          <div className={`${styles.thirdBlock_job} ${styles.lastNoInv}`}>
            Менеджер
            <br />
            по работе
            <br />с клиентами
          </div>
        </div>
      </div> */}

        <div className={styles.teamTag}>команда</div>
        <div className={styles.firstBlock}>
          <div className={styles.invBlock}>
            <div className={styles.leftBlockInv}></div>
            <div className={styles.rightBlockInv}></div>
          </div>
          <div className={styles.tagBLock}>наша команда</div>
          <div className={styles.textBlock}>
            <div className={styles.textNoInv}>
              Каждый — эксперт в своей специальности.
              <br /> Со старта работ, мы закрепим за вами проектную команду,{" "}
              <span className={styles.black}>
                KPI которой рост вашего дохода
              </span>
            </div>
            <div className={styles.textInv}>
              <div>Каждый — эксперт в своей</div>
              <div> специальности. Со старта</div>
              <div> работ, мы закрепим за вами</div>
              <div>
                {" "}
                проектную команду,{" "}
                <span className={styles.black}>KPI которой</span>
              </div>
              <div>
                <span className={styles.black}> рост вашего дохода</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.take}>
          <div className={styles.personal}>
            <div className={styles.personalBLock}>
              <Image src="/img/El.png" alt="Elena" width={173} height={173} />
              <div className={styles.name}>Елена</div>
            </div>
            <div className={styles.personalBLock}>
              <Image src="/img/Mi.png" alt="Михаил" width={173} height={173} />
              <div className={styles.name}>Михаил</div>
            </div>
            <div className={styles.personalBLock}>
              <Image src="/img/An.png" alt="Анна" width={173} height={173} />
              <div className={styles.name}>Анна</div>
            </div>
          </div>
          <div className={styles.personalS}>
            <div className={styles.personalBLockS}>
              <div className={styles.job}>Аналитик</div>
            </div>
            <div className={styles.personalBLockS}>
              <div className={styles.job}>
                Специалист
                <br />
                по контекстной
                <br />
                рекламе
              </div>
            </div>
            <div className={styles.personalBLockS}>
              <div className={styles.job}>
                Менеджер по работе
                <br />с клиентами
              </div>
            </div>
          </div>
        </div>
        <div className={styles.mobBlocks}>
          <div className={styles.scrollContainer} ref={scrollContainerRef}>
            <div className={styles.scrollContent}>
              <div className={styles.mobTree}>
                <Image src="/img/El.png" alt="Elena" width={120} height={120} />
                <div className={styles.mobName}>Елена</div>
                <div className={styles.mobJob}>Аналитик</div>
              </div>
              <div className={styles.mobTree}>
                <Image src="/img/Mi.png" alt="Mich" width={120} height={120} />
                <div className={styles.mobName}>Михаил</div>
                <div className={styles.mobJob}>
                  Специалист по
                  <br />
                  контекстной
                  <br />
                  рекламе
                </div>
              </div>
              <div className={styles.mobTree}>
                <Image src="/img/An.png" alt="Anna" width={120} height={120} />
                <div className={styles.mobName}>Анна</div>
                <div className={styles.mobJob}>
                  Менеджер
                  <br />
                  по работе
                  <br />с клиентами
                </div>
              </div>
            </div>
          </div>
          <div className={styles.scrollIndicator}>
            <div className={styles.scrollBar} ref={scrollBarRef}></div>
          </div>
        </div>
      </section>
    </>
  );
};
