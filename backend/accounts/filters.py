import django_filters
from django_filters import rest_framework as filters
from django.contrib.auth.models import User

class UserFilter(filters.FilterSet):
    print("====================")
    last_name = filters.CharFilter(
        field_name='last_name',
        lookup_expr='icontains',
    )
    username = filters.CharFilter(
        field_name='username',
        lookup_expr='icontains',
    )

    first_name = filters.CharFilter(
        field_name='first_name',
        lookup_expr='icontains',
    )

    class Make:
        model = User
