import Head from "next/head";
import styles from "@/styles/Home.module.css";
import TagBlock from "../../components/home/tag/tagBlock";
import TraficBlock from "../../components/home/trafic/traficBlock";
import Partners from "../../components/home/partners/partners";
import { Case } from "../../components/home/case/case";
import { Reviews } from "../../components/home/reviews/reviews";
import SettingBlock from "../../components/home/setting/settingBlock";
import ProducerBlock from "../../components/home/producer/producerBlock";
import Agency from "../../components/home/agency/agency";
import Rule from "../../components/home/rule/rule";
import { Team } from "../../components/home/team/team";
import Footer from "../../components/footer/footer";
import DynamicHeader from "../../components/header/header";

import ZoomFallbackWrapper from "@/components/ZoomFallbackWrapper";

export default function Home() {
  return (
    <>
      <Head>
        <meta name="yandex-verification" content="a88abba2c0cfb9f4" />
        <title>reSearch it</title>
      </Head>

      <ZoomFallbackWrapper>
        <div className={styles.home_section}>
          <DynamicHeader />
          <TagBlock />
          <TraficBlock />
          <Partners />
          <Case />
          <Reviews />
          <SettingBlock />
          <ProducerBlock />
          <Agency />
          <Rule />
          <Team />
          <Footer />
        </div>
      </ZoomFallbackWrapper>
    </>
  );
}
