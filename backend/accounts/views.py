from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from django.contrib.auth import login, logout, authenticate
from accounts.serializers import UserSerializer
from django.contrib.auth.models import User
from accounts.filters import UserFilter



class UserLogin(APIView):
    def post(self, request, *args, **kwargs):
        username = request.POST.get('username', '')
        password = request.POST.get('password', '')
        if username and password:
            user = authenticate(request, username=username, password=password)
            if user:
                login(request, user)
                return Response({'success':'true', 'data':UserSerializer(user).data},status=200)
        return Response({'success':'false'},status=400)


class UserLogout(APIView):
    def get(self, request, *args, **kwargs):
        logout(request)
        return Response({'success':'true'},status=200)
    

class NhanVien(ModelViewSet):
    queryset = User.objects.all().order_by('-first_name')
    serializer_class  = UserSerializer
    filterset_class = UserFilter
    # ordering   =  ['-is_superuser']

    def create(self, request, *args, **kwargs):
        name = request.data.get("name", None)
        code = request.data.get("code", None)
        position = request.data.get("position", None)
        password = request.data.get("password", None)

        if name and code and position and password:
            try:
                User.objects.create_user(
                    username = code, 
                    last_name = name, 
                    first_name = self.check_position(position),
                    password= password)
                return Response({'success':'true'},status=200)
            except:
                return Response({'success':'false', 'message': 'Mã Nhân viên đã tồn tại'},status=400)
        return Response({'success':'false', 'message': 'Nhập thiếu thông tin'},status=400)
    
    def update(self, request, *args, **kwargs):
        password = request.data.get("password", None)
        position = request.data.get("first_name", None)
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        if password:
            instance.set_password(password)
            instance.save()
        if position:
            request.data['first_name'] = self.check_position(position)
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)


    def check_position(self, position):
        if "Nhân Viên" == position:
            return "Leve 1"
        elif "Leader" == position:
            return "Leve 2"
        elif "Manager" == position:
            return "Leve 3"
        elif "Admin" == position:
            return "Leve 4"
    
