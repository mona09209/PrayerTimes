import MiniTime from './MiniTime';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { sudanStates } from '../data/SudanStates';

function Times() {
  const [time , SetTime] = useState({
    Fajr:"",
    Sunrise:"",
    Dhuhr:"",
    Asr:"",
    Maghrib:"",
    Isha:"",
    day: ""
  });

    const targetDate = new Date().toISOString().slice(0, 10);

  const [selectedState, setSelectedState] = useState(sudanStates[0]);
  const [selectedDate, setSelectedDate] = useState(targetDate);

  const toDDMMYYYY = (yyyy_mm_dd)=> {
    const [y , m ,d ] = yyyy_mm_dd.split("-");
    return `${d}-${m}-${y}`;
  }

  const getData = async () => {
    const dateForApi = toDDMMYYYY(selectedDate);

  const  res = await axios.get(`https://api.aladhan.com/v1/timingsByCity/${dateForApi}?country=${selectedState.country}&city=${selectedState.city}`);
    console.log(res.data.data.timings);
    const Fajr = res.data.data.timings.Fajr;
    const Sunrise = res.data.data.timings.Sunrise;
    const Dhuhr = res.data.data.timings.Dhuhr;
    const Asr = res.data.data.timings.Asr;
    const Maghrib = res.data.data.timings.Maghrib;
    const Isha = res.data.data.timings.Isha;
    const day = res.data.data.date.gregorian.date;

    SetTime({
      Fajr: Fajr,
      Sunrise: Sunrise,
      Dhuhr: Dhuhr,
      Asr: Asr,
      Maghrib: Maghrib,
      Isha: Isha,
      day: day
    });
  }

  useEffect(()=>{
    getData();
  },[selectedState, selectedDate]);
  return (
    <div className='main-box'>

  <div>
      <div className='states' >
    
    <select name="state" id="state" onChange={(e) => setSelectedState(sudanStates.find(state => state.city === e.target.value))}>
      {sudanStates.map((state) => (
        <option key={state} value={state.city}>{state.nameAr}</option>
      ))}
    </select>
    </div>
    <h1>برنامج مواقيت الصلاة</h1>
    <div className='date'>
    <input className='input-date' value={selectedDate} type="date" onChange={(e) => setSelectedDate(e.target.value)} />
    </div>
  </div>


  
   
    <h2> مواقيت الصلاة حسب التوقيت المحلي لمدينة   <span className='state-name'>{selectedState.nameAr}</span></h2>
    <h3>{selectedDate}</h3>
    <div className='container'>
    <MiniTime name='الفجر' time = {time.Fajr}/>
    <MiniTime name='الشروق' time ={time.Sunrise}/>
    <MiniTime name='الظهر' time = {time.Dhuhr}/>
    <MiniTime name='العصر' time = {time.Asr}/>
    <MiniTime name='المغرب' time = {time.Maghrib}/>
    <MiniTime name='العشاء' time = {time.Isha}/>

    </div>
    <div>
      
    </div>
    </div>
  )
}

export default Times


