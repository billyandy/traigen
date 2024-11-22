import openai
import os

# # Set your OpenAI API key
# openai.api_key = "sk-svcacct-DKbBVJzGBrr-rmp3MLgIa_Oul-6ixQlBuh-qqGn5J-1Ylin69NpfIwvAaTXd84FT3BlbkFJR6yQWgTO8tYAQvGyudrcD4xrKi7Yz8Uz89yA_AuJMaz3JAbeTsFQWI1hloJd2AA"

# Alternatively, use an environment variable:
# os.environ["OPENAI_API_KEY"] = "your-api-key"
# openai.api_key = os.getenv("OPENAI_API_KEY")

# Create a chat completion using GPT-3.5

import os
import asyncio
from openai import AsyncOpenAI

from dotenv import load_dotenv

load_dotenv()


client = AsyncOpenAI(
    api_key= os.getenv("OPENAI_API_KEY")
)


async def main() -> None:

    chat_completion = await client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": "Say this is a test",
            }
        ],
        model="gpt-3.5-turbo",
    )
    response_message = chat_completion.choices[0].message.content
    print(response_message)

        
    


asyncio.run(main())