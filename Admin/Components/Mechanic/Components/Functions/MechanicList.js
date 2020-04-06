import axios from 'axios'

const handleShowModalDetail = (item,setShowModalDetail,setTemp_Detail) => {
    setShowModalDetail(true);
    setTemp_Detail(item);
}

const handleShowModalEdit = (
    item,
    setShowModalEdit,
    setTemp_Detail,
    setName,
    setAge,
    setReligion,
    setAddress,
    setDistricts,
    setPhone_Number
    ) => {
    setShowModalEdit(true);
    setTemp_Detail(item);
    setName(item.name);
    setAge(item.age);
    setReligion(item.religion);
    setAddress(item.address);
    setDistricts(item.districts);
    setPhone_Number(item.phone_number);
}

const handleUpdate = (
    temp_detail,
    name,
    age,
    religion,
    address,
    districts,
    phone_number,
    setShowModalEdit,
    setName,
    setAge,
    setReligion,
    setAddress,
    setDistricts,
    setPhone_Number
) => {
    const data = {
        name : name ? name : temp_detail.name,
        age : age ? parseInt(age) : parseInt(temp_detail.age),
        religion : religion ? religion : temp_detail.religion,
        address : address ? address : temp_detail.address,
        districts : districts ? districts : temp_detail.districts,
        phone_number : phone_number ? parseInt(phone_number) : temp_detail.phone_number
    }

    axios({
        method : 'PUT',
        url : `http://192.168.43.171:5000/employee/update_employee/${temp_detail._id}`,
        data : data
    })
    .then(response => {
        console.log(response.data)
        setShowModalEdit(false);
        setName('');
        setAge('');
        setReligion('');
        setAddress('');
        setDistricts('');
        setPhone_Number('');
    })
    .catch(error => {
        console.log(error)
    })
}

const handleDelete = (temp_detail,data,setData,setShowModalEdit) => {
    axios({
        method : 'DELETE',
        url : `http://192.168.43.171:5000/employee/delete_employee/${temp_detail._id}`
    })
    .then(response => {
        const filter = data.filter(list => list._id !== temp_detail._id);
        setData(filter);
        setShowModalEdit(false);
    })
    .catch(error => {
        console.log(error)
    })
}

export {
    handleShowModalDetail,
    handleShowModalEdit,
    handleUpdate,
    handleDelete
}