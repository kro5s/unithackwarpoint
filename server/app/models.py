from tortoise import Model, fields

class Item(Model):
    id = fields.IntField(pk=True)
    name = fields.TextField()
    description = fields.TextField()
    price = fields.IntField()
    image_url = fields.TextField()
    merch_type = fields.TextField()

class Order(Model):
    id = fields.IntField(pk=True)


class Cart(Model):
    id = fields.IntField(pk=True)
    items_ids = fields.JSONField()


class Review(Model):
    id = fields.IntField(pk=True)
    author = fields.TextField()
    description = fields.TextField()
    stars = fields.IntField()
