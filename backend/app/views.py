from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from django.contrib.auth.models import User
from app.models import Product, Line, Make
from app.serializers import ProductSerializer, LineSerializer, MakeSerializer
from app.filters import LineFilter, MakeFilter


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
    filterset_class = MakeFilter
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
    # authentication_classes = [SessionAuthentication]
    # permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        line = request.data.get("line", None)
        product = request.data.get("product", None)
        shift = request.data.get("shift", None)
        targer = request.data.get("targer", None)


        if line and product and shift:
            try:
                line = Line.objects.get(name=line)
                if line.status:
                    return Response({'success':'false', 'message': line.name + "đang hoạt động."},status=400)
                else:
                    line.status = True
                    line.save()
                    # print(User.objects.get(id=request.session["_auth_user_id"]))
                    Make.objects.create(
                        product=Product.objects.get(name=product),
                        line=line,
                        pic=User.objects.get(id=request.session["_auth_user_id"]),
                        finish="0",
                        targer=targer,
                        shift=shift
                    )
                    return Response({'success':'true'}, status=200)
            except:
                return Response({'success':'false'}, status=400)
        return Response({'success':'false'}, status=400)
    
class StopMake(APIView):
    def post(self, request, format=None):
        try:
            make_id = request.data.get("make_id", None)
            if make_id:
                make = Make.objects.get(id=make_id)
                if make.status == "RUN":
                    user = User.objects.get(id=request.session["_auth_user_id"])
                    if make.pic.username == user.username or user.is_superuser :
                        make.line.status = False
                        make.line.save()
                        make.status = "STOP"
                        make.save()
                        return Response({'success':'true'}, status=200)
                    else:
                        return Response({'success':'false', 'message':"Bạn không phải người vận hàng Line này."}, status=200)
                else:
                    return Response({'success':'false', 'message': make.line.name + "không hoạt động."}, status=200)
        except:
            return Response({'success':'false', 'message': "Dừng line bị lỗi"}, status=400)
        return Response({'success':'false', 'message': "Dừng line bị lỗi"}, status=400)


class UpdateMake(APIView):
    def post(self, request, format=None):
        make_id = request.data.get("make_id", None)
        product = request.data.get("product", None)
        shift = request.data.get("shift", None)
        targer = request.data.get("targer", None)

        if make_id and product and shift and targer:
            try:
                make = Make.objects.get(id=make_id)
                if make.status == "RUN":
                    user = User.objects.get(id=request.session["_auth_user_id"])
                    if make.pic.username == user.username or user.is_superuser:
                        make.product = Product.objects.get(name=product)
                        make.shift = shift
                        make.targer = targer
                        make.save()
                        return Response({'success':'true'}, status=200)
                    else:
                        return Response({'success':'false', 'message':"Bạn không phải người vận hàng Line này."}, status=200)
                else:
                    return Response({'success':'false', 'message': make.line.name + "không hoạt động."}, status=200)
            except:
                return Response({'success':'false', 'message': "Cập nhập lại line bị lỗi"}, status=400)
        return Response({'success':'false', 'message': "Cập nhập lại line bị lỗi"}, status=400)

        