from django.shortcuts import render
from django.contrib.auth import logout

# Create your views here.

from django.contrib.auth import authenticate, login
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser


import random
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status


from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

CustomUser = get_user_model()


@api_view(["POST"])
def generate_otp_view(request):
    data = request.data
    email = data.get('email')

    if not email:
        return Response({'detail': 'Please provide an email'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = CustomUser.objects.get(email=email)
    except CustomUser.DoesNotExist:
        return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    # Generate a new OTP
    otp = str(random.randint(1000, 9999))

    user.otp = otp
    user.save()
# send mail
    send_mail(
        'Your OTP for SCHEDULER-APP authentication',
        f'Your OTP is: {otp}',
        'SCHEDULER-APP',
        [user.email],
        fail_silently=False,
    )

    return Response({'detail': 'OTP generated and sent successfully'}, status=status.HTTP_200_OK)


@api_view(["POST"])
def login_view(request):
    if request.method == 'POST':
        data = request.data
        email = data.get('email')
        otp = data.get('otp')

        if email is None or otp is None:
            return Response({'detail': 'Please provide email and OTP'}, status=status.HTTP_400_BAD_REQUEST)

        user = CustomUser.objects.get(email=email)

        # Verify the OTP
        if user.verify_otp(otp):
            # Log in the user
            user.backend = 'django.contrib.auth.backends.ModelBackend'
            login(request, user)

            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            is_interview_admin = user.is_interview_admin

            return Response({'access_token': access_token, 'detail': 'Successfully logged in', 'is_interview_admin': is_interview_admin})
        else:
            return Response({'detail': 'Invalid email or OTP'}, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'GET':
        return Response({'message': 'This is a GET request'})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return Response({'detail': 'Successfully logged out'}, status=status.HTTP_200_OK)
    else:
        return Response({'detail': 'Invalid method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
