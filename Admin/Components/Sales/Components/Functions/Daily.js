const handleCloseModalDetail = (setDetailData,setShowModalDetail) => {
    setDetailData('');
    setShowModalDetail(false);
}

const handleDetail = (item,setShowModalDetail,setDetailData) => {
    setShowModalDetail(true);
    setDetailData(item);
}

export {
    handleDetail,
    handleCloseModalDetail
}