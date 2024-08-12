import { useEffect, useState } from "react";
import { Banner } from "./components/Banner";
import { BannerProps } from "./components/Banner";
import Dashboard from "./Dashboard";

const server = import.meta.env.VITE_SERVER_URL || "http://localhost:3001";
console.log(server);
export const Home = () => {
  const [bannerData, setBannerData] = useState<BannerProps>({
    status: "off",
    description: "",
    timer: 0,
    link: "",
  });

  useEffect(() => {
    fetchBannerData();
  }, []);

  const fetchBannerData = async () => {
    try {
      const response = await fetch(`${server}/banner/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      setBannerData(data);
    } catch (error) {
      console.error("Error fetching banner data:", error);
    }
  };
  const updateBannerData = async (newData: BannerProps) => {
    try {
      await fetch(`${server}/banner/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      fetchBannerData();
    } catch (error) {
      console.error("Error updating banner data:", error);
    }
  };
  console.log(bannerData.timer);
  return (
    <div className="">
      {bannerData.status == "on" && (
        <Banner {...bannerData} updateBannerData={updateBannerData} />
      )}
      <Dashboard bannerData={bannerData} updateBannerData={updateBannerData} />
    </div>
  );
};
