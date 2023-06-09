import React, { useContext, useRef, useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import dummy from "../dummy.jpg"
import './Navbar.css'
import $ from "jquery"
import LoginContext from '../LoginContext';
import { useEffect } from 'react';
function Sidebar() {
    const { userdetail }
        = useContext(LoginContext)
    // const [filtered, setFiltered] = useState([])
    // const [originalList, setOriginalList] = useState(null)
    // useEffect(() => {
    //     setOriginalList(itemsB)
    //     setFiltered(itemsB)
    // }, [])
    // console.log("filters", filtered)
    // console.log("original", originalList)

    // const searchInput = useRef("")
    // const handleInput = (e) => {
    //     e.preventDefault()
    //     const search = searchInput.current.value.toLowerCase();
    //     if (search) {
    //         let filteredList = originalList.filter((item) => {
    //             return item["name"].toLowerCase().includes(search)
    //         })
    //         if (filteredList) {
    //             setFiltered(filteredList)
    //         }
    //         else {
    //             setFiltered({})
    //         }
    //     }
    //     else {
    //         setFiltered(originalList)
    //     }
    // }
    const itemsB = [
        {
            name: "dashboard",
            link: "/dashboard"
        }, {
            name: "userdata",
            link: "/user"
        }, {
            name: "rolename",
            link: "/role"
        },
        {
            name: "fiscalyear",
            link: "/fiscal"
        }
    ]
    const [search, setSearch] = useState("")

    const filterData = itemsB.filter((items) =>
        items.name && items.name.toLowerCase().includes(search.toLowerCase())
    )
    // console.log("fiterDeta", filterData)

    return (
        <div>

            <button className="uk-button uk-button-default" type="button"
                uk-toggle="target: #offcanvas-overlay">
                <AiOutlineMenu />
            </button>

            <div id="offcanvas-overlay" uk-offcanvas="overlay: true" >
                <div className="uk-offcanvas-bar">
                    <div className="">
                        <div className=""><h5 className='m-0'>Easy Software</h5></div>
                        <div className='uk-flex uk-flex-middle mt-4'>
                            <div className="me-3">
                                <h5 className='m-0'>{userdetail.Name}</h5>
                                <span>{userdetail.RoleName}</span>
                            </div>
                            <img src={dummy} alt="" className="img" />
                        </div>

                    </div>
                    <button className="uk-offcanvas-close" type="button" uk-close><AiOutlineClose /></button>
                    <p> <input type="text" onChange={(e) => setSearch(e.target.value)} value={search} /></p>

                    {filterData.length > 0 ? (
                        <>
                            {filterData.map((item) => {
                                console.log("items", item.link)
                                return (
                                    <>
                                        <p><Link to={item.link}>{item.name}</Link></p>
                                    </>
                                )
                            })}
                        </>
                    )
                        : <p>"no data "</p>
                    }



                </div>
            </div>

        </div>
    )
}

export default Sidebar