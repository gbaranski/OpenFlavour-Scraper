# OpenFlavour Scrapers
Currently supported flavours vendors:
- TPA
- Capella
- Inawera
- FlavourArt

# API Server
You can find API Server here https://github.com/gbaranski/OpenFlavour-API

# Guide
```
git clone https://github.com/gbaranski/OpenFlavour-Scraper.git
cd OpenFlavour-Scraper
npm install
```
Start MongoDB service and run API Server, more info on OpenFlavor-API Readme

When it's done with previous step, run
```
npm start
```
Then it should print 'Begin scraping', wait a while and it will print on console big JSON output, now it says that scraped data properly, now it will send it to API Server, after thats done, program will exit and print 'Done'.
Check the database for scraped data.
