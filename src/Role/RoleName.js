import React, { useContext, useRef } from 'react'
import RoleContext from './RoleContext'
import RolePopup from './RolePopup'
import CircularProgress from '@mui/material/CircularProgress';
import DataTable from 'react-data-table-component';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { GrFormView } from 'react-icons/gr'
import DeleteRole from './Action/DeleteRole';
import ViewRole from './Action/ViewRole';
import EditRole from './Action/EditRole';

function RoleName() {
    const { popup, setPopup, formValue, setFormValue, initialValue, table,
        loading, deactivatedUser, getRoleData, originalList, setTable, deleteRoleData,
        deletepopUp, setDeletePopup, setId, setViewPopup, setEditPopup


    } = useContext(RoleContext)
    const handleRole = () => {
        setPopup(true)
        setFormValue(initialValue)
    }

    const handleRoleDel = (data) => {
        setId(data)
        // // setIsDeleting(true)
        setDeletePopup(true)
    }
    const handleRoleView = (data) => {
        setId(data)
        setViewPopup(true)
    }

    const handleRoleEdit = (deta) => {
        setId(deta._id)
        setEditPopup(true)
        setFormValue({
            role: deta.roleName
        })

    }

    const searchInput = useRef("")
    const handleInput = (e) => {
        e.preventDefault()
        const search = searchInput.current.value.toLowerCase();
        if (search) {
            let filteredList = originalList.filter((item) => {
                return item["roleName"].toLowerCase().includes(search)
            })
            if (filteredList) {
                setTable(filteredList)
            }
            else {
                setTable({})
            }
        }
        else {
            setTable(originalList)
        }
    }

    const columns = [
        {
            name: 'S.N',
            width: '70px',
            center: true,
            cell: (row, index) => index + 1,
        },
        {
            name: 'Role',
            selector: (row) => row.roleName,
        },
        {
            name: 'Status',
            selector: (row) => {
                return (
                    <>
                        <span onClick={() => ChangeStatus(row._id, row.status)}>

                            {CheckStatus(row.status)}
                        </span>
                    </>
                )
            }
        },
        {
            name: 'Action',
            center: true,
            selector: (row) => {
                return (
                    <>
                        <GrFormView className='mx-2' onClick={() => handleRoleView(row._id)} />
                        <AiOutlineEdit className='mx-2' onClick={() => handleRoleEdit(row)} />
                        <AiOutlineDelete color='red' className='mx-2' onClick={() => handleRoleDel(row._id)} />
                    </>
                )
            },
        },

    ]

    const ChangeStatus = (id, status) => {
        deactivatedUser(id, status)
    }

    const CheckStatus = (status) => {
        if (status === '1') {
            return <>
                <div className="badge bg-success" >activate</div>
            </>
        }
        else {
            return <>
                <div className="badge bg-danger">deactivate</div>
            </>
        }
    }
    return (
        <div className='container'>
            <button className='addUser btn btn-success mt-4' onClick={handleRole} style={{
                display: "absolute",
                marginLeft: "90%"
            }}>
                Add Role</button>
            {loading ? (<div className='text-center mt-3'> <CircularProgress /></div>) : (
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
                    subHeaderComponent={
                        <input type="text" onChange={handleInput} ref={searchInput} />}
                />


            )}
            <RolePopup />
            <DeleteRole />
            <ViewRole />
            <EditRole />
        </div>

    )
}

export default RoleName