import React from "react";
import type { ReactNode } from "react";

export type CasePreview = {
  market: string;
  image: string;
  resultText: ReactNode;
  summaryText: ReactNode;
  storyText: ReactNode;
  tellText: ReactNode;
};

export const casePreviews: { [key: number]: CasePreview } = {
  6: {
    market: "Аренда спецтехники",
    image: "/img/yandexDirect.png",
    resultText: (
      <>
        ТОП-3 в Яндексе <br />и снижение цены <br />
        лида в 2,4 раза
      </>
    ),
    summaryText: "за год работы с SEO",
    storyText:
      "Компания по аренде спецтехники обратилась к нам с задачей снизить стоимость лида и повысить рентабельность бизнеса.",
    tellText:
      "За год работы SEO мы помогли клиенту войти в ТОП-3 поисковой выдачи, увеличить прибыль и сократить расходы на привлечение клиентов.",
  },
  7: {
    market: "Интернет-магазин",
    image: "/img/yandexDirect.png",
    resultText: "Как мы обошли маркетплейсы",
    summaryText: "",
    storyText:
      "Интернет-магазин Аэрос — лидер продаж бризеров и рекуператоров в России — столкнулся с падением органического трафика из-за конкуренции с маркетплейсами.",
    tellText:
      "Мы помогли компании вернуть позиции в ТОП-3, увеличить органический трафик и лиды благодаря SEO-стратегии и расширению ассортимента.",
  },
  8: {
    market: "Музыкальные школы",
    image: "/img/yandexDirect.png",
    resultText: "Как мы вернули клиентов",
    summaryText: "",
    storyText:
      "Сеть музыкальных школ в Новосибирске, Красноярске, Екатеринбурге и Краснодаре столкнулась с падением позиций в поиске из-за роста конкуренции.",
    tellText:
      "Мы разработали и внедрили SEO-стратегию, которая позволила вернуть сайт в ТОП-3 и восстановить ключевой источник клиентов.",
  },
};
