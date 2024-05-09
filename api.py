from flask_cors import CORS
from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)
CORS(app)

# Load the saved model
with open('pipeline_rf.pkl', 'rb') as f:
    pipeline_rf = pickle.load(f)

# Define the class labels
class_label = {1: "Normal baby", 2: "Suspect baby", 3: "Pathological baby"}

# Define a route for prediction
@app.route('/predict', methods=['POST'])
def predict():
    # Get data from the request
    data = request.get_json()
    input_values = data['input']

    # Convert the dictionary into a list
    X_me = list(input_values.values())

    # Make predictions using the loaded model
    predicted_labels = pipeline_rf.predict([X_me])
    
    # Convert predicted labels to human-readable format
    decoded_labels = [class_label[label] for label in predicted_labels]
    
    # Return the predicted labels
    return jsonify({'predicted_labels': decoded_labels})

if __name__ == '__main__':
    app.run(debug=True)

