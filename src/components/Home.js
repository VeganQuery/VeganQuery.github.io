import React from 'react';

function Home (props) {

    let searchQuery = ''

    // Assigns input value to the variable searchQuery
    const handleInputChange = (e) => {
        searchQuery = e.target.value
        console.log(e.target.value)
    }

    // Executes when the search button is pressed
    const sendSearch = () => {
        localStorage.setItem('search', searchQuery); // Stores the search query in local storage
        props.history.push({
            state: searchQuery,
            pathname: '/searchRes'
        }) // Assigns what the user searches to props.history.location.state & moves us to the search results page
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
        </div>
    );
}

export default Home;