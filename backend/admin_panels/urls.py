from django.urls import path
from .views import UserAvailabilityAPIListView, filter_user_by_availability, update_availability, create_user, ListUserAPIView, UserDeleteAPIView


urlpatterns = [

    path('', UserAvailabilityAPIListView.as_view(),
         name='user-availability-list'),
    path('available-candidate/', filter_user_by_availability,
         name='filtered-user'),
    path('update-availability-title/', update_availability,
         name='update_availability'),
    path('create-user/', create_user, name='create_user'),
    path('list-user/', ListUserAPIView.as_view(), name="list-user"),
    path('user-delete/<int:pk>/', UserDeleteAPIView.as_view(), name='user-delete')
]
