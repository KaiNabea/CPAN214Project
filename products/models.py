from django.db import models

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('apparel', 'Apparel'),
        ('electronics', 'Electronics'),
        ('accessories', 'Accessories'),
        ('office', 'Office Supplies'),
        ('home', 'Home & Living'),
    ]

    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    stock = models.IntegerField()
    image = models.ImageField(upload_to='products/')
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='accessories')
    created_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='products/', default='default.jpg')


    def __str__(self):
        return self.name
