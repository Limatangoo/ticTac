import React,{useEffect, useState, useMemo} from 'react';

function Testing(){
    const [name, setName] = useState("akila");
    const [age, setAge] = useState(0);
    const [arr, setArr] = useState([]);
    const nameChange = () =>{
        setName("pasan");
    }
    const ageChange = () =>{
      setAge(26);
      
    }
    const addArray = () =>{
        setArr([...arr,[0,0]])
        console.log(arr);
      }
      const addArray2 = () =>{
        setArr([...arr,[1,1]])
        console.log(arr);
        
      }
    useEffect(()=>{console.log(name)},[name]);
    // useMemo(()=>{console.log(name)},[name])

    return (
        <>
        
        <button className={`btn-primary`} onClick={addArray}> Click to add arr </button>
        <button className={`btn-primary mt-5`} onClick={addArray2}> Click to arr2 </button>
        </>
    )

}

export default Testing;