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
        let arrStringify = JSON.stringify(arr);
        let gameOver = false;
        let totalArrLength = pcCor.length + userCor.length;
        
            arr.map((x)=>{
                if(arr.length>2){
                    if(x[0]===x[1]){
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
        
           });

        

        //updating pc coordinates
       if(!gameOver && totalArrLength%2!=0 && userCor.length>0){
        // console.log("odd")
        //document.getElementById("00").innerHTML = "O"
        let winPreventCount = 0;
        let arrLastVal = arr[(arr.length-1)];
        let blockIdsStringify = JSON.stringify(blockIds);
        let pcArrStringify = JSON.stringify(pcCor);
       //preventing the winning strike of user
        for(let i=-2;i<3;i++){
            if(i==0){
                continue;

            }
           
            for(let m=0;m<2;m++){
                // console.log(arrStringify.length);
                 //m=0 horizontal, m=1 vertical checking
                 if(arr.length>0 && arrStringify.includes([arrLastVal[0]+m*i,arrLastVal[1]+i*(1-m)])){
                    // console.log("came")
                    if(i==-1 || i==1){
                        for(let n=0;n<2;n++){
                            let id = (arrLastVal[0]+m*(-i+3*n*i)).toString() + (arrLastVal[1]+(-i+3*n*i)*(1-m)).toString();
                          
                            console.log(arr)
                            if(blockIdsStringify.includes(id) && winPreventCount<1 && !pcArrStringify.includes([arrLastVal[0]+m*(-(i)+3*n*i),arrLastVal[1]+(-(i)+3*n*i)*(1-m)])){
                                console.log(id)
                                document.getElementById(`${id}`).innerHTML = "O";
                                setPcCor([...pcCor,[arrLastVal[0]+m*(-(i)+3*n*i),arrLastVal[1]+(-(i)+3*n*i)*(1-m)]]);
                                winPreventCount++;
                            }
                            
                                
                            
                    
                        }
                        
                        

                    }
                    else if(arr.length>0 && (i==-2 || i==2)){
                        for(let n=0;n<2;n++){
                            let id = (arrLastVal[0]+m*(-1+(n*i))).toString() + (arrLastVal[1]+(-1+n*i)*(1-m)).toString();
                            console.log(id)
                            console.log(winPreventCount)
                            if(blockIdsStringify.includes(id) && winPreventCount<1 && !pcArrStringify.includes([arrLastVal[0]+m*(-1+n*i),arrLastVal[1]+(-1+n*i)*(1-m)])){
                                console.log(id)
                                document.getElementById(`${id}`).innerHTML = "O";
                                setPcCor([...pcCor,[arrLastVal[0]+m*(-1+n*i),arrLastVal[1]+(-1+n*i)*(1-m)]]);
                                winPreventCount++;
                            }

                        }

                    }

                }
                //diagonal checking
                if(winPreventCount<1 && arr.length>0){
                    if(arrStringify.includes([arrLastVal[0]+i,arrLastVal[1]+i-2*m*i])){
                        console.log("diagonal")
                        if(i==-1 || i==1){
                            for(let n=0;n<2;n++){
                                let id = (arrLastVal[0]+2*i-3*n*i).toString() + (arrLastVal[1]+(1-2*m)*(2*i-3*n*i)).toString();
                                console.log("1st"+id)
                                if(blockIdsStringify.includes(id) && winPreventCount<1 && !pcArrStringify.includes([arrLastVal[0]+2*i-3*n*i,arrLastVal[1]+(1-2*m)*(2*i-3*n*i)])){
                                    
                                    document.getElementById(`${id}`).innerHTML = "O";
                                    setPcCor([...pcCor,[arrLastVal[0]+2*i-3*n*i,arrLastVal[1]+(1-2*m)*(2*i-3*n*i)]]);
                                    winPreventCount++;
                                }
                            }


                        }
                        else if(i==-2 || i==2){
                            let id =  (arrLastVal[0]+(i/2)).toString() + (arrLastVal[1]+(i/2)-m*i).toString();
                            console.log("problem"+pcCor)
                            if(blockIdsStringify.includes(id) && winPreventCount<1 && pcArrStringify.includes([arrLastVal[0]+(i/2),arrLastVal[1]+(i/2)-m*i])!==true){
                                console.log(id)
                                document.getElementById(`${id}`).innerHTML = "O";
                                setPcCor([...pcCor,[arrLastVal[0]+(i/2),arrLastVal[1]+(i/2)-m*i]]);
                                winPreventCount++;
                            }
                            console.log(winPreventCount);

                        }

                    }

                }
                
               

            }
            

        }
        //adding a usual pc strike when no need of preventing the user win
        if(winPreventCount<1){
           
            // let blockCordinatesStringify = JSON.stringify(blockCordinates)
            let totalArr = pcCor.concat(userCor);
            let remainingArr = [];
            let pcPlayCount = 0;
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

    
                        if(i==-1 || i==1 && userCor.length>0){
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

