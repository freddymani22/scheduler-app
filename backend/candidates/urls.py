# urls.py
from django.urls import path
from .views import CandidateCreateView, CandidateUpdateView

urlpatterns = [
    path('create-details/', CandidateCreateView.as_view(),
         name='candidate-details-create'),
    path('update-details/<str:pk>/', CandidateUpdateView.as_view(),
         name="candidate-details-update")

]
