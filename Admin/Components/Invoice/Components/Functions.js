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

/* Fungsi formatRupiah */
const formatRupiah = (angka, prefix, set) => {
  var separator = '';
  var number_string = angka.replace(/[^,\d]/g, '').toString(),
  split   		= number_string.split(','),
  sisa     		= split[0].length % 3,
  rupiah     		= split[0].substr(0, sisa),
  ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);

  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if(ribuan){
      separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
  }
  rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
  set(prefix === undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : ''));
}

const removeFormatMoney = (money) =>{
  var temp_money = money;
  temp_money = temp_money.replace( /[Rp .]/g, "" );
  return parseInt(temp_money);
}


export {
    formatMoney,
    formatRupiah,
    removeFormatMoney
}