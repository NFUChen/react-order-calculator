import React, { Component } from "react";
import "../button.css";
export default class SaveButton extends Component {
  constructor(props) {
    super(props);
  }

  handleSave = () => {
    if (!this.props.orderInfo.totalPrice) {
      alert("輸入錯誤請重新輸入");
      return;
    }

    fetch("/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.props.orderInfo),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    this.props.resetOrderInfo();
  };

  render() {
    return (
      <div className="ButtonContainer">
        <button className="Button" onClick={this.handleSave}>
          結帳
        </button>
      </div>
    );
  }
}
