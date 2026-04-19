"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./blogPage.module.css";

const socialIcons = [
  { src: "/img/hatter.png", alt: "Research It" },
  { src: "/img/flash.png", alt: "Flash" },
  { src: "/img/target.png", alt: "Target" },
];

const topicCards = [
  {
    title: "SEO",
  },
  {
    title: "GEO – продвижение\nв нейросетях",
  },
  {
    title: "Яндекс Директ",
  },
  {
    title: "Конверсия сайтов",
  },
  {
    title: "Авито",
  },
  {
    title: "SMM",
  },
];

const articleCards = [
  {
    label: "Яндекс Директ",
    title: "+43 000 000 ₽\nза 4 месяца с\nпомощью контекста",
    excerpt:
      "Увеличили прибыль клиента на 30%, а выручку до 53 000 000 ₽ за 4 месяца. Рассказываем, как мы это сделали с помощью оптимизации рекламы и глубокой аналитики.",
    authorName: "Команда RE SEARCH IT",
    authorRole: "performance-маркетинг",
    authorImage: null,
    featured: false,
  },
  {
    label: "GEO",
    title: "Как получать\nтрафик из\nнейросетей",
    excerpt:
      "Разбираем, как компании попадать в рекомендации ChatGPT, Perplexity и других AI-инструментов и превращать это в новые обращения.",
    authorName: "Анна Кузнецова",
    authorRole: "стратег по GEO",
    authorImage: "/img/An.png",
    featured: true,
  },
  {
    label: "Яндекс Директ",
    title: "+43 000 000 ₽\nза 4 месяца с\nпомощью контекста",
    excerpt:
      "Показываем, как связка медиаплана, глубокой аналитики и точечной оптимизации помогла кратно вырасти в эффективности рекламы.",
    authorName: "Команда RE SEARCH IT",
    authorRole: "performance-маркетинг",
    authorImage: null,
    featured: false,
  },
];

function ArticleCard({
  label,
  title,
  excerpt,
  authorName,
  authorRole,
  authorImage,
  featured,
}: (typeof articleCards)[number]) {
  return (
    <article className={styles.articleCard}>
      <div className={styles.articleLabel}>{label}</div>
      <h3 className={styles.articleTitle}>
        {title.split("\n").map((line) => (
          <span key={line}>
            {line}
            <br />
          </span>
        ))}
      </h3>

      <p className={styles.articleExcerpt}>{excerpt}</p>

      {featured ? (
        <div className={styles.authorBlock}>
          <div className={styles.authorAvatar}>
            <Image
              src={authorImage ?? "/img/Anna.png"}
              alt={authorName}
              width={78}
              height={78}
            />
          </div>
          <div className={styles.authorCaption}>
            {authorName}, {authorRole}
          </div>
        </div>
      ) : (
        <div className={styles.articleSpacer} />
      )}

      <button
        type="button"
        className={styles.readButton}
        aria-label="Читать полностью"
      >
        <Image
          src="/img/ButtonBlogs.svg"
          alt=""
          aria-hidden="true"
          width={429}
          height={90}
          className={styles.readButtonGraphic}
        />
      </button>
    </article>
  );
}

export default function BlogPage() {
  const router = useRouter();
  const [activeTopic, setActiveTopic] = useState(topicCards[1]?.title ?? "");

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroBrand}>RE SEARCH IT</div>
          <div className={styles.heroDivider} />

          <div className={styles.heroBottom}>
            <div className={styles.heroLeftColumn}>
              <button
                type="button"
                className={styles.backButton}
                onClick={() => router.back()}
              >
                [ ← ] Назад
              </button>

              <div className={styles.socials} aria-label="Социальные сети">
                {socialIcons.map((icon) => (
                  <div key={icon.src} className={styles.socialIcon}>
                    <Image
                      src={icon.src}
                      alt={icon.alt}
                      width={42}
                      height={42}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.heroInfo}>
              <div className={styles.heroInfoLine} />
              <div className={styles.heroInfoText}>
                <h1 className={styles.heroTitle}>
                  Блог
                  <br />
                  <span> полезные статьи</span>
                </h1>
                <p className={styles.heroSubtitle}>
                  Пишем для вас про маркетинг и бизнес
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className={styles.topicsSection}>
        <div className={styles.contentInner}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Выберите тему статьи</h2>
            <div className={styles.topicGrid}>
              {topicCards.map((topic) => (
                <button
                  key={topic.title}
                  type="button"
                  className={`${styles.topicCard} ${
                    activeTopic === topic.title ? styles.topicCardActive : ""
                  }`}
                  onClick={() => setActiveTopic(topic.title)}
                >
                  <div className={styles.topicTitle}>
                    {topic.title.split("\n").map((line) => (
                      <span key={line}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.contentInner}>
          <div className={styles.articleGrid}>
            {articleCards.map((card, index) => (
              <ArticleCard key={`${card.label}-${index}`} {...card} />
            ))}
          </div>

          <div className={styles.contactStrip}>
            <div>
              <h3 className={styles.contactTitle}>Пообщаемся?</h3>
              <p className={styles.contactText}>
                Познакомимся, покажем анализ вашего рынка, оценим текущую
                ситуацию и расскажем, чем можем быть вам полезны.
              </p>
            </div>

            <div className={styles.contactLinks}>
              <span>Напишите нам:</span>
              <Link href="https://web.telegram.org/" target="_blank">
                TG
              </Link>
              <Link href="https://www.whatsapp.com/?lang=ru_RU" target="_blank">
                WA
              </Link>
            </div>
          </div>

          <div className={styles.articleGrid}>
            {articleCards.map((card, index) => (
              <ArticleCard key={`${card.label}-repeat-${index}`} {...card} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
