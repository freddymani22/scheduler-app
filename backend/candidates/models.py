from django.db import models
from django.utils import timezone
# Create your models here.

from accounts.models import CustomUser
from django.db.models.signals import post_save
from django.dispatch import receiver


class CandidateAvailability(models.Model):
    candidate = models.ForeignKey('Candidate', on_delete=models.CASCADE)
    interview_title = models.CharField(
        max_length=100, default='Available', blank=True)
    available_from = models.DateTimeField(default=timezone.now)
    available_to = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.candidate.user.email} {self.available_from}"


class Candidate(models.Model):
    user = models.OneToOneField(
        CustomUser, on_delete=models.CASCADE, primary_key=True)
    first_name = models.CharField(max_length=30, default='first-name')
    last_name = models.CharField(max_length=30, default='last-name')
    skills = models.TextField(null=True, blank=True)
    previous_company = models.CharField(max_length=200, null=True, blank=True)
    is_candidate = models.BooleanField(default=True)
    position = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):

        return f"{self.user.email}"


@receiver(post_save, sender=CustomUser)
def create_candidate(sender, instance, created, **kwargs):

    if created:
        print('check reciver')
        Candidate.objects.create(user=instance)
