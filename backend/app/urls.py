from django.urls import path, include
from rest_framework.routers import DefaultRouter
from app.views import AppProduct, AppLine, AppMake, CreateMake

urlpatterns = [
    path('create_make/', CreateMake.as_view(), name='create_make'),
    
]
router = DefaultRouter()
router.register(r'product', AppProduct, basename='san-pham')
router.register(r'line', AppLine, basename='line')
router.register(r'make', AppMake, basename='make')
urlpatterns += router.urls