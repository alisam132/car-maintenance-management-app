from django.shortcuts import render
from rest_framework.generics import GenericAPIView, RetrieveAPIView, DestroyAPIView, ListCreateAPIView, RetrieveUpdateAPIView, ListAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import *
from .models import Car, CarMaintenanceRecords
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status

class UserSignUpAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserSignUpSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = RefreshToken.for_user(user)
        data =serializer.data
        data['tokens'] = {
            "refresh": str(token),
            "access": str(token.access_token)}

        return Response(data, status.HTTP_201_CREATED)

class UserLoginAPIView(GenericAPIView):
    permission_classes =(AllowAny,)
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        serializer = UserSerializer(user)
        token = RefreshToken.for_user(user)
        data = serializer.data
        data["tokens"] = {
            "refresh": str(token),
            "access": str(token.access_token)}
        return Response(data, status= status.HTTP_200_OK)

class UserLogoutAPIView(GenericAPIView):
    permission_classes = (IsAuthenticated,)
    
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status= status.HTTP_400_BAD_REQUEST)



class UserInfoAPIView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class CarListCreate(ListCreateAPIView):
    serializer_class = CarSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return Car.objects.filter(car_owner=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(car_owner = self.request.user)
        else:
            print(serializer.errors)

class CarMaintenanceRecordsListCreate(ListCreateAPIView):
    serializer_class = CarMaintenanceRecordsSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return CarMaintenanceRecords.objects.filter(owner_id=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(owner_id = self.request.user)
        else:
            print(serializer.errors)

class CarDelete(DestroyAPIView):
    serializer_class = CarSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return Car.objects.filter(car_owner=user)

        
class CarMaintenanceRecordsDelete(DestroyAPIView):
    serializer_class = CarMaintenanceRecordsSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return CarMaintenanceRecords.objects.filter(owner_id=user)


class CarUpdate(RetrieveUpdateAPIView):
    serializer_class = CarSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        car = user.cars.all()
        return Car.objects.filter(car_owner=user)


class CarMaintenanceRecordsUpdate(RetrieveUpdateAPIView):
    serializer_class = CarMaintenanceRecordsSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        carmaintenancerecords = user.owner.all()
        return CarMaintenanceRecords.objects.filter(owner_id=user)
