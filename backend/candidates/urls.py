# urls.py
from django.urls import path
from .views import UserProfileCreateAPIView, UserProfileAPIView, UserAvailabilityListCreateView

urlpatterns = [
    path('create-details/', UserProfileCreateAPIView.as_view(),
         name='user-details-create'),
    path('details/', UserProfileAPIView.as_view(),
         name="user-details-update"),
    path('candidate-availability/', UserAvailabilityListCreateView.as_view(),
         name='user-availability-list-create'),

]
