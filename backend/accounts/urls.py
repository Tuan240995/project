from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views


urlpatterns = [
    path('login/', views.UserLogin.as_view(), name='login'),
    path('logout/', views.UserLogout.as_view(), name='logout'),

]

router = DefaultRouter()
router.register(r'nhan-vien', views.NhanVien, basename='san-pham')
urlpatterns += router.urls