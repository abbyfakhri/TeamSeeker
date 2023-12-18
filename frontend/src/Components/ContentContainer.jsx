import { useEffect, useState } from "react"
import "../styles/main-page.css"
import Card from "./Card"
import userData from "../../dummyData/userData"
import axios from "axios"
import yes_icon from '../assets/yes_icon.png'
import no_icon from '../assets/no_icon.png'
import { BASE_URL } from "../api/endpoints"


const ContentContainer = ({matchList,setMatchList,userNameData}) =>{

    const applicantNotFound = {
        "name": "No Applicant Available",
        "profileImageUrl": "",
        "institution": "",
        "description": "",
        "expertise": ["", ""],
        "location": ""
    }

    const [listCandidate,setListCandidate] = useState([])

    const [count,setCount] = useState(0)


    const [cardData, setCardData] = useState({})

    const filterListCandidateWithMatchList = async (candidateList) => {

        try {
            const requestBody = {
                "usernameTeam": userNameData,
              };
          
            const response = await axios.post(BASE_URL+'/matches', requestBody);
          
            const matchListResponse = response.data.userNameApplicants;

            const uniqueCandidateList = candidateList.filter(candidateItem =>
                !matchListResponse.some(matchItem =>
                    matchItem === candidateItem.userName
                )
            );
    
            setCardData(uniqueCandidateList[0])
            console.log('unique candidate list: ', uniqueCandidateList)
      
            // Update the state with the unique candidateList
            return uniqueCandidateList 
        } catch (error) {
            console.log('error:',error)
        }
        
    }


    const getListOfCandidates = async () =>{
        try {
            const response = await axios.get(BASE_URL+`/home/${userNameData}`)
            console.log('skills applicant:',response.data.applicantBySkills)

            setListCandidate(await filterListCandidateWithMatchList(response.data.applicantBySkills))
            
        } catch (error) {
            console.log('error:',error)
        }

    }

    const match = async() => {
        
        if(count <= listCandidate.length){

            const matchUserData = {

                "userNameTeam":userNameData,
                "userNameApplicants":listCandidate[count].userName
            }

            try {

                const response = await axios.post(BASE_URL+'/matched',matchUserData)

                if(response.data.message == 'Matching Successful!'){


                    setCardData(listCandidate[count+1]);
    
                    listCandidate[count].id = crypto.randomUUID()
        
                    setMatchList(currentList =>{
                        return [
                            ...currentList,
                            listCandidate[count]
                        ]
                    })
    
                    setCount(count+1);
    
                    console.log('adding match success')
    
                }
                
            } catch (error) {
                console.log('error:',error)
                return;
            }


        }

        if(count == listCandidate.length){
            
            setCardData(applicantNotFound)
        }

    };

    const notMatch = () =>{
        if(count < listCandidate.length){
            setCardData(listCandidate[count+1]);
            setCount(count+1);
        }
    }

    useEffect(() => {
      getListOfCandidates()
    }, [])

    
    

    return(
        <>
        <div className="content-container">
        
            <div className="inner-content-container">

                <div className="title-container">
                    Choose your Next Teammate
                </div>

                <Card cardData = {cardData}/>

                {
                    count < listCandidate.length ? (
                        <div className = "option-container">
                        
                            <button onClick={notMatch}  className="no-btn">
                                <img src = {no_icon}/>
                            </button>

                            <button onClick={match} className="yes-btn">
                                <img src = {yes_icon}/>
                            </button>

                        </div>
                    ) : <div></div>
                }

                

            </div>

        
        </div>

        </>
    )
}

export default ContentContainer