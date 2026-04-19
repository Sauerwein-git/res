import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Footer from "../../../components/footer/footer";
import DynamicHeader from "../../../components/header/header";
import TagBlock from "../../../components/seo/tagBlock/tagBlock";
import { Benefit } from "../../../components/seo/benefit/benefit";
import { Case } from "../../../components/seo/case/case";

import { Reviews } from "../../../components/context/reviews/reviews";
import { Rules } from "../../../components/seo/rule/rules";
import Bisn from "../../../components/seo/bisn/bisn";
import Effect from "../../../components/seo/effect/effect";
import Setting from "../../../components/seo/setting/setting";
import Reccomend from "../../../components/seo/reccomend/reccomend";
import Nose from "../../../components/seo/nose/nose";
import ProducerBlock from "../../../components/home/producer/producerBlock";
import Agency from "../../../components/home/agency/agency";
import Rule from "../../../components/home/rule/rule";
import { Team } from "../../../components/home/team/team";
import Certificate from "../../../components/context/certificate/certificate";
import Free from "../../../components/seo/free/free";
import Answers from "../../../components/seo/answers/answers";
import Else from "../../../components/context/else/else";
import TraficBlock from "../../../components/home/trafic/traficBlock";
import ZoomFallbackWrapper from "@/components/ZoomFallbackWrapper";

export default function Seo() {
  return (
    <>
      <Head>
        <meta name="yandex-verification" content="a88abba2c0cfb9f4" />
        <title>SEO</title>
      </Head>
      <ZoomFallbackWrapper>
        <div className={styles.home_section}>
          <DynamicHeader />
          <TagBlock />
          <Benefit />
          <Rules />
          <Case />
          <Reviews />
          <Bisn />
          <Effect />
          <Setting />
          <Reccomend />
          <Nose />
          <ProducerBlock />
          <Agency />
          <Rule />
          <Team />
          <Free />
          <Answers />
          <Else />
          <TraficBlock />
          <Footer />
        </div>
      </ZoomFallbackWrapper>
    </>
  );
}
