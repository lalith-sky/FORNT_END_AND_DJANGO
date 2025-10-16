from django.contrib import admin
from .models import SOSReport, LocationShare, Alert, Contact,HeatmapPoint

admin.site.register(SOSReport)
admin.site.register(LocationShare)
admin.site.register(Alert)
admin.site.register(Contact)
admin.site.register(HeatmapPoint)