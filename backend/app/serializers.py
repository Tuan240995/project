from rest_framework import serializers
from accounts.serializers import UserSerializer
from app.models import Product, Line,  Make

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"

class LineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Line
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        data = self._get_make(instance)
        representation['makeId']  = data['makeId']
        representation['product']  = data['product']
        representation['pic']  = data['pic']
        representation['targer']  = data['targer']
        representation['finish']  = data['finish']
        representation['efficiency']  = data['efficiency']
        return representation
    
    def _get_make(self, instance):
        data = {}
        if instance.status:
            make = Make.objects.get(line=instance, status="RUN")
            data["makeId"] = make.id
            data["product"] = make.product.name
            data["targer"] = make.targer
            data["finish"] = make.finish
            data["pic"] = make.pic.username 
            data['efficiency'] = (int(make.finish) / int(make.targer)) * 100
        else:
            data["makeId"] = ""
            data["product"] = ""
            data["targer"] = ""
            data["finish"] = ""
            data["pic"] = ""
            data['efficiency'] = 0
        return data


class MakeSerializer(serializers.ModelSerializer):
    # line = LineSerializer()
    # product = ProductSerializer()
    # pic = UserSerializer()

    class Meta:
        model = Make
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['line'] = instance.line.name
        representation['product'] = instance.product.name
        representation['pic'] = instance.pic.username
        representation['targer'] = int(instance.targer)
        representation['finish'] = int(instance.finish)
        representation['created_at'] = instance.created_at.strftime('%d-%m-%Y')
        representation['efficiency'] = round((int(instance.finish) / int(instance.targer)) * 100, 1)
        representation['missing'] = self._get_missing(instance)
        return representation

    def _get_missing(self, instance):
        if (int(instance.targer) > int(instance.finish)):
            return (int(instance.targer) - int(instance.finish))
        else :
            return 0
