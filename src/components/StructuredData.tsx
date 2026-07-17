import Head from "next/head";
import { useRouter } from "next/router";

const siteUrl = "https://research-it.ru";
const siteName = "Research IT";
const alternateName = "RE SEARCH IT";
const description =
  "Маркетинговое агентство полного цикла: контекстная реклама, SEO-продвижение, разработка сайтов и рост продаж бизнеса.";
const ogImage = `${siteUrl}/og-image.png`;

const normalizePath = (path: string) => {
  const cleanPath = path.split("#")[0].split("?")[0];

  if (!cleanPath || cleanPath === "/") {
    return "/";
  }

  return cleanPath.endsWith("/") ? cleanPath : `${cleanPath}/`;
};

export default function StructuredData() {
  const router = useRouter();
  const path = normalizePath(router.asPath);
  const pageUrl = `${siteUrl}${path}`;
  const title = path === "/" ? siteName : `${siteName} | ${alternateName}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${siteUrl}/#organization`,
        name: siteName,
        alternateName,
        url: siteUrl,
        logo: `${siteUrl}/favicon.svg`,
        image: ogImage,
        email: "hello@research-it.ru",
        telephone: "+79999999999",
        description,
        areaServed: {
          "@type": "Country",
          name: "Russia",
        },
        serviceType: [
          "Контекстная реклама",
          "SEO-продвижение",
          "Разработка сайтов",
          "Повышение конверсии сайта",
          "Аудит рекламы",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        alternateName,
        description,
        inLanguage: "ru-RU",
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        inLanguage: "ru-RU",
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        about: {
          "@id": `${siteUrl}/#organization`,
        },
      },
    ],
  };

  return (
    <Head>
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={siteName} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  );
}
