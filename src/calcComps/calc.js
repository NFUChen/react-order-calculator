import React, { Component } from "react";
import "./calc.css";
import SaveButton from "./save-button";
import ExportButton from "./export-button";

export default class Calc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateTime: "",
      customer: "",
      phoneNumber: "",
      spec: "",
      quantity: 0,
      bucketReturned: 0,
      totalPrice: 0,
    };
  }
  get multipleCustomer() {
    if (!this.state.phoneNumber) {
      return;
    }
    const customersArray = [
      "請輸入客戶名稱",
      ...Array.from(this.state.customer),
    ];
    if (customersArray.length < 2) {
      return;
    }
    if (this.state.customer.constructor instanceof String) {
      return;
    }

    return (
      <div className="mutiple-customer">
        <label htmlFor="customer">客戶姓名:</label>
        <select id="customer" onChange={this.handleSelect}>
          {customersArray.map((option) => (
            <option key={option} value={option} label={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }
  handleSelect = (evt) => {
    this.handleChange(evt);
    this.setState({
      phoneNumber: "",
    });
  };

  get oneCustomer() {
    if (!this.state.customer === String) {
      return;
    }
    return (
      <div className="customer">
        <label htmlFor="customer" className="customer-title">
          客戶姓名:
        </label>
        <input
          type="text"
          placeholder="客戶姓名"
          id="customer"
          value={this.state.customer}
          onChange={this.handleChange}
        />
      </div>
    );
  }
  get currentTime() {
    const today = new Date();
    const date = [
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate(),
    ].join("/");
    const time = [
      String(today.getHours()).padStart(2, "0"),
      String(today.getMinutes()).padStart(2, "0"),
      String(today.getSeconds()).padStart(2, "0"),
    ].join(":");
    return [date, time].join(" ");
  }

  get dateTime() {
    return (
      <div className="date">
        <span className="date-title">日期: </span>
        {this.currentTime}
      </div>
    );
  }

  get spec() {
    const options = [
      { value: "", label: "請選擇規格" },
      { value: "脆皮", label: "脆皮豆腐" },
      { value: "傳統", label: "傳統豆腐" },
      { value: "串燒", label: "串燒豆腐" },
      { value: "大", label: "大規格豆腐" },
      { value: "特大", label: "特大規格豆腐" },
    ];
    return (
      <div className="spec">
        <label className="spec-title">規格: </label>
        <select onChange={this.handleChange} id="spec" value={this.state.spec}>
          {options.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
  get quantity() {
    return this.generateNumberInputFiled("購買數量", "quantity");
  }

  get bucketReturned() {
    return this.generateNumberInputFiled("退桶數量", "bucketReturned");
  }
  generateNumberInputFiled(label, fieldName) {
    return (
      <div className={fieldName}>
        <label htmlFor={fieldName} className={`${fieldName}-title`}>
          {label}:{" "}
        </label>
        <input
          className={`input-${fieldName}`}
          type="number"
          id={fieldName}
          onChange={this.handleChange}
          placeholder={`請輸入${label}`}
          value={this.state[fieldName]}
        />
      </div>
    );
  }
  get orderPrice() {
    const itemPriceLookup = {
      脆皮: 780,
      傳統: 840,
      串燒: 830,
      大: 770,
      特大: 770,
    };
    const { spec, quantity, bucketReturned } = this.state;
    let totalPrice = itemPriceLookup[spec] * +quantity - +bucketReturned * 100;
    if (Number.isNaN(totalPrice)) {
      totalPrice = 0;
    }
    return totalPrice;
  }

  get orderPriceComponenet() {
    const totalPrice = this.orderPrice;
    return (
      <div>
        <span className={"purchasePrice-title"}>總售價: </span>
        {totalPrice !== 0 ? totalPrice : null}
      </div>
    );
  }

  get phoneNumber() {
    return (
      <div>
        <label htmlFor="phoneNumber" className="phoneNumber-title">
          電話查詢:{" "}
        </label>
        <input
          type="text"
          placeholder="請輸入電話末3-5碼"
          id="phoneNumber"
          onChange={this.handPhoneNumberInput}
          value={this.state.phoneNumber}
        />
      </div>
    );
  }
  handPhoneNumberInput = (evt) => {
    if (this.state.customer) {
      return;
    }
    this.handleChange(evt);
    this.fetchCustomersID(evt.target.value);
  };
  fetchCustomersID = (phoneNumber) => {
    if (phoneNumber.length < 3) {
      return;
    }

    fetch("/customer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(phoneNumber),
    })
      .then((response) => response.json())
      .then((data) => {
        const { customers } = data;
        if (customers.length > 0) {
          this.setState({ customer: customers });
        }
      });
  };

  handleChange = (evt) => {
    const currentTargetValue = evt.target.value;
    if (currentTargetValue < 0) {
      return;
    }
    this.setState({
      [evt.target.id]: currentTargetValue,
    });
  };

  componentDidMount = () => {
    setInterval(() => {
      this.setState((prevState) => ({
        dateTime: this.currentTime,
        totalPrice: this.orderPrice,
      }));
    }, 1000);
  };
  resetOrderInfo = () => {
    this.setState({
      dateTime: "",
      customer: "",
      phoneNumber: "",
      spec: "",
      quantity: "",
      bucketReturned: "",
      totalPrice: "",
    });
  };

  render() {
    console.log(this.state);

    return (
      <div className="calc">
        <p className="title">訂單計算機</p>
        {this.dateTime}
        {this.multipleCustomer ? this.multipleCustomer : this.oneCustomer}
        {this.phoneNumber}
        {this.spec}
        {this.quantity}
        {this.bucketReturned}
        {this.orderPriceComponenet}

        <SaveButton
          orderInfo={this.state}
          resetOrderInfo={this.resetOrderInfo}
        />
        {/* <ExportButton/> */}
      </div>
    );
  }
}
