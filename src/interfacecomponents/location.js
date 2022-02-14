import React, { useState } from "react";
import { IoHomeOutline } from 'react-icons/io5'
import { Country, State, City } from 'country-state-city';
import Select from "react-select";
import { Form } from "react-bootstrap";


export default function Location({setLocation}){
    
      const [country,setCountry] = useState({
        isoCode:"",
        name: ""
      })
      const [state,setState] = useState({
        isoCode:"",
        name: ""
      })
      const customStyles = {
        menu: (provided, state) => ({
          ...provided,
          // width: state.selectProps.width,
          zIndex: '100'
        }),
      
        singleValue: (provided, state) => {
          const opacity = state.isDisabled ? 0.5 : 1;
          const transition = 'opacity 300ms';
      
          return { ...provided, opacity, transition };
        }
      }
    
      const countries = Country.getAllCountries();
      const updatedCountries = countries.map((country) => ({
        label: `${country.flag} ${country.name}`,
        value: country.name,
        ...country
      }));
      const updatedStates = (countryId) =>
        State
          .getStatesOfCountry(countryId)
          .map((state) => ({ label: state.name, value: state.name, ...state }));
    
      const updatedCities = (countryId,stateId) =>
        City
          .getCitiesOfState(countryId,stateId)
          .map((city) => ({ label: city.name, value: city.id, ...city }));  
    return(
        <>
        <div className='col-10'>
            <div className='d-flex align-items-start justify-content-center mt-2'>
              <div className="mx-1 mb-1">
                <IoHomeOutline />
              </div>
              <div>
                <span>Location </span>
              </div>
            </div>
          </div>
          <div className="col-10">
            <Form.Group>
                <Select 
                  id="country"
                  name="country"
                  label="country"
                  styles={customStyles}
                  options={updatedCountries}
                  onChange={(value) => {
                    setCountry({name:value.name,isoCode:value.isoCode});
                    setLocation({country:value.name,state:" ",city:" "})
                  }}
                  menuColor = "red"
                  closeMenuOnScroll = {true}
                />
                {country.name ? 
                <Select
                  id="state"
                  name="state"
                  styles={customStyles}
                  options={updatedStates(country.isoCode)}
                  onChange={(value) => {
                    setState({name:value.name,isoCode:value.isoCode});
                    setLocation({country:country.name,state:value.name,city:" "})
                  }}
                /> : null }
                {country.name || state.name ? 
                <Select
                  id="city"
                  name="city"
                  styles={customStyles}
                  options={updatedCities(country.isoCode,state.isoCode)}
                  onChange={(value) => {
                    setLocation({country: country.name,state: state.name, city: value.name});
                  }}
                />:null }
            </Form.Group>
          </div>
          </>
    )
}
