from selenium import webdriver
from selenium.webdriver.common.keys import Keys

#define driver
driver = webdriver.Chrome()

#initial address

driver.get("http://localhost:3000/")

#find element on page and send keys
elem = driver.find_element_by_id("search")

elem.send_keys("bible")

elem = driver.find_element_by_id("searchbutton")
elem.click()
