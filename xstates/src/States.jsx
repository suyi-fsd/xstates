import { useState, useEffect } from "react";

function Xstates(){
    const [countries,setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const COUNTRIES_ENDPOINT = 'https://crio-location-selector.onrender.com/countries';
    useEffect(()=>{
        fetch(COUNTRIES_ENDPOINT)
        .then((response)=> response.json())
        .then((data)=> setCountries(data))
        .catch((e)=>{
            console.error("Error fetching countries",e);
        });
    },[]);
    useEffect(()=>{
        if(selectedCountry){
        fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
        .then((response)=> response.json())
        .then((data)=>{ setStates(data);
            setSelectedState("");
            setCities([]);
            setSelectedCity("");
        })
        .catch((e)=>{
            console.error("Error fetching states",e);
        });
    }
    },[selectedCountry])

     useEffect(()=>{
        if(selectedCountry && selectedState){
            fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
        .then((response)=> response.json())
        .then((data)=>{setCities(data);
                        setSelectedCity("");
        })
        .catch((e)=>{
            console.error("Error fetching cities",e);
        });
        }
        
    },[selectedCountry,selectedState])
    return(
        <div style={{fontFamily:"sans-serif"}}>
        <h1 style={{textAlign:'center'}}>Select Location</h1>
        <div style={{textAlign:"center"}}>
             <select style={{padding:"10px", margin:"10px"}} name="Countries" id="Countries" 
        value={selectedCountry} 
        onChange={(e)=>setSelectedCountry(e.target.value)}>
            <option value="" disabled>Select Country</option>
            {countries.map((country)=>
                <option key={country} value={country}>{country}</option>
            )}
        </select>
        <select style={{padding:"10px", margin:"10px"}} name="States" id="States" disabled={!selectedCountry}
        value={selectedState} 
        onChange={(e)=>setSelectedState(e.target.value)}>
            <option value="" disabled>Select State</option>
            {states.map((state)=>
                <option key={state} value={state}>{state}</option>
            )}
        </select>
        <select style={{padding:"10px", margin:"10px"}} name="Cities" id="Cities" disabled={!selectedState} 
        value={selectedCity} 
        onChange={(e)=>setSelectedCity(e.target.value)}>
            <option value="" disabled>Select City</option>
            {cities.map((city)=>
                <option key={city} value={city}>{city}</option>
            )}
        </select>
        </div>
       
        {selectedCity && (
            <div style={{textAlign:"center"}}>
                 <h3>You selected <span style={{ fontSize:"30px" }}>{selectedCity}</span>
            <span style={{color:"grey"}}>, {selectedState}, {selectedCountry}</span></h3>
            </div>
           
        )}
        </div>
    )
}
export default Xstates;