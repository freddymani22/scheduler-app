from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from django.db.models import Q

from .admin_serializers import UserAvailabilitySerializer, CreateUserSerializer, UserSerializer
from candidates.models import UserAvailability
from candidates.userserializers import UserProfileSerializer
from accounts.models import CustomUser
from datetime import datetime, time
from django.utils import timezone


class InterviewAdminPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        print(user.is_authenticated and user.is_interview_admin)
        return user.is_authenticated and user.is_interview_admin


class UserAvailabilityAPIListView(generics.ListAPIView):
    serializer_class = UserAvailabilitySerializer
    permission_classes = [InterviewAdminPermission]

    def get_queryset(self):
        return UserAvailability.objects.all()

    def list(self, request, *args, **kwargs):
        try:
            self.check_permissions(request)
        except PermissionDenied:
            return Response({'detail': 'You are not authorized to access this resource.'}, status=403)

        return super().list(request, *args, **kwargs)


@api_view(['POST'])
@permission_classes([InterviewAdminPermission])
def filter_user_by_availability(request):
    date_str = request.data.get('date')
    available_from_str = request.data.get('available_from')
    available_to_str = request.data.get('available_to')

    # Ensure all required data is provided
    if not (date_str and available_from_str and available_to_str):
        return Response({'error': 'Incomplete data provided'}, status=status.HTTP_400_BAD_REQUEST)

    # Parse date and time strings to create datetime objects
    date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()
    available_from_obj = datetime.strptime(available_from_str, '%H:%M').time()
    available_to_obj = datetime.strptime(available_to_str, '%H:%M').time()

    # Combine date and time to create datetime objects
    available_from_datetime = timezone.make_aware(
        datetime.combine(date_obj, available_from_obj),
        timezone.get_current_timezone()
    )
    available_to_datetime = timezone.make_aware(
        datetime.combine(date_obj, available_to_obj),
        timezone.get_current_timezone()
    )

    user_availability_objects = UserAvailability.objects.filter(
        Q(available_from__range=(available_from_datetime, available_to_datetime)) |
        Q(available_to__range=(available_from_datetime, available_to_datetime)) |
        Q(available_from__lte=available_from_datetime,
          available_to__gte=available_to_datetime),
        interview_title='Available'
    )
    print(user_availability_objects)
    candidates = []
    interviewers = []

    for user_availability in user_availability_objects:
        user_email = user_availability.candidate.user.email
        user_type = user_availability.candidate.user.user_type

        # Check user type and organize accordingly
        if user_type == 'candidate':
            candidates.append(
                {'id': user_availability.id, 'email': user_email})
        elif user_type == 'interviewer':
            interviewers.append(
                {'id': user_availability.id, 'email': user_email})

    # Create the final response
    response_data = {
        'candidates': candidates,
        'interviewers': interviewers,
    }

    return Response(response_data)


@api_view(['PUT', 'PATCH'])
@permission_classes([InterviewAdminPermission])
def update_availability(request):
    # Extract data from the request
    candidate_availability_id_candidate = request.data.get(
        'candidate_availability_id')
    candidate_availability_id_interviewer = request.data.get(
        'interviewer_availability_id')
    interview_title = request.data.get('interview_title')

    # Check if all required data is provided
    if not (candidate_availability_id_candidate and candidate_availability_id_interviewer and interview_title):
        return Response({'error': 'Incomplete data provided'}, status=status.HTTP_400_BAD_REQUEST)

    # Get the CandidateAvailability instances
    candidate_availability_candidate = get_object_or_404(
        UserAvailability, pk=candidate_availability_id_candidate, candidate__user__user_type='candidate')
    candidate_availability_interviewer = get_object_or_404(
        UserAvailability, pk=candidate_availability_id_interviewer, candidate__user__user_type='interviewer')

    # Update the interview titles
    candidate_availability_candidate.interview_title = interview_title
    candidate_availability_interviewer.interview_title = interview_title

    # Save the changes
    candidate_availability_candidate.save()
    candidate_availability_interviewer.save()

    return Response({'message': 'Interview titles updated successfully'}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([InterviewAdminPermission])
def create_user(request):
    if request.method == 'POST':
        # Assuming 'first_name' and 'is_candidate' are present in the request data
        data = request.data
        serializer = CreateUserSerializer(data=data)

        if serializer.is_valid():
            user = serializer.save()
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ListUserAPIView(generics.ListAPIView):
    permission_classes = [InterviewAdminPermission]

    serializer_class = UserSerializer

    def get_queryset(self):
        return CustomUser.objects.exclude(email=self.request.user)


class UserDeleteAPIView(generics.DestroyAPIView):
    permission_classes = [InterviewAdminPermission]
    serializer_class = UserSerializer
    lookup_field = 'pk'

    def get_queryset(self):
        return CustomUser.objects.exclude(email=self.request.user)
