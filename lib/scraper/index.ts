import { Browser } from "puppeteer";
const puppeteer = require("puppeteer");
const fs = require("fs");

const url = "https://oktagonmma.com/cs/fighters/";

const main = async () => {
  const browser: Browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);

  const fighterData = await page.evaluate((url) => {
    const fighterWraps = Array.from(document.querySelectorAll(".fighter-wrap"));
    const data = fighterWraps.map((fighter: any) => ({
      title: fighter.querySelector(".fighter-big-name")?.textContent.trim(),
      score: fighter.querySelector(".fighter-score-label")?.textContent.trim(),
      imgSrc: url + fighter.querySelector("img").getAttribute("src"),
    }));

    return data;
  }, url);

  console.log(fighterData);

  await browser.close();

  fs.writeFile("data.json", JSON.stringify(fighterData), (err: any) => {
    if (err) throw err;
    console.log("succes");
  });
};

main();
