import React from 'react'
import { Link } from 'react-router-dom'
import { articles } from '../../data/homeData'

const LearnSection = () => {
  return (
    <section className="w-full py-20 px-8" style={{ backgroundColor: '#f1f2f4' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-12">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight max-w-lg"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            New to crypto?<br />Learn some<br />crypto basics
          </h2>

          <div className="flex flex-col items-start gap-6 md:max-w-sm lg:max-w-md md:pt-3">
            <p className="text-base text-gray-500 leading-relaxed">
              Beginner guides, practical tips, and market updates for first-timers, experienced investors, and everyone in between
            </p>
            <Link
              to="/learn"
              className="px-7 py-3.5 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-700 transition-colors text-md"
            >
              Read More
            </Link>
          </div>
        </div>

        {/* Article cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {articles.map((article, index) => (
            <Link
              key={index}
              to={article.href}
              className="group flex flex-col"
            >
              <div className="overflow-hidden aspect-[4/3] w-[100%]">
                <img
                  src={article.image}
                  alt={article.imageAlt}
                  className="w-full h-[80%] object-cover duration-300 rounded-4xl"
                />
              </div>

              <div className="flex flex-col gap-2 pb-4 border-b border-gray-300">
                <h3 className="text-2xl font-semibold text-gray-900 leading-snug group-hover:underline hover:underline-offset-4 transition-all">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {article.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}

export default LearnSection
