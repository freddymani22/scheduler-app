

from .admin_serializers import CandidateAvailabilitySerializer
from candidates.models import CandidateAvailability
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status


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

    # Extract candidate emails and user emails
    candidate_emails = list(candidate_availability_objects.values_list(
        'candidate__user__email', flat=True))
    user_emails = list(candidate_availability_objects.values_list(
        'candidate__user', flat=True))

    # Include current user and user's email in the response
    current_user_email = request.user.email if request.user.is_authenticated else None

    candidates_info = [{'id': candidate.id, 'email': candidate.candidate.user.email}
                       for candidate in candidate_availability_objects]

    return Response({'candidates': candidates_info})
