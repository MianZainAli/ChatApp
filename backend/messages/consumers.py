import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        try:
            print("Attempting to connect...")
            self.user = self.scope['user']
            self.room_name = self.scope['url_route']['kwargs']['room_name']
            self.room_group_name = f'chat_{self.room_name}'


            print(f"Connecting to {self.room_group_name}")
            
            # Join room group
            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )

            await self.accept()
        except Exception as e:
            print(f"Error during connection: {e}")
            await self.close(code=1011)

    async def disconnect(self, close_code):
        print(f"Disconnected with close code {close_code}")
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        try:
            text_data_json = json.loads(text_data)
            
            message = text_data_json.get('content')  # Look for 'content'
            receiver = text_data_json.get('receiver')  # Look for 'receiver'

            if message and receiver:
                # Continue processing if both message and receiver are present
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        'type': 'chat_message',
                        'message': message,
                        'receiver': receiver,
                        'sender': self.scope['user'].username  # Example, based on your auth setup
                    }
                )
            else:
                print("Either 'content' or 'receiver' is missing in the received data.")

        except json.JSONDecodeError as e:
            print(f"JSON Decode Error: {e}")
        except Exception as e:
            print(f"Error: {e}")


    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            'content': event['message'],
            'sender': event['sender'],
            'receiver': event['receiver']
        }))
