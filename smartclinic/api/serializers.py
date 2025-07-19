from rest_framework import serializers
from .models import Patient

class PatientRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['id', 'name', 'phone_number', 'queue_number', 'status', 'doctor']
        read_only_fields = ['queue_number', 'status']

    def create(self, validated_data):
        doctor = validated_data['doctor']
        last_patient = Patient.objects.filter(doctor=doctor).order_by('-queue_number').first()
        next_queue = last_patient.queue_number + 1 if last_patient else 1
        validated_data['queue_number'] = next_queue
        return super().create(validated_data)