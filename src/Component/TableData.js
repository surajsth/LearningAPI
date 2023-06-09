import React, { useContext, useEffect, useRef, useState } from 'react'
import ContextUser from './ContextUser';
import CircularProgress from '@mui/material/CircularProgress';
import DataTable from 'react-data-table-component';
import $ from 'jquery'
import UserPopUp from './UserPopUp';
import Toast from '../Component/Toast';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { GrFormView } from 'react-icons/gr'
import Deleting from '../Action/Deleting';
import './TableData.css'
import Viewing from '../Action/Viewing';
import Editing from '../Action/Editing';

function TableData() {
    const { table, setTable, originalList, setOriginalList,
        loading, popup, setPopup, formValue, viewpopUp, setViewPopup,
        setFormValue, initialValue, setDeletePopup, setId, setIsDeleting, all,
        status, setStatus, setEditPopup, StatusSubmit, setStatusSubmit, deactivatedUser,
        setIsChecked, setIsActiveChecked
    } = useContext(ContextUser)


    const searchInput = useRef("")
    const handleInput = (e) => {
        e.preventDefault()
        const search = searchInput.current.value.toLowerCase();
        if (search) {
            let filteredList = originalList.filter((item) => {
                return item["name"].toLowerCase().includes(search)
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
    const handleDel = (data) => {
        setId(data)
        // setIsDeleting(true)
        setDeletePopup(true)
    }

    const handleView = (deta) => {
        setId(deta)
        setViewPopup(true)
    }
    const handleEdit = (deta) => {
        setId(deta._id)
        setEditPopup(true)
        setIsChecked(false)
        setFormValue({
            name: deta.name,
            role: deta.roleName
        })
    }
    console.log("submit Status", StatusSubmit)

    const columns = [
        {
            name: 'S.N',
            width: '70px',
            center: true,
            cell: (row, index) => index + 1,
        },
        {
            name: 'Name',
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: (row) => row.email,
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
            selector: (row) => {
                return (
                    <>
                        <GrFormView className='mx-2' onClick={() => handleView(row._id)} />
                        <AiOutlineEdit className='mx-2' onClick={() => handleEdit(row)} />
                        <AiOutlineDelete color='red' className='mx-2' onClick={() => handleDel(row._id)} />
                    </>
                )

            }

        },

    ]
    const ChangeStatus = (id, status) => {
        deactivatedUser(id, status)
    }

    const CheckStatus = (status) => {
        if (status === '1') {
            return <>
                <div className="badge bg-danger" >deactivate</div>
            </>
        }
        else {
            return <>
                <div className="badge bg-success">activate</div>
            </>
        }
    }
    const handleAdd = () => {
        setPopup(true)
        setFormValue(initialValue)
        setIsActiveChecked(false)
        setIsChecked(false)
    }
    return (
        <>
            <Toast />
            <div className='container my-5'>
                <div className="text-end">
                    <div className="container adding mt-5">
                        <div className="">
                            <label htmlFor="Role" className='d-block'>Status</label>
                            <select value={status} onChange={(e) => setStatus(e.target.value)} id="Role">
                                <option value='' disabled selected>Select Status</option>
                                <option value="-1">All</option>
                                <option value="1">Activate</option>
                                <option value="2">Deactivate</option>
                            </select>
                        </div>
                        <button className='addUser btn btn-success' onClick={handleAdd}>Add User</button>
                    </div>

                </div>
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
            </div >
            <UserPopUp />
            <Deleting />
            <Viewing />
            <Editing />
        </>
    )
}

export default TableData