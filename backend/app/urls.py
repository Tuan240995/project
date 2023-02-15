from django.urls import path, include
from rest_framework.routers import DefaultRouter
from app.views import (
AppProduct, 
AppLine, 
AppMake, 
CreateMake,
StopMake,
UpdateMake
)

urlpatterns = [
    path('create_make/', CreateMake.as_view(), name='create_make'),
    path('stop_make/', StopMake.as_view(), name='stop_make'),
    path('update_make/', UpdateMake.as_view(), name='update_make'),
]
router = DefaultRouter()
router.register(r'product', AppProduct, basename='san-pham')
router.register(r'line', AppLine, basename='line')
router.register(r'make', AppMake, basename='make')
urlpatterns += router.urls