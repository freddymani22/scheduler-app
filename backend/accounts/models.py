from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone
import random


class CustomUserManager(BaseUserManager):
    def create_user(self, email, user_type=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, user_type=user_type, **extra_fields)
        user.otp = self.generate_otp()
        user.save(using=self._db)
        return user

    def create_superuser(self, email, user_type=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, user_type=user_type, **extra_fields)

    def generate_otp(self):

        return str(random.randint(1000, 9999))


class CustomUser(AbstractBaseUser, PermissionsMixin):
    USER_TYPES = (
        ('candidate', 'Candidate'),
        ('interviewer', 'Interviewer'),
        ('', 'Empty'),
    )

    email = models.EmailField(unique=True)
    otp = models.CharField(max_length=6, null=True, blank=True)
    user_type = models.CharField(
        max_length=20, choices=USER_TYPES, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_interview_admin = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'

    def generate_otp(self):
        return ''.join([str(random.randint(0, 9)) for _ in range(4)])

    def verify_otp(self, provided_otp):

        return self.otp == provided_otp

    def save(self, *args, **kwargs):
        if not self.otp:
            self.otp = self.generate_otp()
        super().save(*args, **kwargs)
