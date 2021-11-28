import scrapy
from scrapy.crawler import CrawlerProcess

from scrapy.utils.project import get_project_settings
from scrapy.http import Request
from crawling.items import Conference

class SpiderSpider(scrapy.Spider):
    name = 'spider'
    allowed_domains = ['resurchify.com/e/symposium/all-categories/all-countries/all-years/page/2/']
    start_urls = ['https://www.resurchify.com/e/symposium/all-categories/all-countries/all-years/page/2/']

    def parse(self, response):
        
        

        xpath_string = "/html/body/div[3]/div[2]/div[2]/main/div/div[4]/table/tr[1]/td/div[2]/a/h4/b/text()"
        xpath_place = "/html/body/div[3]/div[2]/div[2]/main/div/div[4]/table/tr[1]/td/div[2]/span/b/text()"
        xpath_date = "/html/body/div[3]/div[2]/div[2]/main/div/div[4]/table/tr[2]/td/b[1]/text()"
        dates = response.xpath(xpath_date).extract_first()
        data = response.xpath(xpath_string).extract_first()
        place = response.xpath(xpath_string).extract_first()
        i=5
        while(data):
            
            xpath_string = "/html/body/div[3]/div[2]/div[2]/main/div/div["+str(i)+"]/table/tr[1]/td/div[2]/a/h4/b/text()"
            xpath_date = "/html/body/div[3]/div[2]/div[2]/main/div/div["+str(i)+"]/table/tr[2]/td/b[1]/text()"
            xpath_place = "/html/body/div[3]/div[2]/div[2]/main/div/div["+str(i)+"]/table/tr[1]/td/div[2]/span/b/text()"
            data = response.xpath(xpath_string).extract_first()
            dates = response.xpath(xpath_date).extract_first()
            place = response.xpath(xpath_place).extract_first()
            item = Conference()
            item['date'] = dates
            item['title'] = data
            item['location'] = place
            
            print("title " + str(data))
            print("date " + str(dates))
            print("Place: "+str(place))
            print(data + " "+ dates+" "+place)

            yield item
            i=i+1
        

        next_page = response.xpath("/html/body/div[3]/div[2]/div[2]/main/div/div[33]/div[1]/a[2]/@href").extract_first()
        print(next_page)

        if(next_page):
            yield scrapy.Request(url=next_page,callback=self.parse,dont_filter=True)




if __name__ == "__main__":
    
  process = CrawlerProcess(get_project_settings())
  process.crawl(SpiderSpider)
  process.start()