// @ts-check
import Puppeteer from 'puppeteer'

// Config 
const ID = "CR-0208"

let date = new Date(),
    today = date.getDate(),
    month = date.getMonth() + 1,
    year = date.getFullYear()

const url = "https://docs.google.com/forms/d/e/1FAIpQLSe6ECuOziPYHtWjdvEmRV3TT8_9SsmGRsUERYzES98TNsIEdg/viewform?usp=pp_url"
let prams = {
    // First Page
    "entry.179389563": "نعم",
    "entry.1987851700": "نعم+لقد+قمت+مسبقا+بالتسجيل+وامتلك+كود+تعريف+شخصي",
    // Second Page
    "entry.2022830709": ID,
    // Date
    "entry.1350812610_year": year,
    "entry.1087540743_year": year,
    "entry.1350812610_month": month,
    "entry.1087540743_month": month,
    "entry.1350812610_day": today,
    "entry.1087540743_day": today,
    // Time
    "entry.1935429628_hour": "08",
    "entry.1935429628_minute": "00",
    "entry.203066592_hour": "18",
    "entry.203066592_minute": "00",
    "entry.1957251711": "Study"
}


const options = { headless: false } as Puppeteer.LaunchOptions

    ; (async () => {
        const browser = await Puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(theurl(url, prams), { waitUntil: 'networkidle2' })

        let nextButton =
            (await page.$x('//span[contains(text(),"التالي")]'))[0] ?? (await page.$x('//span[contains(text(),"Next")]'))[0]

        try {
            await nextButton.click()
        } catch (error) {
            console.log(error)
        }
        await page.waitForNetworkIdle()


        const finishButton =
            (await page.$x('//span[contains(text(),"إرسال")]'))[0] ?? (await page.$x('//span[contains(text(),"Submit")]'))[0]
        try {
            await finishButton.click()
            console.log("click on next button")
        } catch (error) {
            console.log(error)
        }

        await page.waitForNetworkIdle()

        try {
            await page.screenshot({ path: `screenshot.jpeg`, fullPage: true })
        } catch (err) {
            console.log(`❌ Error: ${err}`)
        } finally {
            await browser.close()
            console.log(`\n🎉 Proof Captured.`)
        }
        await console.log("Done Sending The Request")
    })()


function theurl(url: string, prams: object) {
    let generatedURL = url
    for (let key in prams) {
        let pram = Object.values(prams)[Object.keys(prams).indexOf(key)]
        generatedURL += "&" + key + "=" + pram
    }

    return generatedURL
}

