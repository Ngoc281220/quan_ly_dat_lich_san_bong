export default function ManagementBookingField() {
  return (
    <>
      <div className="data-table-container">
        <h2>Danh sách sân</h2>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Tên sân</th>
                <th>Loại sân</th>
                <th>Gía thuê</th>
                <th>Mở sân</th>
                <th>Đóng sân</th>
                <th>Trạng thái</th>
                <th>Hạnh động</th>
              </tr>
            </thead>
            
          </table>
        </div>
        {/* <Pagination pagination={pagination} onPageChange={setCurrentPage} /> */}
      </div>
    </>
  );
}
