from tortoise import Model, fields

class Type(Model):
    name = fields.TextField(pk=True)

class Item(Model):
    id = fields.IntField(pk=True)
    name = fields.TextField()
    description = fields.TextField()
    price = fields.IntField()
    image_url = fields.TextField()
    type = fields.ForeignKeyField("models.Type")

class Order(Model):
    id = fields.IntField(pk=True)

