import scrapy


class SpiderSpider(scrapy.Spider):
    name = 'spider'
    allowed_domains = ['dl.acm.org/conferences/upcoming?startPage=0&pageSize=10']
    start_urls = ['https://dl.acm.org/conferences/upcoming?startPage=0&pageSize=10'] 

    def parse(self, response):
        #print(response.status)
        rows = response.xpath('//li[contains(@class,"search__item card--shadow search__item--event")]/div')
        
        for row in rows:
            title=row.xpath('./div[contains(@class,"col-md-5")]/div/div[contains(@class,"right--block")]/a/span/text()').extract_first()
            info=row.xpath('./div[contains(@class,"col-md-7")]/div[contains(@class,"event__content")]')
            temp_date=info.xpath('./div[contains(@class,"info calender")]/span/text()').extract_first().split()
            date=""
            for i in temp_date:
                date+=i+" "
            location=info.xpath('./div[contains(@class,"info map")]/a/span')
            temp_loc=location[0].xpath('text()').extract_first().split()
            temp_loc.extend(location[1].xpath('text()').extract_first().split())
            temp_loc.extend(location[2].xpath('text()').extract_first().split())
            loc=""
            for i in temp_loc:
                loc+=i+" "
            map=info.xpath('./div[contains(@class,"info map")]/a/@href').extract_first()
            website=info.xpath('./div[contains(@class,"info website")]/a/@href').extract_first()
            yield{
                'title':title,
                'date': date,
                'location':loc,
                'map_url':map,
                'conf_webiste':website,
            }
    
        next_page = response.xpath('//a[contains(@class,"pagination__btn--next")]/@href').get()

        if next_page:
            next_page = response.urljoin(next_page)
            yield scrapy.Request(url=next_page, callback=self.parse, dont_filter=True)
        
            

    

        