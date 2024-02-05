# urls.py
from django.urls import path
from .views import CandidateCreateView, CandidateUpdateView, CandidateAvailabilityListCreateView

urlpatterns = [
    path('create-details/', CandidateCreateView.as_view(),
         name='candidate-details-create'),
    path('details/', CandidateUpdateView.as_view(),
         name="candidate-details-update"),
    path('candidate-availability/', CandidateAvailabilityListCreateView.as_view(),
         name='candidate-availability-list-create'),

]
