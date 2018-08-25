const puppeteer = require("puppeteer");
// const sessionFactory = require("./factories/sessionFactory");
// const userFactory = require("./factories/userFactory");
const Page = require("./helpers/page");

// let browser, page;
let page;

beforeEach(async () => {
  // browser = await puppeteer.launch({ headless: false });
  // page = await browser.newPage();
  // await page.goto("localhost:3000");

  page = await Page.build();
  await page.goto("localhost:3000");
});

afterEach(async () => {
  // await browser.close();
  await page.close();
});

test("The header has the correct logo text", async () => {
  // const text = await page.$eval("a.brand-logo", el => el.innerHTML);
  const text = await page.getContentsOf("a.brand-logo");
  expect(text).toEqual("Money Matters");
});

test("When not signed in, shows the correct Landing page", async () => {
  // const text = await page.$eval("a.brand-logo", el => el.innerHTML);
  const text = await page.$eval("h1", el => el.innerHTML);
  expect(text).toEqual("Landing");
});

test("clicking login starts oauth flow", async () => {
  await page.waitFor('a[href="/auth/google"]');
  const text = await page.$eval('a[href="/auth/google"]', el => el.innerHTML);
  expect(text).toEqual("Login With Google");

  await page.click(".right a");
  const url = await page.url();
  expect(url).toMatch(/accounts\.google\.com/);
});

test("When signed in, shows logout button", async () => {
  // const user = await userFactory();
  // const id = "5ac403fe271c83dc1d46d416";
  //
  // const { session, sig } = sessionFactory(user);
  //
  // await page.setCookie({ name: "session", value: session });
  // await page.setCookie({ name: "session.sig", value: sig });
  // await page.goto("localhost:3000");
  //
  // await page.waitFor('a[href="/api/logout"]');
  await page.login();
  const text = await page.$eval('a[href="/api/logout"]', el => el.innerHTML);
  expect(text).toEqual("Logout");
});
