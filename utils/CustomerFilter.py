from typing import List, Tuple, Dict
import pandas as pd
class CustomerFilter:
    def __init__(self) -> None:
        self._customer_info = pd.read_csv("customer_info.csv", encoding="utf-8")
        self.preprocess()

    def preprocess(self):
        self._customer_info["phoneNumber"]  = self._customer_info["phoneNumber"].str.replace("-", "")

    
    @property
    def customer_info(self) -> List[Tuple[str, str]]:
        customers = []
        customer_id_list = list(self._customer_info["customer"])
        phone_number_list = list(self._customer_info["phoneNumber"])
        for customer, phone_number in zip(customer_id_list, phone_number_list):
            customers.append([customer, phone_number])



        return customers


    def filter(self, input_phone_number:str) -> List[str]:
        valid_customers = []
        for idx in range(len(self.customer_info)):
            customer_id, current_phone_number = self.customer_info[idx]
            if (current_phone_number[-len(input_phone_number):]) == input_phone_number:
                valid_customers.append(customer_id)
        valid_customers = list(set(valid_customers))

        return valid_customers

