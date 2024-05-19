from tortoise import Model, fields

class Product(Model):
    id = fields.IntField(pk=True)
    name = fields.TextField()
    price = fields.IntField()
    img = fields.TextField()
    category = fields.TextField()
    content = fields.TextField()


class Order(Model):
    id = fields.IntField(pk=True)


class CartItem(Model):
    id = fields.IntField(pk=True, index=True)
    cart_id = fields.IntField()
    product_id = fields.IntField()
    quantity = fields.IntField()


class Review(Model):
    id = fields.IntField(pk=True)
    author = fields.TextField()
    description = fields.TextField()
    stars = fields.IntField()
