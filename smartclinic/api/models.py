from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

# Step 1: Create custom manager for Doctor
class DoctorManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Doctor must have an email address')
        email = self.normalize_email(email)
        doctor = self.model(email=email, **extra_fields)
        doctor.set_password(password)
        doctor.save()
        return doctor

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)
        return self.create_user(email, password, **extra_fields)

# Step 2: Custom Doctor model
class Doctor(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    avg_time_per_patient = models.IntegerField(default=10)
    current_patient_number = models.IntegerField(default=0)
    is_staff = models.BooleanField(default=False)  # required for admin
    is_active = models.BooleanField(default=True)  # required

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    objects = DoctorManager()

    def __str__(self):
        return self.name

# Step 3: Patient model (no change needed)
class Patient(models.Model):
    STATUS_CHOICES = (
        ('waiting', 'Waiting'),
        ('done', 'Done'),
    )
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    queue_number = models.IntegerField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='waiting')
    registered_at = models.DateTimeField(auto_now_add=True)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='patients')

    def __str__(self):
        return f"{self.name} - #{self.queue_number}"