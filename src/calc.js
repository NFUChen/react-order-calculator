import React, { Component } from "react";
import "./calc.css";
import SaveButton from "./save-button";

export default class Calc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateTime: "",
      customer: "",
      spec: "",
      quantity: 0,
      bucketReturned: 0,
      totalPrice: 0,
    };
  }

  get customer() {
    return (
      <div className="customer">
        <label htmlFor="customer" className="customer-title">
          客戶姓名:{" "}
        </label>
        <input
          type="text"
          placeholder="客戶姓名"
          id="customer"
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
      { value: "default", label: "請選擇規格" },
      { value: "脆皮", label: "脆皮豆腐" },
      { value: "傳統", label: "傳統豆腐" },
      { value: "串燒", label: "串燒豆腐" },
      { value: "大", label: "大規格豆腐" },
      { value: "特大", label: "特大規格豆腐" },
    ];
    return (
      <div className="spec">
        <label className="spec-title">規格: </label>
        <select onChange={this.handleChange} id="spec">
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

  render() {
    return (
      <div className="calc">
        <p className="title">訂單計算機</p>
        {this.dateTime}
        {this.customer}
        {this.spec}
        {this.quantity}
        {this.bucketReturned}
        {this.orderPriceComponenet}
        <SaveButton orderInfo={this.state} />
      </div>
    );
  }
}
