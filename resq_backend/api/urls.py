from django.urls import path
from .views import (
    CreateUserView,
    DashboardView,
    HeatmapDataView,
    ContactList,
    ContactDetail,
    UserContactList,
    MessageListCreate,
    MeView,
    SOSCreateView,
)

urlpatterns = [
    path('register/', CreateUserView.as_view(), name='register'),
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    path('heatmap-data/', HeatmapDataView.as_view(), name='heatmap-data'),

    # Contacts
    path('contacts/', ContactList.as_view(), name='contacts'),          # list & add
    path('contacts/<int:pk>/', ContactDetail.as_view(), name='contact-detail'),  # delete individual

    # User-specific contacts
    path('user-contacts/', UserContactList.as_view(), name='user-contacts'),

    # Messages
    path('messages/', MessageListCreate.as_view(), name='messages'),

    # User info
    path('me/', MeView.as_view(), name='me'),

    # SOS
    path('sos/', SOSCreateView.as_view(), name='send-sos'),
]
