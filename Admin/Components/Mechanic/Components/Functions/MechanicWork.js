import axios from 'axios'

const handleShowModalDetail = (item,setShow_Modal_Detail,setTemp_Data,setName,setDate) => {
    setShow_Modal_Detail(true);
    setTemp_Data(item.work_list);
    setName(item._id);
    setDate(item.date)
}

const handleComplete = (data,temp_data,name,date,setShow_Modal_Detail,setName,setData) => {
    let temp_total = [];
    temp_data.map((list,index) => {
        return temp_total.push(list.pay_mechanic)
    });
    var sum_total = temp_total.reduce(function(a, b){
        return a + b;
    }, 0);
    var net_profit = sum_total * 0.2;
    const data_income = {
        date : date.substring(0,10),
        code : "Potongan Mekanik " + name,
        list_income : temp_data,
        income : net_profit
    }

    axios({
        method : 'DELETE',
        url : `http://192.168.43.171:5000/employee_work/delete_mechanic/${name}`
    })
    .then(response => {
        const filter_data = data.filter(list => list._id !== name);
        setData(filter_data);
        setName('');

        axios({
            method : 'POST',
            url : 'http://192.168.43.171:5000/income/add_income',
            data : data_income
        })
        .then(response => {
            setShow_Modal_Detail(false);
        })
        .catch(error => {
            console.log(error)
        })
    })
    .catch(error => {
        console.log(error)
    })
}

export {
    handleShowModalDetail,
    handleComplete
}