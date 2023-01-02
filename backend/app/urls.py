from django.urls import path, include
from rest_framework.routers import DefaultRouter
from app.views import AppProduct, AppLine, AppMake


router = DefaultRouter()
router.register(r'san-pham', AppProduct, basename='san-pham')
router.register(r'line', AppLine, basename='line')
router.register(r'make', AppMake, basename='make')
urlpatterns = router.urls