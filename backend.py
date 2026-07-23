"""
BriceTech Backend API
Provides search and configuration endpoints
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Placeholder database - replace with actual database later
SEARCH_DATA = {
    # Example structure - populate with actual data
}

@app.route('/search', methods=['GET'])
def search():
    """
    Search endpoint that accepts a query parameter
    Returns placeholder results that can be populated later
    
    Query Parameters:
        query (str): Search query string
    
    Returns:
        JSON: {
            "success": bool,
            "query": str,
            "results": [
                {
                    "name": str,
                    "specs": {
                        "cpu": str,
                        "ram": str,
                        "storage": str,
                        "gpu": str,
                        "platform": str,
                        "os": str
                    }
                }
            ]
        }
    """
    try:
        query = request.args.get('query', '').strip()
        
        if not query:
            return jsonify({
                'success': False,
                'error': 'Query parameter is required',
                'results': []
            }), 400
        
        # Placeholder search logic - replace with actual search implementation
        results = perform_search(query)
        
        return jsonify({
            'success': True,
            'query': query,
            'results': results
        }), 200
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e),
            'results': []
        }), 500

@app.route('/search/filters', methods=['GET'])
def get_filters():
    """
    Get available filter options for dropdowns
    
    Returns:
        JSON: {
            "cpu": [],
            "ram": [],
            "storage": [],
            "gpu": [],
            "platform": [],
            "os": []
        }
    """
    try:
        filters = {
            'cpu': [],
            'ram': [],
            'storage': [],
            'gpu': [],
            'platform': [],
            'os': []
        }
        
        # Populate filters from database later
        return jsonify(filters), 200
    
    except Exception as e:
        return jsonify({
            'error': str(e)
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    """
    Health check endpoint
    
    Returns:
        JSON: {"status": "ok"}
    """
    return jsonify({'status': 'ok'}), 200

def perform_search(query):
    """
    Perform search operation on the query
    
    Args:
        query (str): Search query string
    
    Returns:
        list: List of matching results (currently returns empty placeholder)
    """
    # TODO: Implement actual search logic
    # - Query the database for matching systems
    # - Filter by CPU, RAM, storage, GPU, platform, OS
    # - Return matching results
    
    # Placeholder: return empty results
    return []

if __name__ == '__main__':
    app.run(debug=True, port=5000)