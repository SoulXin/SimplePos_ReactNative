function date(date_order){
    var text_month = ["Januari","Februari","Maret","April","Mei","Juni","July","Agustust","September","Oktober","November","Desember"];
    let day = date_order.slice(8,10);
    let month = date_order.slice(5,7);
    month = month.replace( /0/g, "");
    let year = date_order.slice(0,4);
    let monthNow = text_month[month - 1];

    return day + " " + monthNow + " " + year
}

function formatMoney(amount, thousands = ".") {
    try {
      const negativeSign = amount < 0 ? "-" : "";
      let i = parseInt(amount = Math.abs(Number(amount) || 0)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;
  
      return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + "";
    } catch (e) {
      console.log(e)
    }
};

export {
    date,
    formatMoney
}