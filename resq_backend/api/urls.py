from django.urls import path
from .views import CreateUserView, DashboardView, HeatmapDataView,ContactList, UserContactList, MessageListCreate,MeView

urlpatterns = [
    path('register/', CreateUserView.as_view(), name='register'),
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    path('heatmap-data/', HeatmapDataView.as_view(), name='heatmap-data'),
    path('contacts/', ContactList.as_view(), name='contacts'),
    path('user-contacts/', UserContactList.as_view(), name='user-contacts'),
    path('messages/', MessageListCreate.as_view(), name='messages'),
    path('me/', MeView.as_view(), name='me'),
]
