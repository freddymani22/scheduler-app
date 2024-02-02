from django.db import models

# Create your models here.

from accounts.models import CustomUser


class CandidateAvailability(models.Model):
    candidate = models.ForeignKey('Candidate', on_delete=models.CASCADE)
    date_time = models.DateTimeField()

    def __str__(self):
        return f"{self.candidate.first_name} {self.date_time}"


class Candidate(models.Model):
    user = models.OneToOneField(
        CustomUser, on_delete=models.CASCADE, primary_key=True)
    first_name = models.CharField(max_length=30, default='first-name')
    last_name = models.CharField(max_length=30, default='last-name')
    skills = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
