import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios';


export default function News (props){
    
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [totalArticles, setTotalArticles] = useState(0);
    const [loading, setLoading] = useState(false);

   const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateSite = async () => {
        props.setProgress(0);
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=34ab3c84f5d14dcd82330612c5608b17&page=${page}&pageSize=${props.pageSize}`;
        let url = `/${props.country}/${props.category}/${page}/${props.pageSize}`;
        setPage(page + 1);
        setLoading(true);
        props.setProgress(20);
        let data = await axios.get(url);
        // console.log(data.data);
        // let data = await fetch(url);
        let parsedData = await data.data;
        props.setProgress(60);
        setArticles(parsedData.articles);
        setTotalArticles(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
        // console.log(totalArticles);
        // console.log(parsedData.totalResults);
        // console.log(parsedData.articles.length);
    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} | NewsValley`;
        updateSite();
    }, [])

//     const componentDidMount = async ()=> {
//         updateSite();
//     }

//     const handlePrev = async () => {
//         setPage(page-1);
//         updateSite();

//     }

//    const handleNext = async () => {
//         setPage(page+1);
//         updateSite();
//     }
    const fetchMoreData = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=34ab3c84f5d14dcd82330612c5608b17&page=${page + 1}&pageSize=${props.pageSize}`;
        let url = `/${props.country}/${props.category}/${page}/${props.pageSize}`;
        setPage(page + 1);
        setLoading(true);
        let data = await axios.get(url);
        // let parsedData = await data.json();
        let parsedData = await data.data;
        setArticles(articles.concat(parsedData.articles));
        setTotalArticles(parsedData.totalResults);
        setLoading(false);
        // console.log(data.data);
        // console.log(parsedData.totalResults);
        // console.log(totalArticles);
        // console.log((articles.concat(parsedData.articles).length));
    }

    const limit = 175;
        return (
            <div className="container">

                <h1 className="text-dark text-center mt-2 container">NewsValley - Top{(props.category === "general")? " " : ` ${capitalizeFirstLetter(props.category)} `}Headlines</h1>
                {loading && <Spinner/>}

                    <InfiniteScroll
                        dataLength={articles?.length}
                        next={fetchMoreData}
                        hasMore={articles?.length !== totalArticles}
                        loader={<Spinner />}
                    >
                <div className="container">

                        <div className="row my-4">
                            { articles?.map((ele) => {
                                let len = limit - ele.title.length;
                                return (
                                    <div className="col-md-4" key={ele.url}>

                                        <NewsItem title={ele.title} description={ele.description ? ele.description.slice(0, len) : ""} imageUrl={ele.urlToImage} newsUrl={ele.url} author={ele.author} date={ele.publishedAt} source={ele.source.name} />
                                    </div>)

                            })}
                        </div>
                </div>
                    </InfiniteScroll>


                {/* <div className="container d-flex justify-content-between my-5">
                    <button disabled={page <= 1} onClick={handlePrev} type="button" className="btn btn-dark"> &larr; Previous</button>
                    <button disabled={page >= Math.ceil(totalArticles / props.pageSize)} onClick={handleNext} type="button" className="btn btn-dark">Next &rarr; </button>
                </div> */}
            </div>
        )
    
}

 News.defaultProps = {
    pageSize: 5,
    country: "in",
    category: "general"
}

News.propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string
}
