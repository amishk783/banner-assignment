import React, { FormEvent, useState } from "react";
import { BannerProps } from "./components/Banner";
import { Check } from "lucide-react";

interface DashboardProps {
  bannerData: BannerProps;
  updateBannerData: (newData: BannerProps) => void;
}
const Dashboard: React.FC<DashboardProps> = ({
  bannerData,
  updateBannerData,
}) => {
  const [formData, setFormData] = useState<BannerProps>(bannerData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, checked, type } = e.target as HTMLInputElement;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? (checked ? "on" : "off") : value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };
  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }

    if (!formData.timer || formData.timer <= 0) {
      newErrors.timer = "Timer must be a positive number.";
    }

    if (!formData.link) {
      newErrors.link = "Link is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    updateBannerData(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center p-5 m-5">
      <h2 className="text-center text-3xl font-semibold">Internal Dashboard</h2>
      <form
        className="pt-10 w-1/3 flex flex-col items-center justify-center gap-10"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-8">
          <label className="flex items-center gap-2">
            Banner Visibility:
            <input
              className="hidden"
              type="checkbox"
              name="status"
              checked={formData.status === "on"}
              onChange={handleInputChange}
            />
            <span
              className={`w-6 h-6 border-2 rounded-md ${
                formData.status === "on" ? "bg-blue-600" : "bg-white"
              } flex items-center justify-center`}
            >
              <Check
                className={` ${
                  formData.status === "on" ? "text-white" : "text-slate-500 "
                }`}
              />
            </span>
          </label>
          <label className="flex flex-col justify-center gap-2">
            Banner Description:
            <textarea
              className="border-2 py-2 px-2 rounded-md"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
            {errors.description && (
              <span className="text-red-500">{errors.description}</span>
            )}
          </label>
          <label className="flex flex-col justify-center gap-2">
            Banner Timer (seconds):
            <input
              className="border-2 py-2 px-2 rounded-md"
              type="number"
              name="timer"
              value={formData.timer}
              onChange={handleInputChange}
            />
            {errors.timer && (
              <span className="text-red-500">{errors.timer}</span>
            )}
          </label>
          <label className="flex flex-col justify-center gap-2">
            Banner Link:
            <input
              className="border-2 py-2 px-2 rounded-md"
              type="url"
              name="link"
              value={formData.link}
              onChange={handleInputChange}
            />
            {errors.link && <span className="text-red-500">{errors.link}</span>}
          </label>
          <button
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md transition hover:bg-blue-700"
            type="submit"
          >
            Update Banner
          </button>
        </div>
      </form>
    </div>
  );
};

export default Dashboard;
