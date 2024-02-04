
from .models import CandidateAvailability
from rest_framework.generics import ListCreateAPIView
from rest_framework import generics
from .models import Candidate
from .CandidateSerializers import CandidateSerializer, CandidateAvailabilitySerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class CandidateCreateView(generics.CreateAPIView):
    serializer_class = CandidateSerializer
    permission_classes = {IsAuthenticated}

    def get_queryset(self):

        user = self.request.user

        return Candidate.objects.filter(user=user)


class CandidateUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        try:
            return Candidate.objects.get(user__email=user)
        except Candidate.DoesNotExist:
            return None

    def get(self, request, *args, **kwargs):
        candidate = self.get_object()

        if candidate is not None:
            serializer = CandidateSerializer(candidate)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, *args, **kwargs):
        candidate = self.get_object()

        if candidate is not None:
            serializer = CandidateSerializer(candidate, data=request.data)
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


class CandidateAvailabilityListCreateView(ListCreateAPIView):

    serializer_class = CandidateAvailabilitySerializer

    def get_queryset(self):

        user = self.request.user

        return CandidateAvailability.objects.filter(candidate__user__email=user)
