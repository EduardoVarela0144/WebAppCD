import React from 'react';
import SetsTable from './components/SetsTable';
import SetCreateModal from './components/SetCreateModal';
import AddModalSets from './components/AddModalSets';
import DeleteModalSets from './components/DeleteModalSets';

export default function QuestionDashboard({
    tableData,
    tableQueryData,
    tableHeaders,
    setId,
    addSet,
    deleteSet,
    id,
    
}) {
    return (
        <div className="h-full overflow-hidden">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6 h-full overflow-hidden pb-12 ">
                <div className=' m-2'>
                    <SetCreateModal 
                        tableData={tableData}
                        tableQueryData={tableQueryData}
                        tableHeaders={tableHeaders}
                        setId={setId} />
                </div>
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-xl overflow-hidden h-full">
                    <SetsTable
                        tableData={tableData}
                        tableQueryData={tableQueryData}
                        tableHeaders={tableHeaders}
                        setId={setId} 
                        deleteSet={deleteSet}
                        id={id}
                        // dataSet={dataSet}
                        />
                </div>
            </div>
            <AddModalSets
            addSet={addSet}
            
            />
            
        </div>
    )
}