from django.contrib import admin
from .models import User, Car, CarMaintenanceRecords
from .forms import UserChange, UserForm
from django.contrib.auth.admin import UserAdmin


@admin.register(User)
class AdminUser(UserAdmin):
    add_form = UserForm
    form = UserChange #can superadmin change the users information

    model = User


admin.site.register(Car)
admin.site.register(CarMaintenanceRecords)