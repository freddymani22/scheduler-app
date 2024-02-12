

from rest_framework import serializers
from candidates.models import UserAvailability
from accounts.models import CustomUser


class UserAvailabilitySerializer(serializers.ModelSerializer):
    title = serializers.CharField(source='interview_title', required=False)
    start = serializers.DateTimeField(source='available_from')
    end = serializers.DateTimeField(source='available_to')
    candidate = serializers.SerializerMethodField()

    class Meta:
        model = UserAvailability
        fields = ['id', 'candidate', 'title',
                  'start', 'end']

    def get_candidate(self, obj):
        return obj.candidate.user.email


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'user_type']


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ['email', 'id']
