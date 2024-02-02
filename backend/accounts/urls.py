# urls.py
from django.urls import path
from .views import login_view, generate_otp_view

urlpatterns = [
    path('login/', login_view, name='login'),
    path('generate-otp/', generate_otp_view, name='generate_otp'),

]
