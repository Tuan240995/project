from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from django.contrib.auth import login, logout, authenticate
from accounts.serializers import UserSerializer
from django.contrib.auth.models import User



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
    # ordering   =  ['-is_superuser']