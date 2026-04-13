import PrayerIcon from "./PrayerIcon"


function MiniTime({name , time}) {
  const formatPeriod = (time) => {
  const [hours] = time.split(":");
  return parseInt(hours) < 12 ? "صباحاً" : "مساءً";
};
  return (
    <div className='mini-time active'>
    <div className='inner-name'>

      <h4>{name}</h4>
    </div>
     <div className='clock'>
        <span>{time.replace(/AM|PM/i, "")}</span>
        <span>{formatPeriod(time)}</span>
      </div>

      
     </div>
  )
}

export default MiniTime