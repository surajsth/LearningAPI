import { useEffect, useState } from 'react';
import ContextUser from './ContextUser';
import { FetchData } from './Hook/GetData';
import { toast } from 'react-toastify';
import $ from 'jquery'

const StateUser = (props) => {
    // const [name, setName] = useState("helo")
    // const [data, setData] = useState([])
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
    const [status, setStatus] = useState('-1')

    const initialValue = {
        name: "",
        email: "",
        password: "",
        role: ""
    }
    const [formValue, setFormValue] = useState(initialValue)
    const [isChecked, setIsChecked] = useState(false);
    const [isActiveChecked, setIsActiveChecked] = useState(false);
    useEffect(() => {
        // getUserData();
        getTableData();
    }, [status, isActiveChecked])


    console.log(isActiveChecked)
    const addUser = () => {
        const DataForm = {
            flag: "I",
            name: formValue.name,
            email: formValue.email,
            password: formValue.password,
            roleName: formValue.role,
            status: isActiveChecked ? '1' : '2',
            FetchURL: `${baseUrl}user`,
            Type: "POST"
        }


        FetchData(DataForm).then(function (result) {
            if (result.StatusCode === 200) {
                if (isChecked) {
                    $('.UserpopupBg').fadeOut(500);
                    $('.UserpopUp').fadeOut(500);
                }
                getTableData()
                setPopup(false)
                setReload(!reload)
                toast.success("user added successfully", { theme: "light" })
            }
            else {
                toast.error(result.Message, { theme: "light" })
            }
        })
    }

    const [table, setTable] = useState([])
    const [all, setAll] = useState([])
    const [info, setInfo] = useState([])
    const [originalList, setOriginalList] = useState(null)
    const [loading, setLoading] = useState(true)
    const getTableData = () => {
        const TableData = {
            flag: "S",
            status: status,
            FetchURL: `${baseUrl}user`,
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
    // useEffect(() => {
    //     getAllData()
    // }, [reload])

    // const getAllData = () => {
    //     const TableData = {
    //         flag: "S",
    //         roleName: "-1",
    //         FetchURL: `${baseUrl}user`,
    //         Type: "POST"
    //     }
    //     FetchData(TableData).then(function (output) {
    //         if (output.StatusCode === 200) {
    //             const TableOutput = output.Values ? output.Values : ""
    //             setAll(TableOutput)

    //         }
    //         else {
    //             setAll([])

    //         }
    //     })
    // }
    const [id, setId] = useState(null)
    const [isDeleting, setIsDeleting] = useState(false)
    // console.log("id", id)
    const deleteData = () => {
        const DeleteData = {
            flag: "D",
            UserID: id,
            FetchURL: `${baseUrl}user`,
            Type: "POST"
        }
        FetchData(DeleteData).then(function (result) {
            if (result.StatusCode === 200) {
                $('.deletepopupBg').fadeOut(500);
                $('.deletepopUp').fadeOut(500);
                getTableData()
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

    const [viewloading, setViewLoading] = useState(true)
    useEffect(() => {
        getInfoData()
    }, [id, reload])


    const getInfoData = () => {
        const InfoData = {
            flag: "SI",
            UserID: id,
            FetchURL: `${baseUrl}user`,
            Type: "POST"
        }
        FetchData(InfoData).then(function (output) {
            if (output.StatusCode === 200) {
                const TableOutput = output.Values ? output.Values : ""
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
    console.log("info", info)

    const EditUser = () => {
        const DataForm = {
            flag: "U",
            UserID: id,
            name: formValue.name,
            roleName: formValue.role,
            FetchURL: `${baseUrl}user`,
            Type: "POST"
        }
        FetchData(DataForm).then(function (result) {
            if (result.StatusCode === 200) {
                if (isChecked) {

                    $('.EditpopupBg').fadeOut(500);
                    $('.EditpopUp').fadeOut(500);
                }
                getTableData()
                setEditPopup(false)
                setReload(!reload)
                toast.success("Edited successfully", { theme: "light" })
            }
            else {
                toast.error(result.Message, { theme: "light" })
            }
        })
    }
    const stateInitial = []
    const [newStat, setNewStat] = useState(stateInitial)
    console.log("newStat", newStat)
    const deactivatedUser = (id, status) => {
        const DataForm = {
            flag: "US",
            UserID: id,
            status: status,
            FetchURL: `${baseUrl}user`,
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
                // let statsN = JSON.parse(JSON.stringify(newStat));
                // let pitchStatus;

                // if (DataForm.status === "1") {
                //     pitchStatus = "Activated";
                // } else if (DataForm.status === "2") {
                //     pitchStatus = "Deactivated";
                // }

                // setNewStat(statsN);
                getTableData()
                toast.success("success", { theme: "light" })
            }
            else {
                toast.error(result.Message, { theme: "light" })
            }
        })
    }
    // console.log(CheckStatus)


    return (
        <ContextUser.Provider value={{
            baseUrl, table,
            setTable, originalList, loading, setOriginalList, popup,
            setPopup, formValue, setFormValue, initialValue, error, setError,
            submit, setSubmit, addUser, deletepopUp, setDeletePopup, deleteData,
            id, setId, isDeleting, setIsDeleting, viewpopUp, setViewPopup, getInfoData, info,
            viewloading, status, setStatus, all, editpopUp, setEditPopup, EditUser, editSubmit,
            setEditSubmit, StatusSubmit, setStatusSubmit, deactivatedUser, isChecked, setIsChecked,
            isActiveChecked, setIsActiveChecked
        }}>
            {props.children}
        </ContextUser.Provider>
    )
}


export default StateUser