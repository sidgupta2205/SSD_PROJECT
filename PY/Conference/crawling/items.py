import scrapy

class Conference(scrapy.Item):
    date = scrapy.Field()
    location = scrapy.Field()
    title = scrapy.Field()
    url = scrapy.Field()
    rank = scrapy.Field()
