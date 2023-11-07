import React from "react";
import HeaderDashBoard from "../../components/Dashboard/HeaderDashBoard";
import TableDashBoard from "../../components/Dashboard/TableDashBoard";
import PaginationDashBoard from "../../components/Dashboard/PaginationDashBoard";
import AddModal from "../../components/Dashboard/AddModal";
import EditModal from "../../components/Dashboard/EditModal";
import ViewModal from "../../components/Dashboard/ViewModal";
import DeleteModal from "../../components/Dashboard/DeleteModal";

export default function Dashboard({
  title,
  tableData,
  itemData,
  tableQueryData,
  tableHeaders,
  addMethod,
  editMethod,
  deleteMethod,
  showSearchBar,
  showPagination,
  showFilter,
  tableFilters,
  id,
  setId,
}) {
  return (
    <div className="h-full overflow-hidden">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6 h-full overflow-hidden pb-12 ">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-xl overflow-hidden h-full">
          <HeaderDashBoard
            title={title}
            showSearchBar={showSearchBar}
            showFilter={showFilter}
            tableFilters={tableFilters}
          />
          <TableDashBoard
            tableData={tableData}
            tableQueryData={tableQueryData}
            tableHeaders={tableHeaders}
            setId={setId}
          />
          {showPagination && (
            <PaginationDashBoard
              total={tableData?.users ? tableData.users.length : 0}
            />
          )}
        </div>
      </div>
      <AddModal
        title={title}
        tableHeaders={tableHeaders}
        tableQueryData={tableQueryData}
        addMethod={addMethod}
      />
      <EditModal
        title={title}
        tableHeaders={tableHeaders}
        tableQueryData={tableQueryData}
        addMethod={addMethod}
        editMethod={editMethod}
        id={id}
        deleteMethod={deleteMethod}
        itemData={itemData}
      />
      <ViewModal />
      <DeleteModal id={id} deleteMethod={deleteMethod} />
    </div>
  );
}
