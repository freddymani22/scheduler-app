from django.urls import path
from .views import CandidateAvailabilityListView, filter_candidates_by_availability


urlpatterns = [

    path('', CandidateAvailabilityListView.as_view(),
         name='candidate-availability-list'),
    path('available-canditate/', filter_candidates_by_availability,
         name='filtered-candidate')
]
