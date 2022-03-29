import React, { Component } from "react";
import "./save-button.css";
export default class SaveButton extends Component {
  constructor(props) {
    super(props);
  }

  handleSave = () => {
    // console.log(this.props.orderInfo);
    // console.log(JSON.stringify(this.props.orderInfo));
    if (!this.props.orderInfo.totalPrice) {
      alert("輸入錯誤請重新輸入")
      return;
    }

    fetch("/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.props.orderInfo),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
    this.props.resetOrderInfo()
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
