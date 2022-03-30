from typing import Dict
import pandas as pd
import os
import shutil
class ExcelHandler:
  def __init__(self) -> None:
      if self._is_order_file_exist():
        self._origin = pd.read_csv("orders.csv")

  def append_row(self, data_appended: Dict[str, str]) -> None:
      new_data = pd.DataFrame(data_appended, index=[0])
      if not self._is_order_file_exist():
        #create a new file based on this newly created dataframe
        new_data.to_csv("orders.csv", index = False, encoding='utf_8_sig')
      else:
        #concat orders file with data to be appended and save it
        updated_data = pd.concat([self._origin, new_data], axis=0, ignore_index= True)
        updated_data.to_csv("orders.csv", index= False, encoding='utf_8_sig')
  def _is_order_file_exist(self) -> bool:
	  return 'orders.csv' in os.listdir()
  
  def export_files_to_desktop(self) -> None:
    if not self._is_order_file_exist():
      raise ValueError("Order files is not yet created")

    desktop_path = os.path.expanduser("~/Desktop")
    shutil.copy("./orders.csv", desktop_path)