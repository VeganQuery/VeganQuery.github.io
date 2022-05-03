from bs4 import BeautifulSoup as bs
import requests
import time
import json

recp_datas = set()
web_adress = 'https://recipeforvegans.com/recipe/category' 

r1 = requests.get(web_adress)
soup1 = bs(r1.content)

cat = soup1.find("section", attrs={"id": "categories-6"})

cat_a_tags = cat.find_all("a")

catLS = []

for e in cat_a_tags:
    catLS.append(e.get('href'))


def get_recp_data(web_adress):

    while True:

        # get web page & parse
        r = requests.get(web_adress)
        soup = bs(r.content)

        # get recipes in articles tag
        articles = soup.find_all("article", attrs={"class": "post"})

        # loop through articles
        for(i, article) in enumerate(articles):

            data = {
                'title': article.h2.a.text,
                'img': article.img['src'],
                'href': article.h2.a['href'],
            }
            # add recipes to list
            recp_datas.add(json.dumps(data))

        # get next page
        time.sleep(2)
        nxt_pg = soup.find("div", attrs={"class": "dj-older"})

        # if no next page, end loop
        if nxt_pg.a == None:
            break
        else:
            # assign next page url to web_adress
            web_adress = nxt_pg.a['href']

for l in catLS:
    get_recp_data(l)

datas = []

# size = len(recp_datas)
for e in recp_datas:
    datas.append(json.loads(e))

print(datas)
