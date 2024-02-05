from django.urls import path
from .views import CandidateAvailabilityListView, filter_candidates_by_availability, update_availability


urlpatterns = [

    path('', CandidateAvailabilityListView.as_view(),
         name='candidate-availability-list'),
    path('available-candidate/', filter_candidates_by_availability,
         name='filtered-candidate'),
    path('update-availability-title/', update_availability,
         name='update_availability'),
]
