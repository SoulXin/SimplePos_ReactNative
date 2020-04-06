const handleOpen_Modal_Product = (item,setShow_Modal_Product,setTemp_Detail) => {
    setShow_Modal_Product(true);
    setTemp_Detail(item);
}

const handleClose_Modal_Product = (setShow_Modal_Product,setTemp_Detail) => {
    setShow_Modal_Product(false);
    setTemp_Detail('');
}

const handleOpen_Modal_Mechanic = (item,setShow_Modal_Mechanic,setTemp_Detail) => {
    setShow_Modal_Mechanic(true);
    setTemp_Detail(item);
}

const handleClose_Modal_Mechanic = (setShow_Modal_Mechanic,setTemp_Detail) => {
    setShow_Modal_Mechanic(false);
    setTemp_Detail('');
}

export {
    handleOpen_Modal_Product,
    handleClose_Modal_Product,
    handleOpen_Modal_Mechanic,
    handleClose_Modal_Mechanic
}