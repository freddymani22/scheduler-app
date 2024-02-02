from rest_framework import serializers
from .models import Candidate, CandidateAvailability


class CandidateAvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = CandidateAvailability
        fields = '__all__'


class CandidateSerializer(serializers.ModelSerializer):
    availabilities = CandidateAvailabilitySerializer(many=True, read_only=True)

    class Meta:
        model = Candidate
        fields = ['first_name',
                  'last_name', 'skills', 'availabilities']

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
