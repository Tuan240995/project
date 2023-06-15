from datetime import datetime
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from django.contrib.auth.models import User
from app.models import Product, Line, Make, Produce
from app.serializers import ProductSerializer, LineSerializer, MakeSerializer, ProduceSerializer
from app.filters import ProductFilter, LineFilter, MakeFilter, ProduceFilter


class AppProduct(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class  = ProductSerializer
    filterset_class = ProductFilter
    http_method_names = ['get', 'post', 'put', 'delete']

class AppLine(ModelViewSet):
    queryset = Line.objects.all()
    serializer_class  = LineSerializer
    filterset_class = LineFilter
    http_method_names = ['get', 'post', 'put', 'delete']


class AppMake(ModelViewSet):
    queryset = Make.objects.all().order_by("status")
    serializer_class  = MakeSerializer
    filterset_class = MakeFilter
    http_method_names = ['get', 'put']

    def list(self, request, *args, **kwargs):
        start_day = self.request.GET.get("start_day", None)
        to_day = self.request.GET.get("to_day", None)
        queryset = self.filter_queryset(self.get_queryset())

        # print(queryset)
        tz = timezone.get_current_timezone()
        if start_day:
            start = timezone.make_aware(datetime.strptime(start_day, "%Y-%m-%d"), tz, True)
            queryset = queryset.filter(created_at__gte=start);
        if to_day:
            end = timezone.make_aware(datetime.strptime(to_day, "%Y-%m-%d"), tz, True)
            queryset = queryset.filter(created_at__lte=end);

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    # def update(self, request, *args, **kwargs):
    #     partial = kwargs.pop('partial', False)
    #     instance = self.get_object()
    #     # request.data["product"] = Product.objects.get(name=request.data["product"]).id
    #     # request.data["line"] = Line.objects.get(name=request.data["line"]).id
    #     # request.data["pic"] = User.objects.get(username=request.data["pic"]).id
    #     serializer = self.get_serializer(instance, data=request.data, partial=partial)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_update(serializer)
    #     if getattr(instance, '_prefetched_objects_cache', None):
    #         # If 'prefetch_related' has been applied to a queryset, we need to
    #         # forcibly invalidate the prefetch cache on the instance.
    #         instance._prefetched_objects_cache = {}
    #     return Response(serializer.data)

class CreateMake(APIView):
    # authentication_classes = [SessionAuthentication]
    # permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        line = self.request.data.get("line", None)
        product = self.request.data.get("product", None)
        shift = self.request.data.get("shift", None)
        targer = request.data.get("targer", None)
        staff = self.request.data.get("staff", None)

        if line and product and shift and staff:
            try:
                line = Line.objects.get(name=line)
                if line.status:
                    return Response({'success':'false', 'message': line.name + "đang hoạt động."},status=400)
                else:
                    line.status = True
                    line.save()
                    set_user = set(staff.split(", "))
                    obj_product = Product.objects.get(key_QR=product)
                    # print(User.objects.get(id=request.session["_auth_user_id"]))
                    Produce.objects.create(
                        product=obj_product.name,
                        key_QR=obj_product.key_QR,
                        line=line.name,
                        pic=User.objects.get(id=request.session["_auth_user_id"]).username,
                        finish="0",
                        targer=obj_product.targer,
                        shift=shift,
                        staff=', '.join(set_user)
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
                make = Produce.objects.get(id=make_id)
                if make.status == "RUN":
                    # user = User.objects.get(id=request.session["_auth_user_id"])
                    # if make.pic.username == user.username or user.is_superuser :
                    line = Line.objects.get(name=make.line)
                    line.status = False
                    line.save()
                    make.status = "STOP"
                    make.save()
                    return Response({'success':'true'}, status=200)
                    # else:
                    #     return Response({'success':'false', 'message':"Bạn không phải người vận hàng Line này."}, status=200)
                else:
                    return Response({'success':'false', 'message': make.line.name + "không hoạt động."}, status=200)
        except:
            return Response({'success':'false', 'message': "Dừng line bị lỗi"}, status=400)
        return Response({'success':'false', 'message': "Dừng line bị lỗi"}, status=400)


class UpdateMake(APIView):
    def post(self, request, format=None):
        make_id = self.request.data.get("make_id", None)
        product = self.request.data.get("product", None)
        shift = self.request.data.get("shift", None)
        # targer = self.request.data.get("targer", None)
        staff = self.request.data.get("staff", None)
        is_make = self.request.data.get("is_make", False)
        m_finish = self.request.data.get("m_finish", None)

        if is_make and make_id and m_finish:
            make = Produce.objects.get(id=make_id)
            make.finish = m_finish
            make.save()
            return Response({'success':'true','data': ProduceSerializer(make).data}, status=200)

        if make_id and product and shift  and staff:
            try:
                make = Produce.objects.get(id=make_id)
                if make.status == "RUN":
                    # user = User.objects.get(id=request.session["_auth_user_id"])
                    # if make.pic.username == user.username or user.first_name in ["Leve 4", "Leve 3"]:
                    set_user = set(staff.split(", "))
                    obj_product = Product.objects.get(key_QR=product)
                    make.product = obj_product.name
                    make.key_QR=obj_product.key_QR
                    make.shift = shift
                    make.targer = obj_product.targer
                    make.staff = ', '.join(set_user)
                    make.save()
                    return Response({'success':'true'}, status=200)
                    # else:
                    # eturn Response({'success':'false', 'message':"Bạn không phải người vận hàng Line này."}, status=200)
                else:
                    return Response({'success':'false', 'message': make.line.name + "không hoạt động."}, status=200)
            except:
                return Response({'success':'false', 'message': "Cập nhập lại line bị lỗi, Hãy đăng nhập lại"}, status=400)
        return Response({'success':'false', 'message': "Cập nhập lại line bị lỗi"}, status=400)

        
class AppProduce(ModelViewSet):
    queryset = Produce.objects.all().order_by("status")
    serializer_class  = ProduceSerializer
    filterset_class = ProduceFilter
    http_method_names = ['get', 'put', 'post']

    def list(self, request, *args, **kwargs):
        start_day = self.request.GET.get("start_day", None)
        to_day = self.request.GET.get("to_day", None)
        queryset = self.filter_queryset(self.get_queryset())

        tz = timezone.get_current_timezone()
        if start_day:
            start = timezone.make_aware(datetime.strptime(start_day, "%Y-%m-%d"), tz, True)
            queryset = queryset.filter(created_at__gte=start);
        if to_day:
            end = timezone.make_aware(datetime.strptime(to_day, "%Y-%m-%d"), tz, True)
            queryset = queryset.filter(created_at__lte=end);

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    