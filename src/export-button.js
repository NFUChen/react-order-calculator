import React, { Component } from "react";
import "./button.css";


export default class ExportButton extends Component {
  constructor(props) {
    super(props);
  }
  handleExport = () => {
    

    fetch("/export", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({export:true}),
    })
      .then((response) => response.json())
      .then((data) => 
      console.log(data)
      ).catch(()=> 
      alert("訂單檔(orders.csv)尚未建立, 請先輸入一筆訂單資料, 如有訂單檔, 請確認伺服器狀態是否異常"))
  
  };
  
  render() {
    return (
      <div className="ButtonContainer">
        <button className="Button" onClick={this.handleExport}>
          輸出訂單
        </button>
      </div>
    );
  }
}
