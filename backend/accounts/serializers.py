from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "is_superuser", "first_name", "last_name"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['first_name']  = self.check_position(instance.first_name)
        return representation

    def check_position(self, position):
        if "Leve 1" == position:
            return "Nhân Viên"
        elif "Leve 2" == position:
            return "Leader"
        elif "Leve 3" == position:
            return "Manager"
        elif "Leve 4" == position:
            return "Admin"