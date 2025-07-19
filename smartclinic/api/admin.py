from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Doctor, Patient
from .forms import CustomDoctorCreationForm
from django.utils.translation import gettext_lazy as _

@admin.register(Doctor)
class DoctorAdmin(UserAdmin):
    add_form = CustomDoctorCreationForm
    model = Doctor

    list_display = (
        'id', 'email', 'name', 'avg_time_per_patient',
        'current_patient_number', 'is_staff', 'is_superuser'
    )
    list_filter = ('is_staff', 'is_superuser', 'avg_time_per_patient')

    search_fields = ('email', 'name')
    ordering = ('email',)

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Doctor Info'), {'fields': ('name', 'avg_time_per_patient', 'current_patient_number')}),
        (_('Permissions'), {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')
        }),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'password1', 'password2', 'is_staff', 'is_superuser'),
        }),
    )

@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'name', 'phone_number', 'queue_number',
        'status', 'doctor', 'registered_at'
    )
    list_filter = ('status', 'doctor')
    search_fields = ('name', 'phone_number')
    ordering = ('queue_number',)

    # Auto-assign queue number if not provided
    def save_model(self, request, obj, form, change):
        if not change and not obj.queue_number:
            doctor = obj.doctor
            last_queue = Patient.objects.filter(doctor=doctor).count()
            obj.queue_number = last_queue + 1
        super().save_model(request, obj, form, change)