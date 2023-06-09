import { useState, useEffect } from "react"
import FiscalContext from "./FiscalContext"
import { FetchData } from "../Component/Hook/GetData";
import { toast } from "react-toastify";
import $ from "jquery"

const FiscalState = (props) => {
    const baseUrl = process.env.REACT_APP_URL;
    const [popup, setPopup] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [error, setError] = useState({})
    const initialValue = {
        startYear: "",
        endYear: "",
    }
    const [formValue, setFormValue] = useState(initialValue)
    const [viewloading, setViewLoading] = useState(true)
    const [originalList, setOriginalList] = useState(null)
    const [loading, setLoading] = useState(true)
    const [table, setTable] = useState([])
    const [singleData, setSingleData] = useState([])
    const [reload, setReload] = useState(false)
    const [id, setId] = useState(null)

    useEffect(() => {
        getFiscalData();

    }, [])

    // for all data
    const getFiscalData = () => {
        const TableData = {
            flag: "S",
            active: "-1",
            FetchURL: `${baseUrl}fiscal`,
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
        ActiveFiscalData()
    }, [id, reload])
    //for active data
    const ActiveFiscalData = () => {
        const TableData = {
            flag: "S",
            active: "Y",
            FetchURL: `${baseUrl}fiscal`,
            Type: "POST"
        }
        FetchData(TableData).then(function (output) {
            if (output.StatusCode === 200) {
                const TableOutput = output.Values[0] ? output.Values[0] : ""
                setSingleData(TableOutput)

            }
            else {
                setSingleData([])
            }
        })
    }
    const addFiscal = () => {
        const DataForm = {
            flag: "I",
            startYear: formValue.startYear,
            endYear: formValue.endYear,
            FetchURL: `${baseUrl}fiscal`,
            Type: "POST"
        }
        FetchData(DataForm).then(function (result) {
            if (result.StatusCode === 200) {
                $('.FiscalpopupBg').fadeOut(500);
                $('.FiscalpopUp').fadeOut(500);
                getFiscalData();
                setPopup(false)
                setReload(!reload)
                toast.success("FiscalYear added successfully", { theme: "light" })
            }
            else {
                toast.error(result.Message, { theme: "light" })
            }
        })
    }

    const UserStatus = (id) => {
        const DataForm = {
            flag: "US",
            FiscalID: id,
            active: 'Y',
            FetchURL: `${baseUrl}fiscal`,
            Type: "POST"
        }

        FetchData(DataForm).then(function (result) {
            if (result.StatusCode === 200) {
                getFiscalData()
                setReload(!reload)
                toast.success(result.Message, { theme: "light" })
            }
            else {
                toast.error(result.Message, { theme: "light" })
            }
        })
    }

    return (<FiscalContext.Provider value={{
        error, setError, formValue, setFormValue, submit, setSubmit,
        popup, setPopup, initialValue, loading, setLoading, originalList,
        setOriginalList, viewloading, setViewLoading, table, setTable, addFiscal,
        UserStatus, ActiveFiscalData, singleData, setId
    }}>
        {props.children}
    </FiscalContext.Provider>)
}

export default FiscalState