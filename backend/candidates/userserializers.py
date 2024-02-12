from rest_framework import serializers
from .models import UserProfile, UserAvailability
from accounts.models import CustomUser


class UserAvailabilitySerializer(serializers.ModelSerializer):

    title = serializers.CharField(source='interview_title', required=False)
    start = serializers.DateTimeField(source='available_from')
    end = serializers.DateTimeField(source='available_to')

    class Meta:
        model = UserAvailability
        fields = ['title', 'start', 'end']

    def create(self, validated_data):

        candidate_instance = UserProfile.objects.get(
            user__email=self.context['request'].user)

        validated_data['candidate'] = candidate_instance

        candidate_availability = UserAvailability.objects.create(
            **validated_data)

        return candidate_availability


class UserProfileSerializer(serializers.ModelSerializer):
    # availabilities = CandidateAvailabilitySerializer(many=True, read_only=True)
    is_interview_admin = serializers.ReadOnlyField(
        source='user.is_interview_admin')

    class Meta:
        model = UserProfile
        fields = ['first_name',
                  'last_name', 'skills', 'is_interview_admin', 'previous_company', 'is_candidate', 'position']

    def create(self, validated_data):
        # Automatically set the 'user' field to the authenticated user

        validated_data['user'] = self.context['request'].user

        # Check if the user type is 'candidate'
        if validated_data['user'].user_type != 'candidate':
            raise serializers.ValidationError(
                "User must have user_type 'candidate' to create a candidate.")

        # Create Candidate instance
        candidate = UserProfile.objects.create(**validated_data)

        return candidate
