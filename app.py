from ExcelHandler import ExcelHandler
from flask import Flask, request
from flask_cors import CORS
# answer from https://stackoverflow.com/questions/65622053/how-to-send-a-post-request-to-flask-api-using-fetch-in-a-react-app
app = Flask(__name__)
CORS(app)
@app.route('/post', methods=['POST'])
def post():
   data_from_react = request.json
   excel_handler = ExcelHandler()
   excel_handler.append_row(data_from_react)
   
   print(excel_handler._origin)


   return request.args


if __name__ == "__main__":
  app.run(debug=True)