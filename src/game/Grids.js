import React,{useState,useEffect,useMemo,useLayoutEffect} from 'react';


function Grids({children}){
    const[userCor, setUserCor] = useState([]);
    const[pcCor, setPcCor] = useState([]);
    const[userStrike,setUserStrike] = useState(false)
    const[pcStrike,setPcStrike] = useState(false)
    const blockCordinates = [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]];
    var blockIds = [];
    let createBlockIds = ()=>{
       
        blockCordinates.map((x,index)=>{
          return blockIds[index] =  [x[0].toString() + x[1].toString()]
        })

    }
    createBlockIds();
   
    useEffect(()=>{return findStrike(userCor,setUserStrike)},[userCor]);
    // useLayoutEffect(()=>{return updatePcCordinates()},[userCor])
    useEffect(()=>{return findStrike(pcCor,setPcStrike)},[pcCor]);
    useEffect(()=>{return winner(userStrike)},[userStrike]);
    useEffect(()=>{return winner(pcStrike)},[pcStrike]);

    const winner = (strike)=>{
     if(strike!=false){
        strike==userStrike?console.log("User wins") : console.log("Computer wins")
       

     }
    }

    const findStrike = (arr,strike)=>{
        let gameOver = false;
        arr.map((x)=>{
            if(arr.length>2){
                if(x[0]===x[1]){
                    let arrStringify = JSON.stringify(arr);
                    //vertical crossing from [1,1]
                    if(arrStringify.includes(`[${x[0]},${x[1]-1}]`) && arrStringify.includes(`[${x[0]},${x[1]+1}]`)){
                        strike(true)
                        gameOver = true;
                    }
                    if(!gameOver){
                        //from [0,0] && [2,2]
                        for(let i=-1;i<1;i++){
                            if((arrStringify.includes(`[${x[0]-1-2*i},${x[1]}]`) && arrStringify.includes(`[${x[0]-2-4*i},${x[1]}]`))||(arrStringify.includes(`[${x[1]},${x[0]-1-2*i}]`) && arrStringify.includes(`[${x[1]},${x[0]-2-4*i}]`))){
                                strike(true)
                                gameOver = true;

                            }

                        }
                    }
                     if(!gameOver){   //from [1,1] to 1 horizontal crossing other including 2 diagonal crossings
                        for(let i=-1;i<2;i++){
                            if(arrStringify.includes(`[${x[0]-1},${x[1]+i}]`) && arrStringify.includes(`[${x[0]+1},${x[1]-i}]`)){
                                strike(true)
                                gameOver = true;
                            }


                        }
                    }



                

                }
          
        
            
         

       
                }
    
       })
       //updating pc coordinates
       if(!gameOver && arr!==pcCor){
        // console.log(gameOver)
        //document.getElementById("00").innerHTML = "O"
       let pcStrikeCount = 0;
        arr.map((x)=>{
                let arrStringify = JSON.stringify(arr);
                let blockIdsStringify = JSON.stringify(blockIds);
                let pcArrStringify = JSON.stringify(pcCor);

                for(let i=-2;i<3;i++){
                    //m=0 horizontal, m=1 vertical checking
                    for(let m=0;m<2;m++){
                        if(arrStringify.includes([x[0]+m*i,x[1]+i*(1-m)])){
                            if(i==-1 || i==1){
                                for(let n=0;n<2;n++){
                                    let id = (x[0]+m*(-i+3*n*i)).toString() + (x[1]+(-i+3*n*i)*(1-m)).toString();
                                    console.log(pcStrikeCount)
                                    if(blockIdsStringify.includes(id) && pcStrikeCount<1 && !pcArrStringify.includes([x[0]+m*(-i+3*n*i),x[1]+(-i+3*n*i)*(1-m)])){
                                        console.log(id)
                                        document.getElementById(`${id}`).innerHTML = "O";
                                        setPcCor([...pcCor,[x[0]+m*(-(i)+3*n*i),x[1]+(-(i)+3*n*i)*(1-m)]]);
                                        pcStrikeCount++;
                                    }
                            
                                }
                                
                                

                            }
                            else if(i==-2 || i==2){
                                for(let n=0;n<2;n++){
                                    let id = (x[0]+m*(-1+(n*i))).toString() + (x[1]+(-1+n*i)*(1-m)).toString();
                                    // console.log(id)
                                    console.log(pcStrikeCount)
                                    if(blockIdsStringify.includes(id) && pcStrikeCount<1 && !pcArrStringify.includes([x[0]+m*(-1+(n*i)),x[1]+(-1+n*i)*(1-m)])){
                                        console.log(id)
                                        document.getElementById(`${id}`).innerHTML = "O";
                                        setPcCor([...pcCor,[x[0]+m*(-1+n*i),x[1]+(-1+n*i)*(1-m)]]);
                                        pcStrikeCount++;
                                    }

                                }

                            }

                        }

                    }

                }

                //}




 
            

        })

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
  
    return(
        <>
       
         <div className={`block col-4 border border-dark text-dark text-center`} onClick={(e)=>blockClick(e)} cor_x = "0" cor_y = "0" id="00"></div>
         <div className={`block col-4 border border-dark text-dark text-center`} onClick={(e)=>blockClick(e)} cor_x = "1" cor_y = "0" id="10"></div>
         <div className={`block col-4 border border-dark text-dark text-center`} onClick={(e)=>blockClick(e)} cor_x = "2" cor_y = "0" id="20"></div>
         <div className={`block col-4 border border-dark text-dark text-center`} onClick={(e)=>blockClick(e)} cor_x = "0" cor_y = "1" id="01"></div>
         <div className={`block col-4 border border-dark text-dark text-center`} onClick={(e)=>blockClick(e)} cor_x = "1" cor_y = "1" id="11"></div>
         <div className={`block col-4 border border-dark text-dark text-center`} onClick={(e)=>blockClick(e)} cor_x = "2" cor_y = "1" id="21"></div>
         <div className={`block col-4 border border-dark text-dark text-center`} onClick={(e)=>blockClick(e)} cor_x = "0" cor_y = "2" id="02"></div>
         <div className={`block col-4 border border-dark text-dark text-center`} onClick={(e)=>blockClick(e)} cor_x = "1" cor_y = "2" id="12"></div>
         <div className={`block col-4 border border-dark text-dark text-center`} onClick={(e)=>blockClick(e)} cor_x = "2" cor_y = "2" id="22"></div>
    
        </>
    
    );

}
export default Grids;

