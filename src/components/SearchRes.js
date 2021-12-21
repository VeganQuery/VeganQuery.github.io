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
    let gpNav1Var;
    let gpNav2Var;
    let gpNav3Var;
    let gpNav4Var;

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

    const gpNavLeft = () => {

        if(pgNum > 1){
            changePage(pgNum - 1)
        }
    }

    const gpNav1 = () => {

        // Scroll to the top of the page so user doesn't get confused
        window.scrollTo(0,0);

        changePage(gpNav1Var)

    }
    const gpNav2 = () => {

        // Scroll to the top of the page so user doesn't get confused
        window.scrollTo(0,0);

        changePage(gpNav2Var)
    }
    const gpNav3 = () => {

        // Scroll to the top of the page so user doesn't get confused
        window.scrollTo(0,0);

        changePage(gpNav3Var)
    }
    const gpNav4 = () => {

        // Scroll to the top of the page so user doesn't get confused
        window.scrollTo(0,0);

        changePage(gpNav4Var)
    }
    const gpNavRight = () => {

        if(pgNum < pgData.length/24){

            // Scroll to the top of the page so user doesn't get confused
            window.scrollTo(0,0);

            changePage(pgNum + 1)
        }
    }

    // builds the search res nav at the bottom 
    const pgNav = () => {

        if(pgData.length > 94){ //pgData.length > 119

            gpNav1Var = 1
            gpNav2Var = 2
            gpNav3Var = 3
            gpNav4Var = Math.ceil(pgData.length/24)
        
        } else if(pgData.length > 24){ //pgData.length > 24

            gpNav1Var = 1
            gpNav2Var = 2
            gpNav3Var = false
            gpNav4Var = Math.ceil(pgData.length/24)
        
        } else { //all else

            gpNav1Var = 1
            gpNav2Var = false
            gpNav3Var = false
            gpNav4Var = false
        
            
        }


        return (
            <ul className="mx-auto text-center text mt-3">

                {/* Left arrow to previous page */}
                <li>
                    <span className="rounded-circle mx-2 pg-nav-active"  onClick={gpNavLeft}>&lt;</span>
                </li>
                <li>
                    <span id="pg-nav-1" className="pg-nav-active" style={{borderRadius: "5px 0px 0px 5px"}} onClick={gpNav1}>{gpNav1Var}</span>
                </li>

                {/* Depending on how many search results we find the navigation at the bottom of the page the chain */}
                {/* These shows this page in bottom nav if gpNav2Var, gpNav3Var, gpNav4Var is true */}
                {gpNav2Var ? <li><span id="pg-nav-2" className="pg-nav-active" onClick={gpNav2}>{gpNav2Var}</span></li> : ""}

                {gpNav3Var ? <li><span id="pg-nav-3" className="pg-nav-active" onClick={gpNav3}>{gpNav3Var}</span></li> : ""}

                {gpNav3Var && gpNav4Var !== 4 ? <li><span>...</span></li> : ""}
                {gpNav4Var && gpNav4Var !== gpNav2Var && gpNav4Var !== gpNav3Var ? <li><span id="pg-nav-4" className="pg-nav-active" style={{borderRadius: "0px 5px 5px 0px"}} onClick={gpNav4}>{gpNav4Var}</span></li> : ""}

                {/* Right arrow to next page */}
                <li>
                    <span className="rounded-circle mx-2 pg-nav-active" onClick={gpNavRight}>&gt;</span>
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
                <section className={window.innerWidth >= 768 ? "container text-center fixed-top bg-white" : "container text-center"} id="title-sec">
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
                                    id="searched"
                                    value={searchTerm}
                                    onChange={handleInputChange}
                                /> 

                                {/* <hr className="col-1 m-0 d-none d-sm-block" id="vert"/> */}
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
                            <div className="" style={{border: "1px solid #ced4da", borderRadius: "12.5px 12.5px 12.5px 12.5px", height: "85px"}} id="top-ad">
                                Ad
                            </div>

                            {/* Search res */}
                            <div className="row row-cols-2 row-cols-md-3 g-4">
                                {searchR()}
                            </div>

                            {/* Bottom Ad */}
                            <div className="" style={{border: "1px solid #ced4da", borderRadius: "12.5px 12.5px 12.5px 12.5px", height: "112px"}} id="botom-ad">
                                Ad
                            </div>

                            {/* Bottom Nav, change page to view other searched items */}
                            {pgNav()}

                        </div>
                        
                        {/* Side Ad */}
                        <div className="col-12 col-md-4 col-lg-6 d-none d-md-block m-0" id="side-ad">
                            <div className="" style={{border: "1px solid #ced4da", borderRadius: "12.5px 12.5px 12.5px 12.5px", height: "600px", width: "50%"}}>
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