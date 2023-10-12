import MyTable from "./MyTable";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import SearchList from "./SearchList";
import {useState} from "react";
import AddProductModal from "./AddProductModal";


const Home = ({data, error, isLoading}) => {
    const [results, setResults] = useState([]);
        const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'grey',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return(
        <main className="Home">
            <Box sx={{ width: '100%' }}>
                <Grid
                    container
                    direction="row"
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={2}>
                        <label>Products:</label>
                        <Item>{!results.length ? data.length: results.length}</Item>
                    </Grid>
                    <Grid
                        container
                        direction="column"
                        justifyContent="space-around"
                        alignItems="flex-end"
                    >
                        <button>
                            <AddProductModal />
                        </button>
                        <br/>
                    </Grid>
                </Grid>
            </Box>

            <SearchList
            data={data}
            setResults = {setResults}
            />

            {isLoading && <p className="statusMsg">Loading products</p>}
            {error && <p className="statusMsg" style={{color:"red"}}> {error}</p>}

            {!isLoading && !error && (results.length ?
                <MyTable data={results} /> : <MyTable data={data} /> )}

        </main>
    )
}

export default Home;
