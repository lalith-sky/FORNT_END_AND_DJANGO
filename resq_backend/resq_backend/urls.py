from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('admin/', admin.site.urls),

    # This connects to your api/urls.py for the /api/register/ endpoint
    path('api/', include('api.urls')),

    # This adds the /api/token/ endpoint for logging in
    path('api/token/', TokenObtainPairView.as_view(), name='get_token'),
]