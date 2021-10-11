import React from 'react';
import { datas } from '../data/datas';

function SearchRes (props) {
    
    

    // This alows the the users search to be displayed in the input box when they move from the Home page to the search res page
    let [searchTerm, setSearchTerm] = React.useState(`${localStorage.getItem('search')}`);

    // this has to be done so that if page is refreshed the items that match the search will still be displayed
    props.history.location.state = localStorage.getItem('search')

    const searchR = () => {

        // gets search resalts & puts them into bootstrap cards
        return datas.map(data => {

            if(data['title'].toLowerCase().includes(props.history.location.state)){

                return (
                    <div className="col">
                        {/* Link to recipe website */}
                        <a className="card p-0 text-decoration-none" href={data['href']}>
                            {/* Recipe image */}
                            <img className="card-img-top" src={data['img']} alt={data['title']}/>
                        
                            <div className="card-body">
                                {/* Title of the recipe */}
                                <h5 className="card-title" style={{color:'black'}}>{data['title']}</h5>
                            </div>
                        </a>
                    </div>
                )
            }
        });
    }

    // Assigns input value to props.history.location.state
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const sendSearch = () => {
        console.log("sendSearch",searchTerm)
        localStorage.setItem('search', searchTerm); // Stores the search query in local storage
        props.history.push({
            state: searchTerm,
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
                <section className="container text-center pb-2 fixed-top bg-white" id="title-sec">
                    <div className="row">
                        <div className="col-12 col-md-8 col-lg-6 m-0 pt-2">

                            {/* Website Name in a heading tag */}
                            <a href="/" className="text-decoration-none row d-block d-md-none">
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
        
                <section className="container">
                    <div className="row">

                        <div className="col-12 col-md-8 col-lg-6 m-0">

                            <div className="m-1 mb-4" style={{border: "1px solid #ced4da", height: "60px"}}>
                                Ad
                            </div>

                            <div className="row row-cols-2 row-cols-md-3 g-4">
                                {searchR()}
                            </div>

                            <div className="m-1 mt-3" style={{border: "1px solid #ced4da", height: "60px"}}>
                                Ad
                            </div>
                        </div>
                        
                        <div className="col-12 col-md-4 col-lg-6 d-none d-md-block m-0" id="side-ad">
                            <div className="mt-1" style={{border: "1px solid #ced4da", height: "600px", width: "50%"}}>
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