import Button from 'react-bootstrap/Button';
import DataTable from "../../../components/Table";

function FieldList() {
  return (
    <div>
      <div className="d-flex justify-content-end">
        <Button variant="primary">Thêm sân</Button>
      </div>
      <div>
        <DataTable />
      </div>
    </div>
  );
}

export default FieldList;
