// App.js
import React from 'react';
import FileUpload from './FileUpload'
// import logoImage from './images/new-logo.jpg'
// import ExcelFileUpload from './ExcelFileUpload';
import Header from './Header/Header';

import './App.css'


// import FileUpload from './ExcelFile';

function App() {
  return (
    <div className="App">
     
     <Header/>
   
    <div className='main-container'>
      
     
        <FileUpload/>  
      
      
   </div>
    
       

      {/* <ExcelFileUpload/> */}
    </div>
  );
}

export default App;
