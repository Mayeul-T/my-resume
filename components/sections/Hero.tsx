import { getTranslations } from "next-intl/server";
import { Hero as HeroData } from "@/lib/schemas/resume";
import { HeroClient } from "./HeroClient";

interface HeroProps {
  data: HeroData;
}

export async function Hero({ data }: HeroProps) {
  const t = await getTranslations("hero");

  return <HeroClient data={data} downloadCvLabel={t("downloadCv")} />;
}
