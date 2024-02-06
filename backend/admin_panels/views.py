from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status

from .admin_serializers import CandidateAvailabilitySerializer, CreateUserSerializer
from candidates.models import CandidateAvailability
from candidates.CandidateSerializers import CandidateSerializer


class InterviewAdminPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return user.is_authenticated and user.is_interview_admin


class CandidateAvailabilityListView(generics.ListAPIView):
    serializer_class = CandidateAvailabilitySerializer
    permission_classes = [InterviewAdminPermission]

    def get_queryset(self):
        return CandidateAvailability.objects.all()

    def list(self, request, *args, **kwargs):
        try:
            self.check_permissions(request)
        except PermissionDenied:
            return Response({'detail': 'You are not authorized to access this resource.'}, status=403)

        return super().list(request, *args, **kwargs)


@api_view(['POST'])
@permission_classes([InterviewAdminPermission])
def filter_candidates_by_availability(request):
    # Your existing view logic here
    date_str = request.data.get('date')
    available_from_str = request.data.get('available_from')
    available_to_str = request.data.get('available_to')

    # Ensure all required data is provided
    if not (date_str and available_from_str and available_to_str):
        return Response({'error': 'Incomplete data provided'}, status=status.HTTP_400_BAD_REQUEST)

    # Parse date and time strings to create datetime objects
    from datetime import datetime, time
    date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()
    available_from_obj = datetime.strptime(available_from_str, '%H:%M').time()
    available_to_obj = datetime.strptime(available_to_str, '%H:%M').time()

    # Combine date and time to create datetime objects
    available_from_datetime = datetime.combine(date_obj, available_from_obj)
    available_to_datetime = datetime.combine(date_obj, available_to_obj)

    # Filter candidates based on the provided time frame
    candidate_availability_objects = CandidateAvailability.objects.filter(
        available_from__lte=available_from_datetime,
        available_to__gte=available_to_datetime
    )

    candidates = []
    interviewers = []

    for candidate_availability in candidate_availability_objects:
        user_email = candidate_availability.candidate.user.email
        user_type = candidate_availability.candidate.user.user_type

    # Check user type and organize accordingly
        if user_type == 'candidate':
            candidates.append(
                {'id': candidate_availability.id, 'email': user_email})
        elif user_type == 'interviewer':
            interviewers.append(
                {'id': candidate_availability.id, 'email': user_email})

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
    print(candidate_availability_id_candidate,
          candidate_availability_id_interviewer, interview_title)

    # Check if all required data is provided
    if not (candidate_availability_id_candidate and candidate_availability_id_interviewer and interview_title):
        return Response({'error': 'Incomplete data provided'}, status=status.HTTP_400_BAD_REQUEST)

    # Get the CandidateAvailability instances
    candidate_availability_candidate = get_object_or_404(
        CandidateAvailability, pk=candidate_availability_id_candidate, candidate__user__user_type='candidate')
    candidate_availability_interviewer = get_object_or_404(
        CandidateAvailability, pk=candidate_availability_id_interviewer, candidate__user__user_type='interviewer')

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
