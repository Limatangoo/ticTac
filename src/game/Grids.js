import React,{useState,useEffect,useMemo,useLayoutEffect, useCallback} from 'react';


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
    const blockClick = (e)=>{
        if(e.currentTarget.innerHTML.trim() != ""){
            e.preventDefault()

        }
        else{
           
            setUserCor([...userCor,[Number(e.currentTarget.getAttribute("cor_x")),Number(e.currentTarget.getAttribute("cor_y"))]]);
            e.currentTarget.innerHTML = "x";
        }
        
     
    }
    let pcPlayCount = 0;
    let gameOver = false;
    useEffect(()=>{findStrike(pcCor,setPcStrike)},[userCor]);
    useEffect(()=>{findStrike(userCor,setUserStrike)},[userCor]);
    useMemo(()=>{findWinner(userCor,setPcStrike)},[userCor]);
    useMemo(()=>{findWinner(pcCor,setPcStrike)},[pcCor]);

    // findStrike(pcCor,setPcStrike)
    // findStrike(userCor,setUserStrike)
    function findWinner(arr,strike){
        let arrLastVal = arr[(arr.length-1)];
        let arrStringify = JSON.stringify(arr);
        arr.map((x)=>{
            if(arr.length>2){
                if(x[0]===x[1]){
                    //vertical crossing from [1,1]
                    if(arrStringify.includes(`[${x[0]},${x[1]-1}]`) && arrStringify.includes(`[${x[0]},${x[1]+1}]`)){
                        strike(true)
                        gameOver = true;
                        let winner =  document.getElementById(`winner`);
                        arr==pcCor?winner.innerHTML="Computer wins":winner.innerHTML="You won"
                    }
                    if(!gameOver){
                        //from [0,0] && [2,2]
                        for(let i=-1;i<1;i++){
                            if((arrStringify.includes(`[${x[0]-1-2*i},${x[1]}]`) && arrStringify.includes(`[${x[0]-2-4*i},${x[1]}]`))||(arrStringify.includes(`[${x[1]},${x[0]-1-2*i}]`) && arrStringify.includes(`[${x[1]},${x[0]-2-4*i}]`))){
                                strike(true)
                                gameOver = true;
                                let winner =  document.getElementById(`winner`);
                                arr==pcCor?winner.innerHTML="Computer wins":winner.innerHTML="You won"

                            }

                        }
                    }
                     if(!gameOver){   //from [1,1] to 1 horizontal crossing other including 2 diagonal crossings
                        for(let i=-1;i<2;i++){
                            if(arrStringify.includes(`[${x[0]-1},${x[1]+i}]`) && arrStringify.includes(`[${x[0]+1},${x[1]-i}]`)){
                                strike(true)
                                gameOver = true;
                                let winner =  document.getElementById(`winner`);
                                arr==pcCor?winner.innerHTML="Computer wins":winner.innerHTML="You won"
                            }


                        }
                    }



                

                }
          
        
            
         

       
                }
    
       });

    }
    
    function findStrike (arr,strike){
        let arrStringify = JSON.stringify(arr);
        let totalArrLength = pcCor.length + userCor.length;
        let totalArr = pcCor.concat(userCor);
        let totalArrStringify = JSON.stringify(totalArr)
        let arrLastVal = arr[(arr.length-1)];



           let winPreventCount;
           //preventing final wiinig strike of user
            (function winPrevent(){
                 
                if(!gameOver &&  userCor.length>0 && pcPlayCount<1){
    
    
    
                    //document.getElementById("00").innerHTML = "O"
                    let blockIdsStringify = JSON.stringify(blockIds);
                    // let pcArrStringify = JSON.stringify(pcCor);
                    //preventing the winning strike of user
                     
                    for(let m=0;m<2;m++){
                        for(let i=-2;i<3;i++){
                            
                            if(i===0){
                                continue;
                
                            }
                            
            
                                 //m=0 vertical, m=1 horizontal checking
                                    if(arr.length>0 && arrStringify.includes([arrLastVal[0]+m*i,arrLastVal[1]+i*(1-m)])){
                                    console.log(`arrtype:${arr}`)
                                    // console.log("came")
                                    if(i==-1 || i==1){
                                       
                                        for(let n=0;n<2;n++){
                                            let id = (arrLastVal[0]-(m*i*(1-(3*n)))).toString() + (arrLastVal[1]-((1-m)*i*(1-(3*n)))).toString();
                                            
                                            if(blockIdsStringify.includes(id) && winPreventCount===undefined && !totalArrStringify.includes([arrLastVal[0]-(m*i*(1-(3*n))),arrLastVal[1]-((1-m)*i*(1-(3*n)))])){
                                                
                                                document.getElementById(`${id}`).innerHTML = "O";
                                                setPcCor([...pcCor,[arrLastVal[0]-(m*i*(1-(3*n))),arrLastVal[1]-((1-m)*i*(1-(3*n)))]]);
                                                winPreventCount=1;
                                                pcPlayCount++;
                                                
                                            }
                                            
                                                
                                            
                                    
                                        }
                                        
                                        
                
                                    }
                                    else if(i==-2 || i==2){
                                            let id = (arrLastVal[0]+m*(i/2)).toString() + (arrLastVal[1]+(i/2)*(1-m)).toString();
                                            
                                        
                                            if(blockIdsStringify.includes(id) && winPreventCount===undefined && !totalArrStringify.includes([arrLastVal[0]+m*(i/2),arrLastVal[1]+(i/2)*(1-m)])){
                                                console.log(id)
                                                document.getElementById(`${id}`).innerHTML = "O";
                                                setPcCor([...pcCor,[arrLastVal[0]+m*(i/2),arrLastVal[1]+(i/2)*(1-m)]]);
                                                winPreventCount=1;
                                                pcPlayCount++;
                                            }
                
                                        
                
                                    }
                
                                }
                                //diagonal checking
                                if(winPreventCount===undefined && arr.length>0){
                                    //m=0 diagonal array startng from 0,0 & m=1 diagonal array starting from 2,0
                                    if(arrStringify.includes([arrLastVal[0]+i,arrLastVal[1]+i-2*m*i])){
                                        
                                        if(i==-1 || i==1){
                                            for(let n=0;n<2;n++){
                                                let id = (arrLastVal[0]+(2*i-(3*n*i))).toString() + (arrLastVal[1]+(1-2*m)*(2*i-(3*n*i))).toString();
                                                
                                                if(blockIdsStringify.includes(id) && winPreventCount===undefined && !totalArrStringify.includes([arrLastVal[0]+(2*i-(3*n*i)),arrLastVal[1]+(1-2*m)*(2*i-(3*n*i))])){
                                                    
                                                    document.getElementById(`${id}`).innerHTML = "O";
                                                    setPcCor([...pcCor,[arrLastVal[0]+(2*i/(3*n+1)),arrLastVal[1]+(1-2*m)*(2*i/(3*n+1))]]);
                                                    winPreventCount=1;
                                                    pcPlayCount++;
                                                }
                                            }
                
                
                                        }
                                        else if(i==-2 || i==2){
                                            let id =  (arrLastVal[0]+(i/2)).toString() + (arrLastVal[1]+(i/2)-m*i).toString();
                                            
                                            if(blockIdsStringify.includes(id) && winPreventCount===undefined && !totalArrStringify.includes([arrLastVal[0]+(i/2),arrLastVal[1]+(i/2)-m*i])){
                                            
                                                document.getElementById(`${id}`).innerHTML = "O";
                                                setPcCor([...pcCor,[arrLastVal[0]+(i/2),arrLastVal[1]+(1-2*m)*(i/2)]]);
                                                winPreventCount=1;
                                                pcPlayCount++;
                                            }
                                            
                
                                        }
                
                                    }
                
                                }
                                
                                
                
                            }
                            
                
                        }

                    }

                    (function normalPcStrike(){
                        //adding a usual pc strike when no need of preventing the user win
                        if(!gameOver && winPreventCount===undefined && arr!==pcCor && userCor.length>0 && pcPlayCount<1){
        
                            console.log(`win preventCount:${winPreventCount}`)
                                // let blockCordinatesStringify = JSON.stringify(blockCordinates)
                                let remainingArr = [];
                            
                                blockCordinates.map(element1 => {
                                    let found = 0;
                                    totalArr.map(element2 => {
                                    if (element1[0] === element2[0] && element1[1] === element2[1]) {
                                        found = 1;
                                    }
                                    });
                    
                                    if(found==0){
                                        remainingArr.push([element1[0],element1[1]]);
                                        
                    
                                    }
                                });
                                if(pcPlayCount<1){
                                    let remainingArrStringify = JSON.stringify(remainingArr);
                                    for(let i=-2;i<3;i++){
                                        if(i==0){
                                            continue;
                            
                                        }
                    
                        
                                            if(i==-1 || i==1){
                                                //set up center block when user clicks corner and vice versa
                                                let userCorLast = userCor[(userCor.length-1)];
                                                    for(let n=0;n<2;n++){
                                                        let id = (userCorLast[0]+i-2*n*i).toString() + (userCorLast[1]+i).toString();
                                                        if(remainingArrStringify.includes(id) && pcPlayCount<1){
                                                            document.getElementById(`${id}`).innerHTML = "O";
                                                            setPcCor([...pcCor,[userCorLast[0]+i-2*n*i,userCorLast[1]+i]]);
                                                            pcPlayCount++;
                                                        }
                                                    
                                                    }
                                                    if(pcPlayCount<1){
                                                        let id = (remainingArr[0][0]).toString() + (remainingArr[0][1]).toString();
                                                        document.getElementById(`${id}`).innerHTML = "O";
                                                        setPcCor([...pcCor,[remainingArr[0][0],remainingArr[0][1]]]);
                                                        pcPlayCount++;
                    
                    
                                                    }
                                                    
                                            
                    
                    
                                            }
                                        
                    
                                                
                            
                                            
                    
                                        
                    
                    
                                    }
                                }
                                
                                
                            }
        
                    })()
                    

            })()

               

         

                

                          
            
            
            
            
             
                        
            
            
                   
                   

 

        



        


        

       

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
         <div className={`mt-3`}>
            <h2 id="winner"></h2>
        </div>
        </>
       
        
       
         
    );

}
export default Grids;

