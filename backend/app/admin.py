from django.contrib import admin
from app.models import Product, Line, Produce

# Register your models here.
class ProductAdmin(admin.ModelAdmin):
    fields = ('name', 'key_QR')

class LineAdmin(admin.ModelAdmin):
    fields = ('name', 'status')

class ProduceAdmin(admin.ModelAdmin):
    fields = ('product', 'key_QR', 'line', 'targer', 'pic', 'finish', 'shift', 'staff', 'status')

admin.site.register(Product, ProductAdmin)
admin.site.register(Line, LineAdmin)
admin.site.register(Produce, ProduceAdmin)