from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from app.models import Product, Line, Make
from app.serializers import ProductSerializer, LineSerializer, MakeSerializer


class AppProduct(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class  = ProductSerializer
    http_method_names = ['get', 'post', 'put']

class AppLine(ModelViewSet):
    queryset = Line.objects.all()
    serializer_class  = LineSerializer
    http_method_names = ['get', 'post', 'put']


class AppMake(ModelViewSet):
    queryset = Make.objects.all()
    serializer_class  = MakeSerializer
    http_method_names = ['get', 'post', 'put']

