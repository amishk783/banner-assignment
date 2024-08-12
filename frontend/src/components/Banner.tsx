import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface BannerProps {
  description: string;
  timer: number;
  link: string;
  status: "on" | "off";
}
export interface BannerInterface extends BannerProps {
  updateBannerData: (newData: BannerProps) => void;
}
export const Banner: React.FC<BannerInterface> = ({
  description,
  timer,
  link,
  status,
  updateBannerData,
}) => {
  const [remainingTime, setRemainingTime] = useState(timer);
  useEffect(() => {
    setRemainingTime(timer);
  }, [timer]);

  useEffect(() => {
    if (!remainingTime) {
      updateBannerData({
        description,
        timer,
        link,
        status: "off",
      });

      return;
    }

    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [description, link, remainingTime, timer, updateBannerData]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <Link to={link}>
      <div className="m-5 p-5 bg-orange-100 text-orange-800 border-2 border-orange-300 rounded-lg shadow-lg transition-transform transform hover:scale-[101%] relative">
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-xl font-semibold">Banner</h3>
        </div>
        <h1 className="text-center py-4 font-bold text-6xl">{description}</h1>

        <div className="flex items-center justify-between mt-5">
          <h4 className="text-end text-gray-600">
            Timer: {formatTime(remainingTime)}
          </h4>
          <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md transition hover:bg-blue-700">
            Click Me
          </button>
        </div>
      </div>
    </Link>
  );
};
