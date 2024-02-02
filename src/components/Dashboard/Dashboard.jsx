import React, { useContext } from 'react'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { UserContext } from '../../contexts/UserContextProvider';
import SideBar from '../SideBar/SideBar';


const Dashboard = () => {
    // const {user} = useContext(UserContext);

    return (
        <Grid style={{ height: '100vh' ,width:'100vw', background:'red'}} container spacing={0}>
            <Grid style={{  background:'blue'}} xs={3}>
                {/* <SideBar/> */}
            </Grid>
            <Grid xs={9}>
                {/* {JSON.stringify(user)} */}
                <h2>Main Comp</h2>
            </Grid>
        </Grid>
    )
}


export default Dashboard;
