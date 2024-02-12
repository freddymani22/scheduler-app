
from .models import UserAvailability
from rest_framework.generics import ListCreateAPIView
from rest_framework import generics
from .models import UserProfile
from .userserializers import UserProfileSerializer, UserAvailabilitySerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class UserProfileCreateAPIView(generics.CreateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = {IsAuthenticated}

    def get_queryset(self):

        user = self.request.user

        return UserProfile.objects.filter(user=user)


class UserProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        try:
            return UserProfile.objects.get(user__email=user)
        except UserProfile.DoesNotExist:
            return None

    def get(self, request, *args, **kwargs):
        candidate = self.get_object()

        if candidate is not None:
            serializer = UserProfileSerializer(candidate)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, *args, **kwargs):
        candidate = self.get_object()

        if candidate is not None:
            serializer = UserProfileSerializer(candidate, data=request.data)
            if serializer.is_valid():

                serializer.save()
                return Response(serializer.data)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, *args, **kwargs):
        candidate = self.get_object()

        if candidate is not None:
            candidate.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class UserAvailabilityListCreateView(ListCreateAPIView):

    serializer_class = UserAvailabilitySerializer

    def get_queryset(self):

        user = self.request.user

        return UserAvailability.objects.filter(candidate__user__email=user)
