from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import MessageSerializer
from .models import Message

class MessageListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id, *args, **kwargs):
        messages = Message.objects.filter(
            (Q(sender=request.user) & Q(receiver_id=user_id)) |
            (Q(sender_id=user_id) & Q(receiver=request.user))
        ).order_by('timestamp')
        
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)
