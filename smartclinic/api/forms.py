from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import Doctor

class CustomDoctorCreationForm(UserCreationForm):
    class Meta:
        model = Doctor
        fields = ('email', 'name', 'password1', 'password2')