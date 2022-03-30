import React, { Component } from "react";
import "../button.css";
import "./customer-manager.css";
function isValidPhoneNumber(phone) {
  if (phone.length !== 10) {
    alert("電話應為十碼數字");
    return;
  }

  for (const digit of phone) {
    if (isNaN(Number(digit))) {
      alert("電話應全部都為數字");
      return;
    }
  }
  return true;
}

export default class CustomerManager extends Component {
  constructor(props) {
    super(props);
    this.state = { customer: "", phoneNumber: "" };
    this.fieldNameMap = {
      customer: "客戶姓名",
      phoneNumber: "客戶電話",
    };
  }

  get customerInputField() {
    return this.generateTextInputField("customer");
  }
  get phoneNumberInputField() {
    return this.generateTextInputField("phoneNumber");
  }

  resetCustomerInfo() {
    this.setState({
      customer: "",
      phoneNumber: "",
    });
  }

  generateTextInputField(fieldName) {
    return (
      <div>
        <label className={`${fieldName}-title`} htmlFor={fieldName}>
          {`${this.fieldNameMap[fieldName]}: `}
        </label>
        <input
          className={`${fieldName}-input`}
          type="text"
          value={this.state[fieldName]}
          onChange={this.handleChange}
          id={fieldName}
        />
      </div>
    );
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.id]: evt.target.value,
    });
  };
  handleSubmit = (evt) => {
    evt.preventDefault();
    const { customer, phoneNumber } = this.state;
    if (!(customer && phoneNumber)) {
      alert("輸入錯誤請重新輸入");
      return;
    }
    if (!isValidPhoneNumber(this.state.phoneNumber)) {
      return;
    }

    fetch("/add_customer_info", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    this.resetCustomerInfo();
  };

  render() {
    console.log(this.state);
    return (
      <form onSubmit={this.handleSubmit} className="customer-info-form">
        <p className="title">客戶資料新增</p>
        {this.customerInputField}
        {this.phoneNumberInputField}
        <div className="ButtonContainer">
          <button className="Button">儲存客戶資料</button>
        </div>
      </form>
    );
  }
}
