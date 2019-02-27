
/*

var capabilities = {
'project': 'TOC',
'os_version' : '11',
'device' : 'iPad Mini 4',
'real_mobile' : 'true',
'browserstack.local' : 'false',
'browserstack.user' : 'rickmercer1',
'browserstack.key' : 'AYccZgvpu4aJjcNzYkAe'
}

var capabilities = {
 'project': 'TOC',
 'browserName' : 'iPhone',
 'device' : 'iPhone 8 Plus',
 'realMobile' : 'true',
 'os_version' : '11',
 'browserstack.user' : 'rickmercer1',
 'browserstack.key' : 'AYccZgvpu4aJjcNzYkAe'
};

*/

var webdriver = require('selenium-webdriver');

var capabilities = {
  'project': 'TOC',
  'browserName' : 'safari',
  'os_version' : '11',
  'device' : 'iPad Mini 4',
  'real_mobile' : 'true',
  'browserstack.local' : 'false',
  'browserstack.user' : 'rickmercer1',
  'browserstack.key' : 'AYccZgvpu4aJjcNzYkAe'
};

var driver = new webdriver.Builder().
  usingServer('http://hub-cloud.browserstack.com/wd/hub').
  withCapabilities(capabilities).
  build();

driver.get('https://www.christmind.info');
driver.findElement(webdriver.By.id('get-acquainted')).click().then(function() {
  driver.getTitle().then(function() {
    console.log(title);
  })
});

driver.quit();

