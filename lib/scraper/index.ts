import puppeteer, { Browser } from "puppeteer";
import fs from "fs";

const url = "https://oktagonmma.com/cs/fighters/";

interface Fighter {
  title: string;
  score: string;
  imgSrc: string;
}

interface FighterData {
  [category: string]: Fighter[];
}

const main = async () => {
  const browser: Browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);

  const categories = [
    "Heavyweight - 120.2kg/265lbs",
    "Light heavyweight - 93kg/205lbs",
    "Middleweight - 83.9kg/185lbs",
  ];

  const allFightersData: FighterData = {};

  for (const category of categories) {
    // Vyčištění a zadání hodnoty do input elementu
    await page.click("#weight-class", { clickCount: 3 });
    await page.type("#weight-class", category);

    // Stisknout Enter pro potvrzení výběru
    await page.keyboard.press("Enter");

    // Počkejte na načtení dat
    await page.waitForSelector(".fighter-wrap", { visible: true });

    const fighterData: Fighter[] = await page.evaluate(() => {
      const fighterWraps = Array.from(
        document.querySelectorAll(".fighter-wrap")
      );
      return fighterWraps.map((fighter) => ({
        title:
          fighter?.querySelector(".fighter-big-name")?.textContent?.trim() ||
          "",
        score:
          fighter?.querySelector(".fighter-score-label")?.textContent?.trim() ||
          "",
        imgSrc: fighter?.querySelector("img")?.src || "",
      }));
    });

    allFightersData[category] = fighterData;
  }

  console.log(allFightersData);

  await browser.close();

  fs.writeFile(
    "fightersData.json",
    JSON.stringify(allFightersData, null, 2),
    (err) => {
      if (err) throw err;
      console.log("Data úspěšně uložena.");
    }
  );
};

main();
