from django.contrib import admin
from app.models import Product, Line, Make

# Register your models here.
class ProductAdmin(admin.ModelAdmin):
    fields = ('name', 'key_QR')

class LineAdmin(admin.ModelAdmin):
    fields = ('name', 'status')

class MakeAdmin(admin.ModelAdmin):
    fields = ('product', 'line', 'targer', 'pic', 'finish', 'shift', 'status')

admin.site.register(Product, ProductAdmin)
admin.site.register(Line, LineAdmin)
admin.site.register(Make, MakeAdmin)