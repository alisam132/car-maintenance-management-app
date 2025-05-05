from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import User

class UserForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
        fields = ("email",)


class UserChange(UserChangeForm):
    class Meta:
        model = User
        fields = ("email",)