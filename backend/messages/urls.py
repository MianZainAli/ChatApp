

from django.urls import path
from .views import MessageListView, SaveMessageView


urlpatterns = [
    path('<int:user_id>/',  MessageListView.as_view(), name='message-list'),
    path('save/', SaveMessageView.as_view(), name='saveMessage'),
]
