import React from 'react';
import { datas } from '../data/datas';

function SearchRes (props) {

    // This alows the the users search to be displayed in the input box when they move from the Home page to the search res page
    let [searchTerm, setSearchTerm] = React.useState(`${localStorage.getItem('search')}`);

    // this has to be done so that if page is refreshed the items that match the search will still be displayed
    props.history.location.state = [localStorage.getItem('search'), parseInt(localStorage.getItem('pgNum'))]

    let pgNum = props.history.location.state[1]

    let pgData = datas.filter(data => {
        return data['title'].toLowerCase().includes(props.history.location.state[0])
    });

    const searchR = () => {

        let endToEnd = pgNum * 24

        if(pgData.length < 25){
            
            return pgData.map(data => {
                return (
                    <div className="col">
                        {/* Link to recipe website */}
                        <a className="card h-100 p-0 text-decoration-none" href={data['href']}>
                            {/* Recipe image */}
                            <img className="card-img-top" src={data['img']} alt={data['title']} style={{height: "150px", objectFit: "cover"}}/>
                        
                            <div className="card-body">
                                {/* Title of the recipe */}
                                <h5 className="card-title" style={{color:'black'}}>{data['title']}</h5>
                            </div>
                        </a>
                    </div>
                )
            });

        } else {

            // slice arry & .map() through the slice  
            const slcPgData = pgData.slice(endToEnd-24, endToEnd)

            return slcPgData.map(data => {
                return (
                    <div className="col">
                        {/* Link to recipe website */}
                        <a className="card h-100 p-0 text-decoration-none" href={data['href']}>
                            {/* Recipe image */}
                            <img className="card-img-top" src={data['img']} alt={data['title']} style={{height: "150px", objectFit: "cover"}}/>
                        
                            <div className="card-body">
                                {/* Title of the recipe */}
                                <h5 className="card-title" style={{color:'black'}}>{data['title']}</h5>
                            </div>
                        </a>
                    </div>
                )
            });
        }
    }

    // Var's below keep track of the page number 
    let pgNav1Var;
    let pgNav2Var;
    let pgNav3Var;
    let pgNav4Var;

    // Moves to the page that the user requested
    const changePage = (pgNum) =>{

        // add page number to localstorage
        localStorage.setItem('pgNum', pgNum);
        // refresh the page
        props.history.push({
            state: [searchTerm, pgNum],
            pathname: '/searchRes'
        })

    }

    const pgNavLeft = () => {

        if(pgNum > 1){ // doesn't let it work on 1st page
            changePage(pgNum - 1)
        }
    }

    const pgNav1 = () => {

        if(pgNum !== pgNav1Var){ // doesn't let it work if you are on that page already

            // Scroll to the top of the page so user doesn't get confused
            window.scrollTo(0,0);
            
            changePage(pgNav1Var)
        }

    }
    const pgNav2 = () => {        

        if(pgNum !== pgNav2Var){ // doesn't let it work if you are on that page already

            // Scroll to the top of the page so user doesn't get confused
            window.scrollTo(0,0);

            changePage(pgNav2Var)
        }
    }
    const pgNav3 = () => {

        if(pgNum !== pgNav3Var){ // doesn't let it work if you are on that page already

            // Scroll to the top of the page so user doesn't get confused
            window.scrollTo(0,0);

            changePage(pgNav3Var)
        }
    }
    const pgNav4 = () => {

        if(pgNum !== pgNav4Var){ // doesn't let it work if you are on that page already

            // Scroll to the top of the page so user doesn't get confused
            window.scrollTo(0,0);

            changePage(pgNav4Var)
        }
    }
    const pgNavRight = () => {

        if(pgNum < pgData.length/24){ // doesn't let it work if you are on the last page

            // Scroll to the top of the page so user doesn't get confused
            window.scrollTo(0,0);

            changePage(pgNum + 1)
        }
    }

    // builds the search res nav at the bottom 
    const pgNav = () => {

        // Determines how many pg nav numbers will show, depending on Current page & number of search res
        if(pgNum > 3){

            pgNav4Var = Math.ceil(pgData.length/24)

            if(pgNum !== pgNav4Var){
                pgNav1Var = pgNum - 2
                pgNav2Var = pgNum - 1
                pgNav3Var = pgNum
            } else {
                pgNav1Var = pgNum - 3
                pgNav2Var = pgNum - 2
                pgNav3Var = pgNum - 1
            }
            
            
        } else {
            
            if(pgData.length > 95){ 

                pgNav1Var = 1
                pgNav2Var = 2
                pgNav3Var = 3
                pgNav4Var = Math.ceil(pgData.length/24)
            
            } else if(pgData.length > 24){ 
    
                pgNav1Var = 1
                pgNav2Var = 2
                pgNav3Var = false
                pgNav4Var = Math.ceil(pgData.length/24)
            
            } else { 
    
                pgNav1Var = 1
                pgNav2Var = false
                pgNav3Var = false
                pgNav4Var = false
            
            }
        }
       


        return (
            <ul className="mx-auto text-center text mt-3">

                {/* Left arrow to previous page */}
                <li>
                    <span className="rounded-circle mx-2 pg-nav-active"  onClick={pgNavLeft}>&lt;</span>
                </li>

                {/* page link */}
                <li>
                    <span  
                        className="pg-nav-active" 
                        style={
                            pgNav1Var == pgNum ? // adds underline if user is on this page
                                {
                                    borderRadius: "5px 0px 0px 5px", 
                                    textDecoration: "underline solid #0280C8"
                                } : { 
                                    borderRadius: "5px 0px 0px 5px" 
                                }
                        } 
                        onClick={pgNav1}
                    >{pgNav1Var}</span>
                </li>

                {/* Depending on how many search results we find the navigation at the bottom of the page the chain */}
                {/* These shows this page in bottom nav if pgNav2Var, pgNav3Var, pgNav4Var is true */}
                {
                    pgNav2Var ? 
                        <li>
                            <span 
                                className="pg-nav-active" 
                                style={ pgNav2Var == pgNum ? { textDecoration: "underline solid #0280C8" } : {} } // adds underline if user is on this page
                                onClick={pgNav2}
                            >{pgNav2Var}</span>
                        </li> : ""
                }
                {
                    pgNav3Var ? 
                        <li>
                            <span 
                                className="pg-nav-active" 
                                style={ pgNav3Var == pgNum ? { textDecoration: "underline solid #0280C8" } : {} } // adds underline if user is on this page
                                onClick={pgNav3}
                            >{pgNav3Var}</span>
                        </li> : ""
                }
                { pgNav3Var && pgNav4Var !== 4 ? <li><span>...</span></li> : "" }
                {
                    pgNav4Var && pgNav4Var !== pgNav2Var && pgNav4Var !== pgNav3Var ? 
                        <li>
                            <span 
                                className="pg-nav-active" 
                                style={
                                    pgNav4Var == pgNum ? // adds underline if user is on this page
                                        {
                                            borderRadius: "0px 5px 5px 0px", 
                                            textDecoration: "underline solid #0280C8"
                                        } : { 
                                            borderRadius: "0px 5px 5px 0px" 
                                        }
                                } 
                                onClick={pgNav4}
                            >{pgNav4Var}</span>
                        </li> : ""
                }

                {/* Right arrow to next page */}
                <li>
                    <span className="rounded-circle mx-2 pg-nav-active" onClick={pgNavRight}>&gt;</span>
                </li>
            </ul>
        )
    }

    // Assigns input value to props.history.location.state
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const sendSearch = () => {
       
        localStorage.setItem('search', searchTerm); // Stores the search query in local storage
        localStorage.setItem('pgNum', 1)
        props.history.push({
            state: [searchTerm, 1],
            pathname: '/searchRes'
        }) // Assigns what the user searches to props.history.location.state & moves us to the search results page
    }

    return (
        <div>

            {/* Website Name in a heading tag displays in biger screen*/}
            <a href="/" className="text-decoration-none d-none d-md-block pt-1 fixed-top" id="res-left-title-div">
                <h2 
                    className="text-success" 
                    id="seach-res-title" 
                >Vegan</h2>
            </a>

            <section className="position-relative" id="adj-4-logo">
                {/* Title & Search */}
                {/* <section className={window.innerWidth >= 768 ? "container text-center fixed-top bg-white" : "container text-center"} id="title-sec"> */}
                <section className={"container text-center fixed-top bg-white"} id="title-sec">
                    <div className="row">
                        <div className="col-12 col-md-8 col-lg-6 m-0 pt-2">

                            {/* Website Name in a heading tag */}
                            <a href="/" className="text-decoration-none row d-block d-md-none mt-1" id="mobi-logo">
                                <h2 
                                    className="text-success" 
                                    id="seach-res-title" 
                                >Vegan</h2>
                            </a>

                            {/* Search bar */}
                            <form className="row" onSubmit={sendSearch} id="res-search-div">

                                {/* Input for search */}
                                <input 
                                    className="col-11" 
                                    type="search" 
                                    placeholder="Search" 
                                    aria-label="Search" 
                                    id="main-search"
                                    value={searchTerm}
                                    onChange={handleInputChange}
                                /> 

                                {/* Search button; it's a search icon, form bootstrap icons */}
                                <span className="col-1" id="res-search-button" onClick={sendSearch}><i className="bi bi-search"></i></span>

                            </form>
                        </div>

                        {/* empty column div; allows the "Search & Title" area to be on the left */}
                        {/* It Disappears when page is small */}
                        <div className="col-12 col-md-4 col-lg-6 m-0">
                            <div className="mt-1" style={{ width: "100%"}}>
                                
                            </div>
                        </div>

                    </div>
                </section>

                <hr className="d-none d-md-block mt-0  fixed-top" id="adj-hr"/>
        
                {/* Main content "Search Results" + Bottom Nav */}
                <section className="container" >
                    <div className="row" id="ad-search-res">

                        <div className="col-12 col-md-8 col-lg-6 m-0">

                            {/* Top Ad */}
                            <div style={{border: "1px solid #ced4da", borderRadius: "12.5px 12.5px 12.5px 12.5px", height: "85px"}} id="top-ad">
                                Ad
                            </div>

                            {/* Search res */}
                            <div className="row row-cols-2 row-cols-md-3 g-4">
                                {searchR()}
                            </div>

                            {/* Bottom Ad */}
                            <div style={{border: "1px solid #ced4da", borderRadius: "12.5px 12.5px 12.5px 12.5px", height: "112px"}} id="botom-ad">
                                Ad
                            </div>

                            {/* Bottom Nav, change page to view other searched items */}
                            {pgNav()}

                        </div>
                        
                        {/* Side Ad */}
                        <div className="col-12 col-md-4 col-lg-6 d-none d-md-block m-0" id="side-ad">
                            <div style={{border: "1px solid #ced4da", borderRadius: "12.5px 12.5px 12.5px 12.5px", height: "600px", width: "50%"}}>
                                Ad
                            </div>
                        </div>

                    </div>
                </section>
            </section>
        </div>
    );
}

export default SearchRes;