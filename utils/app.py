from typing import List
from ExcelHandler import ExcelHandler
from CustomerFilter import CustomerFilter
from CustomerInfoManager import CustomerInfoManager
from flask import Flask, request
from flask_cors import CORS
# answer from https://stackoverflow.com/questions/65622053/how-to-send-a-post-request-to-flask-api-using-fetch-in-a-react-app
app = Flask(__name__)
CORS(app)


@app.route('/save', methods=['POST'])
def save() -> None:
   obj_from_react = request.json
   excel_handler = ExcelHandler()
   excel_handler.append_row(obj_from_react)
   print(excel_handler._origin)


   return "Saving order successfully", 200

@app.route('/export', methods=['POST'])
def export_order_file() -> None:
   try:
     print(request.json)
     excel_handler = ExcelHandler()
     excel_handler.export_files_to_desktop()
     return request.args
   except ValueError:
     return "Order file is not yet created or Sever is Deak", 400
     

   

@app.route("/customer", methods=["POST", "GET"])
def get_filtered_customers() -> List[str]:
    phone_number_from_react = request.json
    print(phone_number_from_react)
    customer_filter = CustomerFilter()
    valid_customers = customer_filter.filter(phone_number_from_react)
    print(valid_customers)

    

    return {"customers": valid_customers}
#/add_customer_info

@app.route("/add_customer_info", methods=["POST"])
def add_customer_info() -> bool:
    customer_info = request.json
    manager = CustomerInfoManager()
    manager.add_customer_info(customer_info)
    


    return {"msg":"Customer info added"}

if __name__ == "__main__":
  app.run(debug=True)
  