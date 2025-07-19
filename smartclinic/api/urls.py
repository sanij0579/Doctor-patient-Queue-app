from django.urls import path
from .views import (
    register_patient, QueueStatusView, MarkPatientDoneView,
    AllPatientsView, get_current_number
)

urlpatterns = [
    path('register/', register_patient),
    path('status/<int:doctor_id>/<int:patient_id>/', QueueStatusView.as_view()),
    path('mark-done/<int:doctor_id>/', MarkPatientDoneView.as_view()),
    path('all-patients/<int:doctor_id>/', AllPatientsView.as_view()),
    path('current-number/<int:doctor_id>/', get_current_number),  # ✅ New route
]