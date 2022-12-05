import React,{useState,useEffect,useMemo,useLayoutEffect} from 'react';


function Grids({children}){
    const[userCor, setUserCor] = useState([]);
    const[pcCor, setPcCor] = useState([0,0]);
    const[userStrike,setUserStrike] = useState(false)
    const[pcStrike,setPcStrike] = useState(false)

    useLayoutEffect(()=>{return findStrike(userCor,setUserStrike)},[userCor]);
    useEffect(()=>{return findStrike(pcCor,setPcStrike)},[pcCor]);

    const findStrike = (arr,strike)=>{
        arr.map((x)=>{
            if(arr.length>2){
                if(x[0]===x[1]){
                    let arrStringify = JSON.stringify(arr);
                    //vertical crossing from [1,1]
                    if(arrStringify.includes(`[${x[0]},${x[1]-1}]`) && arrStringify.includes(`[${x[0]},${x[1]+1}]`)){
                        strike(true)
                        console.log("userstrike")
                    }
                    else{
                        //from [0,0] && [2,2]
                        for(let i=-1;i<1;i++){
                            if((arrStringify.includes(`[${x[0]-1-2*i},${x[1]}]`) && arrStringify.includes(`[${x[0]-2-4*i},${x[1]}]`))||(arrStringify.includes(`[${x[1]},${x[0]-1-2*i}]`) && arrStringify.includes(`[${x[1]},${x[0]-2-4*i}]`))){
                                strike(true)
                                console.log("userstrike")

                            }

                        }
                        //from [1,1] to 1 horizontal crossing other including 2 diagonal crossings
                        for(let i=-1;i<2;i++){
                            if(arrStringify.includes(`[${x[0]-1},${x[1]+i}]`) && arrStringify.includes(`[${x[0]+1},${x[1]-i}]`)){
                                strike(true)
                                console.log("userstrike")
                            }


                        }
                    }



                

                }
          
        
            
         

       
                }
    
       })
        if(arr===pcCor && strike==false){
            document.getElementById("00").innerHTML = "O";
           
       
        }

    }



    const blockClick = (e)=>{
        if(e.currentTarget.innerHTML.trim() != ""){
            e.preventDefault()

        }
        else{
           
            setUserCor([...userCor,[Number(e.currentTarget.getAttribute("cor_x")),Number(e.currentTarget.getAttribute("cor_y"))]]);
            e.currentTarget.innerHTML = "x";
        }
        
     
    }
    const renderPcMoves = (e) =>{
        // e.currentTarget.innerHTML = "O";
         console.log("called");
    }
    return(
        <>
       
         <div className={`block col-4 border border-dark text-dark text-center`} onClick={(e)=>blockClick(e)} cor_x = "0" cor_y = "0" id="00"></div>
         <div className={`block col-4 border border-dark text-dark text-center`} onClick={(e)=>blockClick(e)} cor_x = "1" cor_y = "0"></div>
         <div className={`block col-4 border border-dark text-dark text-center`} onClick={(e)=>blockClick(e)} cor_x = "2" cor_y = "0"></div>
         <div className={`block col-4 border border-dark text-dark text-center`} onClick={(e)=>blockClick(e)} cor_x = "0" cor_y = "1"></div>
         <div className={`block col-4 border border-dark text-dark text-center`} onClick={(e)=>blockClick(e)} cor_x = "1" cor_y = "1"></div>
         <div className={`block col-4 border border-dark text-dark text-center`} onClick={(e)=>blockClick(e)} cor_x = "2" cor_y = "1"></div>
         <div className={`block col-4 border border-dark text-dark text-center`} onClick={(e)=>blockClick(e)} cor_x = "0" cor_y = "2"></div>
         <div className={`block col-4 border border-dark text-dark text-center`} onClick={(e)=>blockClick(e)} cor_x = "1" cor_y = "2"></div>
         <div className={`block col-4 border border-dark text-dark text-center`} onClick={(e)=>blockClick(e)} cor_x = "2" cor_y = "2"></div>
    
        </>
    
    );

}
export default Grids;