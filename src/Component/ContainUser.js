import React, { useContext } from 'react'
import ContextUser from './ContextUser';

function ContainUser() {
    const { name, data } = useContext(ContextUser)
    console.log(data)
    return (
        <div className="row row-cols-1 row-cols-md-3 g-4">
            {
                data.map((data) => {
                    const { id, featured_image_src, title, date } = data

                    return (
                        // <div key={id}>
                        //     <img src={featured_image_src} alt="" />
                        //     <h5>{title.rendered}</h5>
                        //     <span>{date}</span>
                        // </div>
                        <div key={id} className="col">
                            <div className="card">

                                <img src={featured_image_src} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{title.rendered}</h5>

                                </div>
                                <div className="card-footer">
                                    <small className="text-muted">{date}</small>
                                </div>
                            </div>
                        </div>
                    )
                })

            }



        </div>
    )
}

export default ContainUser