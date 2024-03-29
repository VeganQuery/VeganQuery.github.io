# Vegan Query
## A Vegan Recipe Search Engine

This app has scraped data form the web with PY (Python) to provide a data set of vegan recipes. This web app is made with React.js & provides a vegan recipe search engin. The site is build with the MERN stack pluss PY (Python). I built the wire frames using [Figma.com](https://www.figma.com/file/zqA6nNoXnQQhxqIRP4SwAn/Vegan?node-id=3%3A3), I hope you like my web app!

<!-- [VeganQuery.com](http://veganquery.github.io) -->


## Tech Used
***MERN Stack + Go***


- JavaScript
    - Node.js
    - React.js
        - React HashRouter
    - DOM
    - Local Storage
- Python
    - BeautifulSoup 4
    - Selenium 
        - Chrome Webdriver
- Go (Golang) ***Older vertion used Go for Scraping "Now Using Python"***
    - Go Testing
    - Go Benchmarking
    - Go Web Scraping
- HTML/CSS
- Bootstraps **V5.1**
    - Bootstrap CSS/JS
    - Bootstrap iCons
- [Figma](https://www.figma.com/file/zqA6nNoXnQQhxqIRP4SwAn/Vegan?node-id=3%3A3)
- Google Fonts
    - Google Font, "Risque"
- [GitHub Pages](http://veganquery.github.io)


## Setup, Install & Run

### Install
***Note: make sure to change the files to reflect your GitHub info:*** [Learn How](https://blog.usejournal.com/how-to-deploy-your-react-app-into-github-pages-b2c96292b18e)

```
git clone https://github.com/LWRGitHub/vegan.git
cd vegan
yarn install
```

**(Not Necessary) Run the Go Web Scraper:** 
***Older vertion used Go for Scraping "Now Using Python"***

```
cd go
go run scrape.go
```

**(Not Necessary) Run the Python Web Scraper:** 

```
cd py_scrp
python3 NAME_OF_FILE.py 
```
***Note you will need to have chromedriver for scrapers using selenium, see video for more details on how to:*** [video](https://www.youtube.com/watch?v=Xjv1sY630Uc)
***[Selenium Webdriver](https://www.selenium.dev/documentation/webdriver/getting_started/install_drivers/)

### Run
***@ localhost:3000***

```
yarn start
```

### Build/Push
***When using GitHub Pages do a build before pushing***

```
npm run deploy
git add -A
git commit -m "Some New Code"
git push
```


## IMG

***Home***

<img alt="Screenshot of the home page. The image a search aria and a copy right at the bottom." src="https://raw.githubusercontent.com/VeganQuery/VeganQuery.github.io/main/public/img/vegan-home.png" />


***Search***

<img alt="Screenshot of the search results when searching for a vegan recipe on the website." src="https://raw.githubusercontent.com/VeganQuery/VeganQuery.github.io/main/public/img/vegan-search-res.png" />


***Search Footer***

<img alt="Screenshot of the footer of the search results, shows of the page navigation." src="https://raw.githubusercontent.com/VeganQuery/VeganQuery.github.io/main/public/img/vegan-footer.png" />
