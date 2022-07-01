import React, { useState } from 'react'
import './App.css';
import Navbar from './Components/Navbar';
import News from './Components/News';
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default function App (){
const [progress, setProgress] = useState(0); 

const setProgressBar = (val)=>{
    setProgress(val);
  }

    return (
      <>
      <Router>
  
      <Navbar/>
      <LoadingBar
          color='blue'
          progress={progress}
          height={3}
        />
      <Routes>
      <Route path="/" element={<News setProgress={setProgressBar}  key="general" pageSize = {12} country="in" category="general"/>} />
      {/* <Route path="/general" element={<News setProgress={setProgressBar}  key="general" pageSize = {12} country="in" category="general"/>} /> */}
      <Route path="/entertainment" element={<News setProgress={setProgressBar}  key="entertainment" pageSize = {12} country="in" category="entertainment"/>} />
      <Route path="/business" element={<News setProgress={setProgressBar}  key="business" pageSize = {12} country="in" category="business"/>} />
      <Route path="/health" element={<News setProgress={setProgressBar}  key="health" pageSize = {12} country="in" category="health"/>} />
      <Route path="/sports" element={<News setProgress={setProgressBar}  key="sports" pageSize = {12} country="in" category="sports"/>} />
      <Route path="/science" element={<News setProgress={setProgressBar}  key="science" pageSize = {12} country="in" category="science"/>} />
      <Route path="/technology" element={<News setProgress={setProgressBar}  key="technology" pageSize = {12} country="in" category="technology"/>} /> 
      </Routes>
  
      </Router>
      </>
    )
  
}

