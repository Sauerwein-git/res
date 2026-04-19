import Head from "next/head";
import styles from "@/styles/Home.module.css";
import ZoomFallbackWrapper from "@/components/ZoomFallbackWrapper";
import DynamicHeader from "../../../components/header/header";
import Footer from "../../../components/footer/footer";
import BlogPage from "../../../components/blog/blogPage";

export default function Blog() {
  return (
    <>
      <Head>
        <meta name="yandex-verification" content="a88abba2c0cfb9f4" />
        <title>Блог | RE SEARCH IT</title>
      </Head>

      <ZoomFallbackWrapper>
        <div className={styles.home_section}>
          <DynamicHeader />
          <BlogPage />
          <Footer />
        </div>
      </ZoomFallbackWrapper>
    </>
  );
}
