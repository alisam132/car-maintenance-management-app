from django.db import models
from django.contrib.auth.models import AbstractUser

CAR_TYPE = (
        ("suv", "SUV"),
        ("sed", "SEDAN"),
        ("pic", "PICKUP"),
    )

class User(AbstractUser):
    email = models.EmailField(unique=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS=["first_name", "last_name",'username']

    def __str__(self):
        return self.email


class Car(models.Model):
    
    car_make = models.CharField(max_length=200)
    car_model = models.CharField(max_length=200)
    car_model_year = models.IntegerField()
    car_type = models.CharField(max_length=3, choices=CAR_TYPE, default=CAR_TYPE)
    car_owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="cars")

    def __str__(self):
        return f"{self.car_model} - {self.car_make}"


class CarMaintenanceRecords(models.Model):
    
    record_name = models.CharField(max_length=200)
    issue_date = models.DateField()
    amount = models.FloatField()
    shop_name = models.CharField(max_length=200)
    car_id = models.ForeignKey(Car, on_delete=models.CASCADE, related_name="car")
    owner_id = models.ForeignKey(User, on_delete=models.CASCADE,default=1, related_name="owner")

    def __str__(self):
        return f"{self.record_name} - {self.shop_name}"