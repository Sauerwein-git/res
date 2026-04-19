import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Footer from "../../../components/footer/footer";
import DynamicHeader from "../../../components/header/header";
import ZoomFallbackWrapper from "@/components/ZoomFallbackWrapper";
import Agreement from "../../../components/politic/tagBlock/agreement";

export default function AgreementPage() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Пользовательское соглашение</title>
      </Head>
      <ZoomFallbackWrapper>
        <div className={styles.home_section}>
          <DynamicHeader />
          <Agreement />
          <Footer />
        </div>
      </ZoomFallbackWrapper>
    </>
  );
}
