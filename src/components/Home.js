import React from 'react';
import { datas } from '../data/datas';

function Home (props) {

    let searchQuery = ''

    // Assigns input value to the variable searchQuery
    const handleInputChange = (e) => {
        searchQuery = e.target.value
    }

    // Executes when the search button is pressed
    const sendSearch = () => {
        // we need to use local storage because after you are directed to the search results page & if a  user refresh it the data will be retrieved using local storage
        localStorage.setItem('search', searchQuery); // Saves search query in local storage
        localStorage.setItem('pgNum', 1) // Saves page number in local storage
        props.history.push({
            state: [searchQuery, 1],
            pathname: '/searchRes'
        }) // Assigns what the user searches to props.history.location.state & moves us to the search results page
    }

    // creates the 3 unique vegan recipes just before the footer
    const unqRcp = () => {
        
        // Set to hold 3 unique vegan recipes
        let topCardsSet = new Set()
        let dataLen = datas.length
        while(topCardsSet.size < 3){
            topCardsSet.add(JSON.stringify(datas[Math.floor(Math.random() * dataLen)])) // Adds only unique values to Set(), after having turned an object into a string using JSON
        }

        // Set turn into an array so I can use .map() on it
        let topCardsArr = Array.from(topCardsSet)

        // gets search resalts of the unique Set() & puts them into bootstrap cards
        return topCardsArr.map((data) => {
            
            data = JSON.parse(data) // turns data form a string to an object
            
            return (
                <div className="col">
                    {/* Link to recipe website */}
                    <a className="card h-100 p-0 text-decoration-none" href={data['href']}>
                        {/* Recipe image */}
                        <img className="card-img-top" src={data["img"]} alt={data["title"]} style={{height: "150px", objectFit: "cover"}}/>
                        <div className="card-body">
                            {/* Title of the recipe */}
                            <h5 className="card-title" style={{color:'black'}}>{data["title"]}</h5>
                        </div>
                    </a>
                </div>
            )
            
        });
    }

    return (
        <div>

            {/* Title & Search bar */}
            <section className="jumbotron">
                <div className="container">

                    {/* Website Name in a heading tag */}
                    <h2 
                        className="text-success" 
                        id="main-title" 
                    >Vegan</h2>
                    
                    {/* Search bar */}
                    <form className="row" onSubmit={sendSearch} id="search-div">

                        {/* Input for search */}
                        <input 
                            className="col-11" 
                            type="search" 
                            placeholder="Search" 
                            aria-label="Search" 
                            id="main-search"
                            onChange={handleInputChange}
                        /> 

                        {/* Search button; it's a search icon, form bootstrap icons */}
                        <span className="col-1 pt-1" id="search-button" onClick={sendSearch}><i className="bi bi-search"></i></span>

                    </form>

                </div>
            </section>
            <section>

                {/* 3 Unique vegan recipes displayed at bottom of page */}
                <div className="row row-cols-1 row-cols-md-3 g-4 mx-auto" id="home-pg-cards">
                    {unqRcp()}
                </div>

            </section>

        </div>
    );
}

export default Home;