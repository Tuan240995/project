import django_filters
from django_filters import rest_framework as filters
from app.models import Product, Line,  Make

class LineFilter(filters.FilterSet):
    class Meta:
        model = Line
        fields = ['name', 'status']
