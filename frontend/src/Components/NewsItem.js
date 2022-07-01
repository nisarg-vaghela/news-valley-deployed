import React from 'react'

export default function NewsItem(props) {
    return (
        <>

            <div className="card mx-auto my-4">
                <span className="badge badge-success text-dark bg-warning">{props.source ? props.source : "Unknown"}</span>
                <img src={props.imageUrl ? props.imageUrl : "https://static.toiimg.com/thumb/msid-88470800,width-1070,height-580,imgsize-125492,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg"} className="card-img-top" style={{ height: '178px' }} alt="/" />
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.description}...</p>

                    <p className="card-text"><small className="text-muted">By {props.author ? props.author : "Unknown"} on {new Date(props.date).toGMTString()}</small></p>
                    <div className="d-grid gap-2">
                    <a href={props.newsUrl} rel="noreferrer" target="_blank" className="btn btn-info">Read More</a>
                    </div>
                </div>
            </div>
        </>
    )

}
