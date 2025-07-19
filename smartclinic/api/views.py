from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Doctor, Patient

# ✅ 1. Public: Register new patient
@api_view(['POST'])
@permission_classes([AllowAny])
def register_patient(request):
    name = request.data.get('name')
    phone = request.data.get('phone_number')
    doctor_id = request.data.get('doctor')

    if not name or not phone or not doctor_id:
        return Response({'error': 'Missing fields'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        doctor = Doctor.objects.get(id=doctor_id)
        queue_number = Patient.objects.filter(doctor=doctor).count() + 1

        patient = Patient.objects.create(
            name=name,
            phone_number=phone,
            doctor=doctor,
            queue_number=queue_number
        )

        return Response({'id': patient.id}, status=status.HTTP_201_CREATED)

    except Doctor.DoesNotExist:
        return Response({'error': 'Doctor not found'}, status=status.HTTP_404_NOT_FOUND)


# ✅ 2. Authenticated: Get queue status for a patient
class QueueStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, doctor_id, patient_id):
        try:
            doctor = Doctor.objects.get(id=doctor_id)
            patient = Patient.objects.get(id=patient_id, doctor=doctor)

            current_number = doctor.current_patient_number
            patient_number = patient.queue_number
            avg_time = doctor.avg_time_per_patient or 5  # fallback to 5 minutes

            wait_time = max(0, (patient_number - current_number) * avg_time)

            return Response({
                "current_number": current_number,
                "your_number": patient_number,
                "estimated_wait_minutes": wait_time
            })

        except Doctor.DoesNotExist:
            return Response({"error": "Doctor not found"}, status=status.HTTP_404_NOT_FOUND)
        except Patient.DoesNotExist:
            return Response({"error": "Patient not found"}, status=status.HTTP_404_NOT_FOUND)


# ✅ 3. Authenticated: Doctor marks current patient as done
class MarkPatientDoneView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, doctor_id):
        try:
            doctor = Doctor.objects.get(id=doctor_id)

            # Get next patient in queue
            patient = Patient.objects.filter(
                doctor=doctor,
                status='waiting',
                queue_number__gte=doctor.current_patient_number
            ).order_by('queue_number').first()

            if not patient:
                return Response(
                    {"error": "No more waiting patients."},
                    status=status.HTTP_404_NOT_FOUND
                )

            patient.status = 'done'
            patient.save()

            doctor.current_patient_number = patient.queue_number + 1
            doctor.save()

            return Response({
                "message": f"Marked patient #{patient.queue_number} as done",
                "next_patient_number": doctor.current_patient_number
            })

        except Doctor.DoesNotExist:
            return Response({"error": "Doctor not found"}, status=status.HTTP_404_NOT_FOUND)


# ✅ 4. Authenticated: All patients for a doctor
class AllPatientsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, doctor_id):
        patients = Patient.objects.filter(doctor_id=doctor_id).order_by('queue_number')
        data = [{
            'name': p.name,
            'queue_number': p.queue_number,
            'status': p.status
        } for p in patients]
        return Response(data)


# ✅ 5. Authenticated: Get current number (for dashboard)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_number(request, doctor_id):
    try:
        doctor = Doctor.objects.get(id=doctor_id)
        return Response({
            "current_number": doctor.current_patient_number
        })
    except Doctor.DoesNotExist:
        return Response({"error": "Doctor not found"}, status=status.HTTP_404_NOT_FOUND)