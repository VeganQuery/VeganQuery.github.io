from selenium import webdriver
import time
import json

#driver setup
PATH = "/Users/LWR/dev/chromedriver"
driver = webdriver.Chrome(PATH)

# get web page
driver.get("https://veganuary.com/en-us/recipes/")

recp_datas = set()

# get all URL of for recipe Categories "by meal of the day" ex: breakfast, lunch, dinner, etc.
search = driver.find_elements_by_class_name("term-list__link")

# add all URL to list
catLS = []
for i in range(len(search)):
    catLS.append(search[i].get_attribute("href"))


def get_recp_data(web_adress):

    while True:

        # get web page & parse
        driver.get(web_adress)

        # get recipes in articles tag
        articles = driver.find_elements_by_class_name("card__link")

        # loop through articles
        for i in range(len(articles)):

            data = {
                'title': articles[i].find_element_by_class_name("card__title").text.lower(),
                'img': articles[i].find_element_by_tag_name("img").get_attribute("src"),
                'href': articles[i].get_attribute("href"),
            }
            # add recipes to list
            recp_datas.add(json.dumps(data))

        # get next page
        time.sleep(2)
        # pagination__next
        nxt_pg = driver.find_element_by_class_name("pagination__next")

        # if no next page, end loop
        if nxt_pg.text == "":
            break
        else:
            # assign next page url to web_adress
            web_adress = nxt_pg.find_element_by_tag_name("a").get_attribute("href")

for l in catLS:
    get_recp_data(l)

datas = []

# size = len(recp_datas)
for e in recp_datas:
    datas.append(json.loads(e))

print(datas)


driver.quit()
