from rest_framework import generics
from .models import Candidate
from .CandidateSerializers import CandidateSerializer
from rest_framework.permissions import IsAuthenticated


class CandidateCreateView(generics.CreateAPIView):
    serializer_class = CandidateSerializer
    permission_classes = {IsAuthenticated}

    def get_queryset(self):

        user = self.request.user
        print(user)
        return Candidate.objects.filter(user=user)


class CandidateUpdateView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CandidateSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Candidate.objects.filter(user=user)
