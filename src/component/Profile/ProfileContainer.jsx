import React from 'react';
import { useParams } from 'react-router-dom';
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUsersProfile} from "../../redux/profile-reducer";

export function withRouter(Children){
    return(props)=>{

        const match  = {params: useParams()};
        return <Children {...props}  match = {match}/>
    }
}

class ProfileContainer extends React.Component{

    componentDidMount() {
        debugger
        let userId=this.props.match.params.userId
        if (!userId) {userId=27309;}
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/`+userId).then(response=>{

            this.props.setUsersProfile(response.data);
        })
    }

    render() {
       return <div>
           <Profile {...this.props} profile={this.props.profile}/>
       </div>
   }


}

let mapStateToProps=(state)=>({
    profile:state.profilePage.profile
})

let withURLData= withRouter(ProfileContainer);

export default connect(mapStateToProps,{setUsersProfile})(withURLData) ;
