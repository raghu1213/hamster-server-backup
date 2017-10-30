export default class EodData{
    constructor(date,open,high,low,close,volume,divident,split) {
        this.Date=date;
        this.Open=open;
        this.High=high;
        this.Low= low;
        this.Close =close;
        this.Volume= volume;
        this.Divident = divident;
        this.Split =split;
   }
}