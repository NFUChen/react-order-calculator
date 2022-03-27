import React, { Component } from "react";
import "./save-button.css";
import { ExcelHandler, Order } from "./excel-handler";
export default class SaveButton extends Component {
  constructor(props) {
    super(props);
  }

  handleSave = () => {
    // const { orderInfo } = this.props;
    // console.log(orderInfo);
    // const excelHandler = new ExcelHandler("orders.xlsx");
    // console.log(excelHandler._origin);
    // const newOrder = new Order(orderInfo).getChineseOrderInfo();
    // console.log(newOrder);
    // excelHandler.append_and_save(newOrder);
    console.log(this.props.orderInfo);
  };

  render() {
    return (
      <div className="SaveButtonContainer">
        <button className="SaveButton" onClick={this.handleSave}>
          儲存
        </button>
      </div>
    );
  }
}
