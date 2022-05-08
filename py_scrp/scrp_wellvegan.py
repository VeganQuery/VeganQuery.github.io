from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
import time
import json

#driver setup
PATH = "/Users/LWR/dev/chromedriver"
driver = webdriver.Chrome(PATH)

# get web page
driver.get("https://wellvegan.com/recipes")

recp_datas = set()

# get all URL of for recipe Categories "by meal of the day" ex: breakfast, lunch, dinner, etc.
search = driver.find_elements_by_class_name("more-from-category")

# add all URL to list
catLS = []
for i in range(len(search)):
    catLS.append(search[i].find_element_by_tag_name("a").get_attribute("href"))


def get_recp_data(web_adress):

    while True:

        # get web page & parse
        driver.get(web_adress)

        

       

        # get recipes in articles tag
        articles = driver.find_element_by_tag_name("main").find_elements_by_tag_name("article")
        # time.sleep(2)

        # loop through articles
        for i in range(len(articles)):

            data = {}

            # print("\n----------\n",articles[i].page_source,"\n----------\n")

            img = articles[i].find_element_by_class_name("entry-image-link").find_element_by_tag_name("img").get_attribute("src")
            if(img != None):

                # print("\n**********", "HERE1", "**********\n")
                data = {
                'title': articles[i].find_element_by_class_name("entry-title").find_element_by_tag_name("a").text.lower(),
                'img': img,
                'href': articles[i].find_element_by_tag_name("a").get_attribute("href")
                }

            elif articles[i].find_element_by_class_name("entry-image-link").find_element_by_tag_name("img").get_attribute("data-lazy-src") != None:
                # print("\n**********", "HERE2", "**********\n")
                data = {
                    'title': articles[i].find_element_by_class_name("entry-title").find_element_by_tag_name("a").text.lower(),
                    'img': articles[i].find_element_by_class_name("entry-image-link").find_element_by_tag_name("img").get_attribute("data-lazy-src"),
                    'href': articles[i].find_element_by_tag_name("a").get_attribute("href")
                }

            else:

                print("\n---******--\n",articles[i].find_element_by_class_name("entry-title").find_element_by_tag_name("a").text.lower(),"\n---******--\n")

                html = driver.page_source
                time.sleep(2)
                print(html)

                el = WebDriverWait(driver, timeout=10).until(lambda d: d.find_element_by_tag_name("main").find_elements_by_tag_name("article")[i].find_element_by_class_name("entry-image-link").find_element_by_tag_name("img").get_attribute("src"))
                # print("\n-------------\n","\nERROR: no image found:\n", web_adress, articles[i].find_element_by_class_name("entry-title").find_element_by_tag_name("a").text.lower(), "\n-------------\n")
                print("\n-------------\n","\nERROR: no image found:\n", web_adress, articles[i].find_element_by_class_name("entry-title").find_element_by_tag_name("a").text.lower(),"\n---******--\n", articles[i].find_element_by_class_name("entry-image-link").find_element_by_tag_name("img"), "\n-------------\n")
            

            # data = {
            #     'title': articles[i].find_element_by_class_name("entry-title").find_element_by_tag_name("a").text.lower(),
            #     'img': articles[i].find_element_by_class_name("entry-image-link").find_element_by_tag_name("img").get_attribute("src"),
                
                    
            #     'img': articles[i].find_element_by_tag_name("picture").find_element_by_tag_name("img").get_attribute("src"),
            #     'href': articles[i].find_element_by_tag_name("a").get_attribute("href"),
            # }
            # add recipes to list

            recp_datas.add(json.dumps(data))

        # get next page
        
      
        nxt_pg = driver.find_element_by_tag_name("main").find_elements_by_tag_name("div")
        # nxt_pg = driver.find_element_by_class_name("pagination").find_elements_by_tag_name("li")
        text = nxt_pg[len(nxt_pg)-1].text
        end_of_text = text[len(text)-11:len(text)]

        # if no next page, end loop
        if end_of_text != "NEXT PAGE »":
            break
        else:
            # assign next page url to web_adress
            # pagination-next
            web_adress = driver.find_element_by_class_name("pagination-next").find_element_by_tag_name("a").get_attribute("href")

for l in catLS:
    print("\n---------",l,"---------\n")
    get_recp_data(l)

datas = []

# size = len(recp_datas)
for e in recp_datas:
    datas.append(json.loads(e))

print(datas)


driver.quit()
