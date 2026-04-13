import { Sun, Moon, Sunrise, Sunset } from "lucide-react";

const PrayerIcon = ({ name }) => {
  switch(name) {
    case "Fajr": return <Sunrise />;
    case "Sunrise": return <Sunrise />;
    case "Dhuhr": return <Sun />;
    case "Asr": return <Sunset />;
    case "Maghrib": return <Sunset />;
    case "Isha": return <Moon />;
    default: return <Moon />;
  }
};

export default PrayerIcon

