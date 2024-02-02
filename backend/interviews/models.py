from django.db import models

# Create your models here.


from django.db import models
from accounts.models import CustomUser


class Availability(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    interview_name = models.CharField(max_length=255)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return f"{self.candidate.email} - {self.interview_name} - {self.date} {self.start_time}-{self.end_time}"
