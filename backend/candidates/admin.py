from django.contrib import admin

# Register your models here.


from .models import UserProfile, UserAvailability


admin.site.register(UserProfile)
admin.site.register(UserAvailability)
