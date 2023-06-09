import React, { useContext } from 'react'
import FiscalContext from './FiscalContext'
import FiscalPopup from './FiscalPopup'
import DataTable from 'react-data-table-component';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { AiOutlineFilePdf, AiOutlineFileExcel } from "react-icons/ai"


function FiscalTab() {
    const { setPopup, setFormValue, initialValue, table, loading,
        UserStatus, setId
    } = useContext(FiscalContext)
    const handleFiscal = () => {
        setPopup(true)
        setFormValue(initialValue)
    }
    console.log("first", table)
    // const ChangeStatus = (id, active) => {
    //     UserStatus(id, active)
    // }

    // const CheckStatus = (active) => {
    //     if (active === 'N') {
    //         return <>N</>

    //     }
    //     else {
    //         return <>Y</>
    //     }
    // }
    const handleStatus = (id) => {
        UserStatus(id)
        setId(id)


    }
    const columns = [
        {
            name: 'S.N',
            cell: (row, index) => index + 1,
        },
        {
            name: 'startYear',
            selector: (row) => row.startYear,
        },
        {
            name: 'endYear',
            selector: (row) => row.endYear,
        },
        {
            name: 'Active',
            selector: (row) => {
                return (
                    <>
                        {/* <span onClick={() => ChangeStatus(row._id, row.active)}>

                            {CheckStatus(row.active)}
                        </span> */}
                        <input type="checkbox" className='form-check-input' onChange={() => handleStatus(row._id)}
                            checked={row.active === 'Y' ? true : false} style={{ cursor: "pointer" }} />

                    </>
                )
            }
        },
    ]

    const openInNewTab = (url) => {
        const newWindow = window.open(url, "_blank", "noopener,noreferrer");
        if (newWindow) newWindow.opener = null;
    };

    const dataToExcel = table.map((d, i) => ({
        "S.N.": i + 1,
        startYear: d.startYear,
        endYear: d.endYear,
    }));

    const toExcel = () => {
        import("xlsx").then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(dataToExcel);
            var wscols = [
                { wch: 5 },
                { wch: 20 },
                { wch: 20 },

            ];
            worksheet["!cols"] = wscols;
            const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            saveAsExcelFile(excelBuffer, "Data In Excel");
        });
    };

    const saveAsExcelFile = (buffer, fileName) => {
        import("file-saver").then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE =
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
                let EXCEL_EXTENSION = ".xlsx";
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE,
                });

                module.default.saveAs(
                    data,
                    fileName + EXCEL_EXTENSION
                );
            }
        });
    };
    // to convert the data into pdf and download
    const dataWithIndex = table.map((d, i) => ({
        ...d,
        Index: i + 1,
    }));

    const cols = [
        { header: "S.N", field: "Index" },
        { header: "startYear", field: "startYear" },
        { header: "endYear", field: "endYear" },
        { header: "Active", field: "Active" },
    ];

    const exportColumns = cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
    }));

    const toPdf = () => {
        const doc = new jsPDF("p", "pt", "a4", true);
        doc.autoTable({
            startY: 100,
            theme: "grid",
            columns: exportColumns,
            body: dataWithIndex,
        });
        doc.save("Data.pdf");
    };
    return (
        <>
            <div className='container mt-3'>
                <button className='btn btn-outline-primary' onClick={handleFiscal}>Add Fiscal Year</button>

                <button className="exportButtons mx-5 btn btn-danger" onClick={toPdf} >
                    <AiOutlineFilePdf color='reds' />
                </button>
                <button className="exportButtons btn btn-success" onClick={toExcel}>
                    <AiOutlineFileExcel />
                </button>
                <button className='btn btn-outline-primary mx-5' onClick={() => openInNewTab('https://www.google.com/')}>NewPage</button>
                <DataTable
                    columns={columns}
                    data={table}
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight='400px'
                    highlightOnHover
                    pointerOnHover
                    progressPending={loading}
                    responsive
                    subHeader
                    dense
                    striped
                />

            </div>
            <FiscalPopup />
        </>
    )
}

export default FiscalTab