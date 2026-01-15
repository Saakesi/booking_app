import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LatestDestinationCard from "../components/LatestDestinationCard";
import type { HotelType } from "../../../backend/src/shared/types";

const Home = () => {
  const { data, isLoading, error } = useQuery(["fetchHotels"], () =>
    apiClient.fetchHotels()
  );

  const hotels: HotelType[] = data || []; // directly use data array

  console.log("Fetched hotels:", hotels);

  const topRowHotels = hotels.slice(0, 2);
  const bottomRowHotels = hotels.slice(2);

  if (isLoading) return <div>Loading hotels...</div>;
  if (error) return <div>Failed to load hotels</div>;

  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold">Latest Destinations</h2>
      <p>Most recent destinations added by our hosts</p>
      <div className="grid gap-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {topRowHotels.map((hotel) => (
            <LatestDestinationCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {bottomRowHotels.map((hotel) => (
            <LatestDestinationCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;



