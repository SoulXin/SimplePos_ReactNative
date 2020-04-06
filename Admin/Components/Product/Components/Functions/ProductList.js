const handleSearch = (text,fullData,setData) => {
    const formattedQuery = text.toLowerCase();
    const data = fullData.filter(list => {
        if(list.product_name.toLowerCase().includes(formattedQuery)){
            return true
        }
        return false
    })
    setData(data)
}

export {
    handleSearch
}