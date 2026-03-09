import React from "react";
import { Link } from "react-router-dom";
import getStartedImage from '../../assets/nuxPopularAssets-5.svg';

const GetStartedCard = () => (
  <div className="bg-[var(--coinbase-blue)] rounded-2xl p-6 text-white relative overflow-hidden">
    <p className="text-lg font-bold">Get started</p>
    <p className="text-sm mt-1 opacity-90">Create your account today</p>
    <Link
      to="/signup"
      className="inline-block mt-4 px-5 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-100 transition-colors"
    >
      Sign up
    </Link>
    {/* Decorative circles */}
    <div className="absolute top-2 right-2 w-24 h-24">
      <img src={getStartedImage} alt="Advanced charts illustration" className="w-full h-full object-contain" />
    </div>
  </div>
);

export default GetStartedCard;
