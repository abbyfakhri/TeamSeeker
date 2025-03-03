import { useEffect, useState } from "react"
import DetailModal from "./DetailModal"
import axios from "axios"
import { BASE_URL } from "../api/endpoints"


const MatchList = ({matchList,userNameData,setMatchList,testMatchList}) =>{

    if(matchList == {} || matchList == undefined) return ('no match yet')

    const [isOpenUserDetailModalOpen, setIsUserDetailModalOpen] = useState(false)

    const [currentData,setCurrentData] = useState({})

    const clickProfilePict = (data) =>{

        setCurrentData(data)
        setIsUserDetailModalOpen(true)

        console.log('click modal detail')

    }

    const removeUser = (usernameInput) => {
        setMatchList(matchList => matchList.filter(user => user.userName !== usernameInput));
    };

    

    const unmatchHandler = async() => {
        
        const deleteData = 
        {
            "usernameTeam":userNameData,
            "usernameApplicant":currentData.userName
        }

        console.log('team username:',deleteData.usernameTeam)
        console.log('applicant username:',deleteData.usernameApplicant)


        const response = await axios.delete(BASE_URL+'/delmatch',{ data: deleteData })

        if(response.data.message == "Match deleted successfully"){

            removeUser(currentData.userName)

            /* removeDuplicate();

            console.log('current match list:',matchList) */

            setIsUserDetailModalOpen(false)

            console.log("just remove")
            
            return
        }
        
    }

    const removeDuplicates = () => {
        const uniqueUserNames = new Set();
        const filteredList = matchList.filter(item => {
          if (uniqueUserNames.has(item.userName)) {
            return false; // Duplicate userName, filter it out
          } else {
            uniqueUserNames.add(item.userName);
            return true; // Unique userName, keep it in the filtered array
          }
        });
        setMatchList(filteredList);
      };


    return(
        <>
            <div className="match-list-container">

            {
                matchList.map(match =>{
                return(

                    <div key = {match.id} className="match-list-holder">

                        <img className="match-list-image-holder"
                        onClick={() => clickProfilePict(match)} 
                        src="https://100k-faces.glitch.me/random-image"/>

                        <p style={{ color: 'white' }}>{match.userName}</p>

                    </div>
                    
                )
            })}

            <DetailModal
                matchList = {matchList}
                cardData = {currentData} 
                open={isOpenUserDetailModalOpen}
                unmatchHandler = {unmatchHandler} 
                onClose={() => setIsUserDetailModalOpen(false)}
            />

            </div>
        </>
    )
}

export default MatchList