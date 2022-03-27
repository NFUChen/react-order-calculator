const xlsx = require("xlsx");
export class ExcelHandler {
  constructor(fileName) {
    this.fileName = fileName;
    this._work_book = xlsx.readFile(fileName, { cellDates: true });
    this._sheet = this._work_book.Sheets["orders"];
    this._origin = xlsx.utils.sheet_to_json(this._sheet);
  }
  append_and_save(newOrderInfo) {
    xlsx.utils.sheet_add_json(this._sheet, [newOrderInfo], {
      skipHeader: true,
      origin: -1,
    });

    const newUpdatedSheet = this._sheet;
    const newBlankWB = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(newBlankWB, newUpdatedSheet, "orders", {
      origin: -1,
    });
    xlsx.writeFile(newBlankWB, this.fileName);
  }
}

export class Order {
  constructor({
    dataTime,
    customer,
    spec,
    quantity,
    bucketReturned,
    totalPrice,
  }) {
    this.dataTime = dataTime;
    this.customer = customer;
    this.spec = spec;
    this.quantity = quantity;
    this.bucketReturned = bucketReturned;
    this.totalPrice = totalPrice;
  }
  getChineseOrderInfo = () => {
    return {
      日期: this.dataTime,
      客戶姓名: this.customer,
      規格: this.spec,
      購買數量: this.quantity,
      退桶數量: this.bucketReturned,
      總售價: this.totalPrice,
    };
  };
}
