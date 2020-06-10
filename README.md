# OpenFlavour Scrapers
Scrapers for flavors vendors

# API Server
You can find API Server here https://github.com/gbaranski/OpenFlavour-API

# Guide
```
git clone https://github.com/gbaranski/OpenFlavour-Scraper.git
cd OpenFlavour-Scraper
npm install
```
Now You need to start MongoDB service and run API Server, more info on OpenFlavor-API Readme

When You're done with previous step, run
```
npm start
```
Then You should see 'Begin scraping', wait a while and it will print on console big JSON output, now it says that scraped data properly, now it will send it to API Server, after thats done, program will exit and print 'Done', now You can see new data appeared on database.
