from rest_framework import serializers
from .models import Candidate, CandidateAvailability


class CandidateAvailabilitySerializer(serializers.ModelSerializer):

    title = serializers.CharField(source='interview_title', required=False)
    start = serializers.DateTimeField(source='available_from')
    end = serializers.DateTimeField(source='available_to')

    class Meta:
        model = CandidateAvailability
        fields = ['title', 'start', 'end']

    def create(self, validated_data):

        candidate_instance = Candidate.objects.get(
            user__email=self.context['request'].user)

        validated_data['candidate'] = candidate_instance

        candidate_availability = CandidateAvailability.objects.create(
            **validated_data)

        return candidate_availability


class CandidateSerializer(serializers.ModelSerializer):
    # availabilities = CandidateAvailabilitySerializer(many=True, read_only=True)
    is_interview_admin = serializers.ReadOnlyField(
        source='user.is_interview_admin')

    class Meta:
        model = Candidate
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
        candidate = Candidate.objects.create(**validated_data)

        return candidate
