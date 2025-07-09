import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Search, MapPin, AlertTriangle, CheckCircle } from "lucide-react";

const middlesexCountyZipCodes = [
  "08810", "08812", "08816", "08817", "08818", "08820", "08823", "08824", 
  "08828", "08830", "08831", "08832", "08837", "08840", "08846", "08850", 
  "08852", "08854", "08855", "08857", "08859", "08861", "08862", "08863", 
  "08871", "08872", "08873", "08877", "08878", "08879", "08882", "08884", 
  "08890", "08899", "08901", "08902", "08903", "08904", "08905", "08906", 
  "08922", "08933", "08989", "08512", "08518", "08520", "08536", "08540", 
  "08558", "08560", "08570", "07001", "07008", "07064", "07067", "07077", 
  "07095"
];

const monmouthCountyZipCodes = [
  "07701", "07702", "07703", "07704", "07709", "07710", "07711", "07712",
  "07715", "07716", "07717", "07718", "07719", "07720", "07721", "07722",
  "07723", "07724", "07726", "07727", "07728", "07730", "07731", "07732",
  "07733", "07734", "07735", "07737", "07738", "07739", "07740", "07746",
  "07747", "07748", "07750", "07751", "07752", "07753", "07754", "07755",
  "07756", "07757", "07758", "07760", "07762", "07763", "07764", "07765",
  "07799", "08501", "08510", "08514", "08526", "08535", "08555", "08691" 
];

const mercerCountyZipCodes = [
  "08505", "08512", "08520", "08525", "08530", "08534", "08536", "08540",
  "08541", "08542", "08543", "08544", "08550", "08551", "08553", "08554",
  "08556", "08557", "08558", "08559", "08560", "08561", "08562", "08601",
  "08602", "08603", "08604", "08605", "08606", "08607", "08608", "08609",
  "08610", "08611", "08618", "08619", "08620", "08625", "08628", "08629",
  "08638", "08640", "08641", "08645", "08646", "08647", "08648", "08650",
  "08666", "08677", "08690", "08691", "08695"
];

const serviceableZipCodes = [
  ...new Set([ // Use Set to remove duplicates if any zip code exists in multiple arrays
    ...middlesexCountyZipCodes, 
    ...monmouthCountyZipCodes, 
    ...mercerCountyZipCodes
  ])
];

const PincodeSearch = () => {
  const [pincode, setPincode] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!pincode || !/^\d{5}$/.test(pincode)) {
      toast({
        title: "Invalid Pincode",
        description: "Please enter a valid 5-digit US zip code.",
        variant: "destructive",
      });
      setSearchResult(null);
      return;
    }

    setIsLoading(true);
    setSearchResult(null); 

    setTimeout(() => {
      const isAvailable = serviceableZipCodes.includes(pincode);
      if (isAvailable) {
        setSearchResult({
          type: "success",
          message: `Great news! We provide services in your area (${pincode}).`,
        });
      } else {
        setSearchResult({
          type: "error",
          message: `We're sorry, but e2i home care services are not currently available in your area (${pincode}). We are expanding and hope to serve you in the future.`,
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-lg mx-auto bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-xl border border-white/20">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 items-center">
        <div className="relative flex-grow w-full sm:w-auto">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Enter your 5-digit Zip Code"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="pl-10 pr-4 py-3 h-12 text-base text-gray-800 placeholder-gray-500 focus:ring-primary focus:border-primary"
            maxLength="5"
          />
        </div>
        <Button 
          type="submit" 
          className="bg-primary hover:bg-primary/90 text-white h-12 px-6 text-base w-full sm:w-auto"
          disabled={isLoading}
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
            />
          ) : (
            <Search className="h-5 w-5 mr-2" />
          )}
          {isLoading ? "Checking..." : "Check Availability"}
        </Button>
      </form>

      {searchResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`mt-4 p-4 rounded-md text-sm flex items-start ${
            searchResult.type === "success"
              ? "bg-green-100 border border-green-300 text-green-700"
              : "bg-red-100 border border-red-300 text-red-700"
          }`}
        >
          {searchResult.type === "success" ? (
            <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0 text-green-500" />
          ) : (
            <AlertTriangle className="h-5 w-5 mr-3 flex-shrink-0 text-red-500" />
          )}
          <p>{searchResult.message}</p>
        </motion.div>
      )}
       <p className="text-xs text-white/60 mt-3 text-center">
        Currently serving Middlesex, Monmouth, and Mercer Counties, NJ.
      </p>
    </div>
  );
};

export default PincodeSearch;