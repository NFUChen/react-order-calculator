from typing import List
from ExcelHandler import ExcelHandler
from CustomerFilter import CustomerFilter
from flask import Flask, request
from flask_cors import CORS
# answer from https://stackoverflow.com/questions/65622053/how-to-send-a-post-request-to-flask-api-using-fetch-in-a-react-app
app = Flask(__name__)
CORS(app)


@app.route('/post', methods=['POST'])
def post() -> None:
   obj_from_react = request.json
   excel_handler = ExcelHandler()
   excel_handler.append_row(obj_from_react)
   print(excel_handler._origin)


   return request.args
@app.route("/customer", methods=["POST", "GET"])
def get_filtered_customers() -> List[str]:
    phone_number_from_react = request.json
    print(phone_number_from_react)
    customer_filter = CustomerFilter()
    valid_customers = customer_filter.filter(phone_number_from_react)
    print(valid_customers)
    

    return valid_customers


if __name__ == "__main__":
  app.run(debug=True)
  