from selenium import webdriver
from selenium.webdriver.common.keys import Keys

#define driver
driver = webdriver.Chrome()

#initial address

driver.get("http://localhost:3000/") #http://10.173.131.12:3000/
elem = driver.find_element_by_xpath('//a[@href="'+"/signIn"+'"]')
elem.click()
elem = driver.find_element_by_xpath("//input[@type='username']")
elem.send_keys("test")
elem = driver.find_element_by_xpath("//input[@type='password']")
elem.send_keys("testing")
elem.send_keys(Keys.ENTER);
