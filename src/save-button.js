import React, { Component } from "react";
import "./save-button.css";
import { ExcelHandler, Order } from "./excel-handler";
export default class SaveButton extends Component {
  constructor(props) {
    super(props);
  }

  handleSave = () => {
    // console.log(this.props.orderInfo);
    // console.log(JSON.stringify(this.props.orderInfo));

    fetch("/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.props.orderInfo),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
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
