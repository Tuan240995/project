from rest_framework.views import APIView
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from django.contrib.auth.models import User
from app.models import Product, Line, Make
from app.serializers import ProductSerializer, LineSerializer, MakeSerializer
from app.filters import LineFilter


class AppProduct(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class  = ProductSerializer
    http_method_names = ['get', 'post', 'put']

class AppLine(ModelViewSet):
    queryset = Line.objects.all()
    serializer_class  = LineSerializer
    filterset_class = LineFilter
    http_method_names = ['get', 'post', 'put']


class AppMake(ModelViewSet):
    queryset = Make.objects.all()
    serializer_class  = MakeSerializer
    http_method_names = ['get', 'post', 'put']

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        request.data["product"] = Product.objects.get(name=request.data["product"]).id
        request.data["line"] = Line.objects.get(name=request.data["line"]).id
        request.data["pic"] = User.objects.get(username=request.data["pic"]).id
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}
        return Response(serializer.data)

class CreateMake(APIView):
    def post(self, request, format=None):
        print(request.user)
        line = request.data.get("line")
        product = request.data.get("product")
        shift = request.data.get("shift")
        if line and product and shift:
            return Response({'success':'true'},status=200)
        return Response({'success':'false'},status=400)
