from selenium import webdriver
from selenium.webdriver.common.keys import Keys

#define driver
driver = webdriver.Chrome()

#initial address

driver.get("http://localhost:3000/") #http://10.173.131.12:3000/
elem = driver.find_element_by_xpath('//a[@href="'+"/advancedsearch"+'"]')
elem.click()
elem = driver.find_element_by_id("line")
elem.click()
elem = driver.find_element_by_id("title")
elem.click()
driver.find_element_by_id("anyWords").send_keys("bible")
driver.find_element_by_id("exclude").send_keys("John")
driver.find_element_by_id("startYear").send_keys("1500")
driver.find_element_by_id("endYear").send_keys("1700")
driver.find_element_by_xpath('//button[text()="Search"]').click()
