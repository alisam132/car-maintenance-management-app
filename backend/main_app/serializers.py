from .models import User, Car, CarMaintenanceRecords
from rest_framework import serializers
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email")

class UserSignUpSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only = True)
    password2 = serializers.CharField(write_only = True)
    
    class Meta:
        model = User
        fields = ("id", "username", "email", "password1", "password2", "first_name", "last_name")
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, attrs):
        if attrs['password1'] != attrs['password2']:
            return serializers.ValidationError("Password don't match..!")
        return attrs

    def create(self, validated_data):
        password = validated_data.pop("password1")
        validated_data.pop("password2")

        return User.objects.create_user(password = password, **validated_data)


class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField(write_only=True)


    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials..!")


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ["id", "car_make","car_model", "car_model_year", "car_type", "car_owner"]
        extra_kwargs = {"car_owner": {"read_only": True}}


class CarMaintenanceRecordsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarMaintenanceRecords
        fields = ["id", "record_name","issue_date", "amount", "shop_name", "car_id", "owner_id"]