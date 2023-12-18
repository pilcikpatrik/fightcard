import puppeteer, { Browser, Page } from "puppeteer";
import fs from "fs";

const url = "https://oktagonmma.com/cs/fighters/";

interface Statistic {
  label: string | undefined;
  value: string | undefined;
}

interface Fighter {
  title: string | undefined;
  nickname: string | undefined;
  imgSrc: string | undefined;
  score: string | undefined;
  nationality: string | undefined;
  age: string | undefined;
  height: string | undefined;
  weight: string | undefined;
  background: string | undefined;
  gym: string | undefined;
  stats: Statistic[];
  result: string[] | undefined;
}

interface FighterData {
  [category: string]: Fighter[];
}

const getFighterDetails = async (
  page: Page,
  fighterUrl: string
): Promise<Fighter> => {
  await page.goto(fighterUrl);

  const imgSrc = await page.$eval("figure.fighter-img img", (img) => img.src);
  const nickname = await page.$eval(
    ".fighter-hero-section-wrapper div.fighter-texts h4",
    (el) => el.textContent?.trim()
  );
  const title = await page.$eval(
    ".fighter-hero-section-wrapper div.fighter-texts h1",
    (el) => el.textContent?.trim()
  );
  const score = await page.$eval(
    ".fighter-score h4",
    (el) => el.textContent?.trim()
  );
  const nationality = await page.$eval(
    ".fighter-information-nationality-wrapper .fighter-information-label-big",
    (el) => el.textContent?.trim()
  );
  const stats = await page.$$eval(".fighter-highlights-stat", (elements) =>
    elements.map((el) => ({
      label: el.querySelector(".stat-label-medium")?.textContent?.trim(),
      value: el.querySelector(".stat-label-big")?.textContent?.trim(),
    }))
  );

  // Získání výsledků posledních pěti zápasů
  const result = await page.$$eval(
    ".fight-octagon-wrapper .fight-ocatgon-result",
    (elements) =>
      elements
        .map((el) => el.textContent)
        .filter((text) => text !== undefined) as string[] // Filtrace a Type Assertion
  );

  // Získání SVG path pro ikonu vlajky
  const infoBlocks = await page.$$eval(".fighter-information", (blocks) =>
    blocks.map((block) => block.textContent?.trim())
  );
  const age = infoBlocks
    .find((info) => info?.includes("Věk"))
    ?.split("Věk")[1]
    .trim();
  const height = infoBlocks
    .find((info) => info?.includes("Výška"))
    ?.split("Výška")[1]
    .trim();
  const weight = infoBlocks
    .find((info) => info?.includes("Váha"))
    ?.split("Váha")[1]
    .trim();
  const background = infoBlocks
    .find((info) => info?.includes("Background"))
    ?.split("Background")[1]
    .trim();
  const gym = infoBlocks
    .find((info) => info?.includes("Gym"))
    ?.split("Gym")[1]
    .trim();

  return {
    title,
    nickname,
    imgSrc,
    score,
    nationality,
    age,
    height,
    weight,
    background,
    gym,
    result,
    stats,
  };
};

const main = async () => {
  const browser: Browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);

  const categories = [
    /*     "Heavyweight - 120.2kg/265lbs",
    "Light heavyweight - 93kg/205lbs",
    "Middleweight - 83.9kg/185lbs",
    "Welterweight - 77.1kg/170lbs", */
    // "Lightweight - 70.3kg/155lbs",
    // "Featherweight - 65.8kg/145lbs",
    "Bantamweight - 61.2kg/135lbs",
    "Flyweight - 56.7kg/125lbs",
  ];

  const allFightersData: FighterData = {};

  for (const category of categories) {
    // Vyčištění a zadání hodnoty do input elementu
    await page.click("#weight-class", { clickCount: 3 });
    await page.type("#weight-class", category);

    // Stisknout šipku dolů a Enter pro výběr kategorie
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");

    // Počkat chvíli, aby se seznam načetl
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Počkejte na načtení dat
    await page.waitForSelector(".fighter-wrap", { visible: true });

    let loadMoreVisible =
      (await page.$(".okt-btn-web-outline-yellow")) !== null;
    while (loadMoreVisible) {
      await page.click(".okt-btn-web-outline-yellow");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      loadMoreVisible = (await page.$(".okt-btn-web-outline-yellow")) !== null;
    }

    const fighterUrls: string[] = await page.evaluate(() => {
      return Array.from(document.querySelectorAll(".fighter-wrap a")).map(
        (a) => (a as HTMLAnchorElement).href
      );
    });

    const fightersDetails: Fighter[] = [];
    for (const fighterUrl of fighterUrls) {
      const details = await getFighterDetails(page, fighterUrl);
      fightersDetails.push(details);
      await page.goBack();
    }

    allFightersData[category] = fightersDetails;
  }

  console.log(allFightersData);

  await browser.close();

  fs.writeFile(
    "data-5.json",
    JSON.stringify(allFightersData, null, 2),
    (err) => {
      if (err) throw err;
      console.log("Data úspěšně uložena.");
    }
  );
};

main();
