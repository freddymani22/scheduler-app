from django.contrib import admin

# Register your models here.


from .models import Candidate, CandidateAvailability


admin.site.register(Candidate)
admin.site.register(CandidateAvailability)
