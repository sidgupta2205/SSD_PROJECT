import scrapy
from crawling.items import Conference

class SpiderSpider(scrapy.Spider):
    name = 'spider'
    allowed_domains = ['resurchify.com/conference-ranking']
    start_urls = ['http://resurchify.com/conference-ranking']

    def parse(self, response):
        names = response.xpath("//tr[contains(@class,'w3-hover-sand')]")

        for name in names:
            item = Conference()
            confs_data = name.xpath("./td")
            title = confs_data[0].xpath("./span/a/b/i/text()").extract_first()
            rank =  confs_data[2].xpath("./span/b/text()").extract_first()
            item['title'] = title
            item['rank'] = rank

            print(title+" "+rank)
            yield item
            