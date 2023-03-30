import django_filters
from django_filters import rest_framework as filters
from app.models import Product, Line, Make

class ProductFilter(filters.FilterSet):
    class Meta:
        model = Product
        fields = ['name', 'key_QR']

class LineFilter(filters.FilterSet):
    class Meta:
        model = Line
        fields = ['name', 'status']


class MakeFilter(filters.FilterSet):
    line = filters.CharFilter(
        field_name='line__name',
        lookup_expr='icontains',
    )

    pic = filters.CharFilter(
        field_name='pic__username',
        lookup_expr='icontains',
    )

    pic = filters.CharFilter(
        field_name='pic__username',
        lookup_expr='icontains',
    )

    shift = filters.CharFilter(
        field_name='shift',
        lookup_expr='icontains',
    )

    status = filters.CharFilter(
        field_name='status',
        lookup_expr='icontains',
    )

    class Make:
        model = Make
