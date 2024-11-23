from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import AsyncOpenAI
import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)
client = OpenAI(
    api_key= os.getenv("OPENAI_API_KEY")
)
print(os.getenv("OPENAI_API_KEY"))


@app.route('/generate-plan', methods=['POST'])
def generate_plan():
    data = request.json
    destination = data.get('destination')
    interests = data.get('interests')
    favorite_food = data.get('favorite_food')

    # Query ChatGPT API
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        
        messages=[
            {
                "role": "user",
                "content": f"Plan a travel itinerary for someone in {destination} who loves {interests} and enjoys eating {favorite_food}.",
            }
        ],
    )
        
    print("Request sent. ")
    return jsonify({'plan': str(response.choices[0].message.content).strip()})

if __name__ == '__main__':
    app.run(debug=True)