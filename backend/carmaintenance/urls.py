"""
URL configuration for carmaintenance project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from main_app.views import *
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("auth/signup/", UserSignUpAPIView.as_view(), name="signup-user"),
    path("auth/login/", UserLoginAPIView.as_view(), name="login-user"),
    path("auth/logout/", UserLogoutAPIView.as_view(), name="logout-user"),
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("auth/user/", UserInfoAPIView.as_view(), name="user-info"),
    path("cars/", CarListCreate.as_view(), name="car-list"),
    path("cars/new/", CarListCreate.as_view(), name="create-car"),
    path("cars/delete/<int:pk>", CarDelete.as_view(), name="delete-car"),
    path("cars/edit/<int:pk>", CarUpdate.as_view(), name="get-data-car"),
    path("cars/update/<int:pk>", CarUpdate.as_view(), name="update-car"),
    path("carsrecords/", CarMaintenanceRecordsListCreate.as_view(), name="carsrecords-list"),
    path("carsrecords/new/", CarMaintenanceRecordsListCreate.as_view(), name="create-carsrecords"),
    path("carsrecords/delete/<int:pk>", CarMaintenanceRecordsDelete.as_view(), name="delete-carsrecords"),
    path("carsrecords/edit/<int:pk>", CarMaintenanceRecordsUpdate.as_view(), name="get-data-carsrecords"),
    path("carsrecords/update/<int:pk>", CarMaintenanceRecordsUpdate.as_view(), name="update-carsrecords"),
]
