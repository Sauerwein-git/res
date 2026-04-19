import { useState } from "react";
import styles from "./report.module.css";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import ModalForm from "../../ModalForm/ModalForm";

const steps = [
  {
    num: "01",
    title: "Настройка сквозной аналитики и создание единого отчета",
    text: "Чтобы наша работа была прозрачной и всегда “под рукой” были данные для принятия решений",
  },
  {
    num: "02",
    title: "Разрабатываем структуру личного кабинета",
    text: "Чтобы в работе был порядок, а если решите уйти, то все будет понятно новому подрядчику",
  },
  {
    num: "03",
    title: "Распределяем бюджет и выделяем маржинальные продукты",
    text: "Поймем, как быстрее вывести рекламу на окупаемость и ускорить рост. Если потребуется, для консультации подключим дополнительных специалистов",
  },
  {
    num: "04",
    title: "Запускаем кампании",
    text: "Сроки запуска индивидуальны, их сообщаем клиентам сразу после аудита. После запуска отслеживаем кампании ежедневно, чтобы не откланяться от плановых показателей",
  },
  {
    num: "05",
    title: "Находим точки роста и оптимизируем",
    text: "Ищем то, что можно улучшить и составляем гипотезы на внедрение. Смотрим на работу всей воронки: эффективность сайта, работа отдела продаж и тд",
  },
];

export default function Report() {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = steps.length;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className={`${styles.background} ${styles.pc}`}>
        <div className={styles.section}>
          <div className={styles.upBox}>
            <div className={styles.left}>
              <div className={styles.tag}>Прозрачный ежедневный отчет</div>
            </div>
            <div className={styles.right}>
              <div className={styles.textUp}>
                Настраиваем всё для вашего и нашего удобства
              </div>
            </div>
          </div>
          <div className={styles.upBox} style={{ marginTop: "36px" }}>
            <div className={styles.left}>
              <div className={styles.textBot}>
                Каждый бизнес уникален, поэтому <br />
                по желанию дополним отчет важными для вас показателями
              </div>
            </div>
            <div className={styles.right}>
              <button
                type="button"
                className={styles.button}
                onClick={openModal}
              >
                <img
                  src="/img/contfob.svg"
                  alt=""
                  aria-hidden="true"
                  width={729}
                  height={90}
                  className={styles.desktopButtonGraphic}
                />
                Начать с бесплатного аудита{" "}
                <Image
                  src="/img/cartArrow.png"
                  alt="arrow"
                  width={40}
                  height={20}
                />
              </button>
            </div>
          </div>
          <div className={styles.monitorBox}>
            <div className={styles.leftPart}>
              <div className={`${styles.smallBlog} ${styles.pBm}`}>
                <div className={styles.smallBlogTag}>для вас</div>
                <div className={styles.smallBlogText}>
                  <div className={styles.smallBlogText}>
                    Честные и прозрачные показатели по нашей работе и текущей
                    ситуации в кампаниях.
                  </div>
                  <div
                    className={styles.smallBlogText}
                    style={{ marginTop: "30px" }}
                  >
                    Возникает вопрос – можете в любой момент написать менеджеру
                    и получить комментарии по любому из показателей
                  </div>
                </div>
              </div>
              <div
                className={`${styles.smallBlog} ${styles.pT}`}
                style={{
                  paddingBottom: "60px",
                  borderTop: "1.85px solid rgba(255, 255, 255, 0.25)",
                }}
              >
                <div className={styles.smallBlogTag}>для нас</div>
                <div className={styles.smallBlogText}>
                  <div className={styles.smallBlogText}>
                    Обратная связь от клиента и актуальная информация, чтобы
                    быстро видеть отклонения и принимать решения по изменениям
                    кампаний
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.images}>
              <Image
                src="/img/monitor.png"
                alt="Previous"
                width={744}
                height={435}
                className={styles.navButton}
              />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <span className={styles.modalClose} onClick={closeModal}></span>
            <ModalForm onClose={closeModal} />
          </div>
        </div>
      )}
    </>
  );
}
