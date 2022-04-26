from selenium import webdriver
from selenium.webdriver.common.keys import Keys

#define driver
driver = webdriver.Chrome()

#initial address

driver.get("http://10.173.131.12:3000/") #http://10.173.131.12:3000/
elem = driver.find_element_by_id("bar")
elem.click()
elem = driver.find_element_by_id("title")
elem.click()
#find element on page and send keys
elem = driver.find_element_by_id("search")

elem.send_keys("bible")

elem = driver.find_element_by_id("searchbutton")
elem.click()
