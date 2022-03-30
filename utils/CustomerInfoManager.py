from typing import Dict
import pandas as pd
class CustomerInfoManager:
  def __init__(self) -> None:

      self._customer_info_file = "customer_info.csv"
      self._customer_info = pd.read_csv(self._customer_info_file)


  def add_customer_info(self,customer_info:Dict[str,str]) -> None:
      phone = customer_info["phoneNumber"]
      valid_phone = self.convert_to_valid_phone(phone)
      customer_name = customer_info["customer"]
      new_info_df = pd.DataFrame(
        {"customer":customer_name, "phoneNumber":valid_phone}, 
        index=[0])
      self._customer_info = pd.concat(
        [self._customer_info, new_info_df], 
        axis =0, ignore_index=True)
      self.save()
    
      
      
  def save(self):
      self._customer_info.to_csv(self._customer_info_file, encoding='utf_8_sig', index=False)


  def convert_to_valid_phone(self,phone) -> str:
    inserted_position = [3, 6]
    phone_repr = ""
    for idx in range(len(phone)):
      if idx in inserted_position:
        phone_repr += f"{phone[idx]}-"
      else:
        phone_repr += phone[idx]
    return phone_repr

  
