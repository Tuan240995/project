from django.db import models
from django.contrib.auth.models import User

class Product(models.Model):
    name = models.CharField(max_length=200, blank=True)
    key_QR = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.name + "  ---- key: "  + self.key_QR

class Line(models.Model):
    name = models.CharField(max_length=200, blank=True)
    status = models.BooleanField(default=False)

    def __str__(self):
        return self.name + "  ---- status: "  + str(self.status)


class Make(models.Model):
    SHIFT_CHOIES = (
        ("MS", "MS"),
        ("AS", "AS"),
        ("NS", "NS"),
        ("ALL", "ALL"),
    )

    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    line = models.ForeignKey(Line, on_delete=models.CASCADE)
    pic = models.ForeignKey(User, on_delete=models.CASCADE)
    targer = models.CharField(max_length=200, blank=True)
    finish = models.CharField(max_length=200, blank=True, default ="0")
    status = models.CharField(max_length=200, blank=True, default ="RUN")
    shift = models.CharField(max_length=200, choices=SHIFT_CHOIES, default ="MS")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.line.name + " - "  + self.product.name + " - " +  str(self.created_at)


