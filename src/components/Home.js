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
        localStorage.setItem('search', searchQuery); // Stores the search query in local storage
        props.history.push({
            state: searchQuery,
            pathname: '/searchRes'
        }) // Assigns what the user searches to props.history.location.state & moves us to the search results page
    }

    const searchR = () => {

        let dataLen = datas.length
        let topCardsSet = new Set()
        while(topCardsSet.size < 3){
            topCardsSet.add(datas[Math.floor(Math.random() * dataLen)])
        }

        let topCardsArr = Array.from(topCardsSet)

        // gets search resalts & puts them into bootstrap cards
        return topCardsArr.map((data) => {
            
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
                <div className="row row-cols-1 row-cols-md-3 g-4 mx-auto" id="home-pg-cards">
                    {searchR()}
                </div>
            </section>

        </div>
    );
}

export default Home;