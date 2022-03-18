import React, {useState, useEffect} from "react";
import CardList from "./CardList";
import SearchBox from './SearchBox';
import Loading from "./Loading";
import Pagination from './Pagination';
import NoResults from "./NoResults";

function App() {

// ============ setting the initial states for items and search ============
    const [items,
        setItems] = useState([]);
    const [search,
        setSearch] = useState("");

// ============ fetching the data from API and store values ============
    useEffect(() => {
        fetchItems()
    }, []);

    const fetchItems = async() => {
        const data = await fetch('http://cosmic-elastic.eu.ngrok.io/shakespeare/_search?size=100');
        const itemsObj = await data.json();
        const items = itemsObj.hits.hits;


// ============ store just fetched items in an array ============
        setItems(items);
    }

// ============ filtering the plays according to the input ============
    const filteredPlays = items.filter((play) => {
        return play
            ._source
            .text_entry
            .toLowerCase()
            .includes(search.toLowerCase());
    });

// ============ pagination ============
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPlays.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);

// ============ rendering the App ============ 
    let noItems = !items.length;
    let noPlays = !filteredPlays.length;
// !filteredPlays.length && <NoResults />


    return noItems ? <Loading/> : (
        
            <div className="App">
                <h1 className="heading">Shakespeare Work Library</h1>
                <div className="app-body">

                    <SearchBox searchChange={(event) => setSearch(event.target.value)}/> 
                    
                    {noPlays ? <NoResults /> : <CardList plays={currentPosts}/> }

                    <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={filteredPlays.length}
                        paginate={paginate}/>
                </div>
            </div>
        );
}

export default App;
