import RoleContext from "./RoleContext"
import { useState, useEffect } from 'react';
import $ from 'jquery'
import { FetchData } from "../Component/Hook/GetData";
import { toast } from "react-toastify";

const RoleState = (props) => {
    const baseUrl = process.env.REACT_APP_URL;
    const [popup, setPopup] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [error, setError] = useState({})
    const [deletepopUp, setDeletePopup] = useState(false)
    const [viewpopUp, setViewPopup] = useState(false)
    const [editpopUp, setEditPopup] = useState(false)
    const [editSubmit, setEditSubmit] = useState(false)
    const [StatusSubmit, setStatusSubmit] = useState(false)
    const [reload, setReload] = useState(false)
    const [role, setRole] = useState('-1')
    const [table, setTable] = useState([])
    const [all, setAll] = useState([])
    const [info, setInfo] = useState([])
    const [originalList, setOriginalList] = useState(null)
    const [loading, setLoading] = useState(true)
    const [id, setId] = useState(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const [viewloading, setViewLoading] = useState(true)
    const initialValue = {
        role: ""
    }
    const [formValue, setFormValue] = useState(initialValue)

    const addRole = () => {
        const DataForm = {
            flag: "I",
            roleName: formValue.role,
            FetchURL: `${baseUrl}rolename`,
            Type: "POST"
        }
        FetchData(DataForm).then(function (result) {
            if (result.StatusCode === 200) {
                $('.RolepopupBg').fadeOut(500);
                $('.RolepopUp').fadeOut(500);
                getRoleData();
                setPopup(false)
                setReload(!reload)
                toast.success("Role added successfully", { theme: "light" })
            }
            else {
                toast.error(result.Message, { theme: "light" })
            }
        })
    }

    useEffect(() => {
        getRoleData();
        // EditRoleUser();
    }, [])

    const getRoleData = () => {
        const TableData = {
            flag: "S",
            status: "-1",
            FetchURL: `${baseUrl}rolename`,
            Type: "POST"
        }
        FetchData(TableData).then(function (output) {
            if (output.StatusCode === 200) {
                const TableOutput = output.Values ? output.Values : ""
                setTable(TableOutput)
                setOriginalList(TableOutput)
                setLoading(false)
            }
            else {
                setTable([])
                setOriginalList([])
                setLoading(false)
            }
        })
    }
    useEffect(() => {
        getAllRoleData();
    }, [reload])

    const getAllRoleData = () => {
        const TableData = {
            flag: "S",
            status: "1",
            FetchURL: `${baseUrl}rolename`,
            Type: "POST"
        }
        FetchData(TableData).then(function (output) {
            if (output.StatusCode === 200) {
                const TableOutput = output.Values ? output.Values : ""
                setAll(TableOutput)
            }
            else {
                setAll([])
            }
        })
    }

    const deactivatedUser = (id, status) => {
        const DataForm = {
            flag: "US",
            RoleID: id,
            status: status,
            FetchURL: `${baseUrl}rolename`,
            Type: "POST"
        }
        if (status === '1') {
            DataForm.status = '2'
        }
        else {
            DataForm.status = '1'
        }
        FetchData(DataForm).then(function (result) {
            if (result.StatusCode === 200) {
                getRoleData()
                setReload(!reload)
                toast.success("success", { theme: "light" })
            }
            else {
                toast.error(result.Message, { theme: "light" })
            }
        })
    }


    // console.log("id", id)
    const deleteRoleData = () => {
        const DeleteData = {
            flag: "D",
            RoleID: id,
            FetchURL: `${baseUrl}rolename`,
            Type: "POST"
        }
        FetchData(DeleteData).then(function (result) {
            if (result.StatusCode === 200) {
                $('.DeletepopupBg').fadeOut(500);
                $('.DeletepopUp').fadeOut(500);
                getRoleData()
                setDeletePopup(false)
                setIsDeleting(false)
                setReload(!reload)
                toast.success("Deleted successfully", { theme: "light" })
            }
            else {
                toast.error(result.Message, { theme: "light" })
                setIsDeleting(false)
            }
        })
    }


    useEffect(() => {
        ViewtheRoleData()
    }, [id, reload])

    const ViewtheRoleData = () => {
        const ViewRoleData = {
            flag: "SI",
            RoleID: id,
            FetchURL: `${baseUrl}rolename`,
            Type: "POST"
        }
        FetchData(ViewRoleData).then(function (result) {
            if (result.StatusCode === 200) {
                const TableOutput = result.Values ? result.Values : ""
                setInfo(TableOutput)
                setViewLoading(false)
                setReload(!reload)
            }
            else {
                setInfo([])
                setViewLoading(false)
            }
        })
    }


    const EditRoleUser = () => {
        const DataForm = {
            flag: "U",
            RoleID: id,
            roleName: formValue.role,
            FetchURL: `${baseUrl}rolename`,
            Type: "POST"
        }
        FetchData(DataForm).then(function (result) {
            if (result.StatusCode === 200) {
                $('.EditpopupBg').fadeOut(500);
                $('.EditpopUp').fadeOut(500);
                getRoleData()
                setEditPopup(false)
                setReload(!reload)
                toast.success("Edited successfully", { theme: "light" })
            }
            else {
                toast.error(result.Message, { theme: "light" })
            }
        })
    }

    return (<RoleContext.Provider value={{
        popup, setPopup, submit, setSubmit, error, setError, deletepopUp, setDeletePopup,
        viewpopUp, setViewPopup, editpopUp, setEditPopup, editSubmit, setEditSubmit,
        StatusSubmit, setStatusSubmit, reload, setReload, formValue, setFormValue, baseUrl,
        addRole, initialValue, getRoleData, table, all, deactivatedUser, originalList,
        setTable, isDeleting, setIsDeleting, deleteRoleData, setId, viewpopUp, ViewtheRoleData,
        info, EditRoleUser
    }}>
        {props.children}
    </RoleContext.Provider>)
}

export default RoleState