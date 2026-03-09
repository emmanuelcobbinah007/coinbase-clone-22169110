import React from "react";
import { Link } from "react-router-dom";
import exploreCTAImage from '../../assets/accessToAdvancedCharts-5.svg';

const ExploreCta = () => (
  <section className="bg-[var(--coinbase-blue)] p-8 md:p-12 mb-0 flex flex-col md:flex-row items-center justify-between gap-8 md:ml-[-40px]">
    <div className="flex-1">
      <h2
        className="text-2xl md:text-3xl font-bold text-white leading-tight"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Create a Coinbase account to trade crypto. It's quick, easy, and secure.
      </h2>
      <Link
        to="/signup"
        className="inline-flex items-center gap-3 mt-6 px-6 py-3.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-100 transition-colors"
      >
        Start Trading
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </div>
    <div className="w-48 h-36 flex items-center justify-center">
      <img src={exploreCTAImage} alt="Advanced charts illustration" className="w-full h-full object-contain" />
    </div>
  </section>
);

export default ExploreCta;
