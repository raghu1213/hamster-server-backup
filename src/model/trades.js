export default class Trade{
    constructor() {
        this.TradeId = "";
        this.PortfolioId = "";
        this.ProductId = "";
        this.BuyPrice;
        this.CurrentPrice;
        this.Quantity = 0;
        this.InvestedValue = 0;
        this.CurrentValue = 0;
        this.TradeDate;
        this.ExpiryDate;
    }
}