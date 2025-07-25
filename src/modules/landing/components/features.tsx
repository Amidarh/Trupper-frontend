'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: '🎯',
    title: 'Personalized Learning',
    description:
      'AI-powered adaptive learning that adjusts to your pace and learning style for optimal results.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: '📊',
    title: 'Real-time Analytics',
    description:
      'Track your progress with detailed analytics and insights to identify areas for improvement.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: '🤖',
    title: 'AI Examiner',
    description:
      'Advanced AI that creates personalized exams and provides intelligent feedback on your performance.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: '📱',
    title: 'Mobile First',
    description:
      'Learn anywhere, anytime with our responsive design that works perfectly on all devices.',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: '🔒',
    title: 'Secure & Private',
    description:
      'Enterprise-grade security ensures your data and learning progress remain completely private.',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    icon: '🌍',
    title: 'Global Community',
    description:
      'Connect with learners worldwide and participate in collaborative learning experiences.',
    gradient: 'from-teal-500 to-blue-500',
  },
];

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className='py-20 px-5 bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden'>
      {/* Background decoration */}
      <div className='absolute inset-0 opacity-10'>
        <div className='absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl'></div>
        <div className='absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl'></div>
      </div>

      <div className='max-w-7xl mx-auto relative z-10'>
        {/* Section header */}
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6'>
            <span className='bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent'>
              Powerful Features
            </span>
          </h2>
          <p className='text-xl text-white/80 max-w-3xl mx-auto leading-relaxed'>
            Experience the future of education with cutting-edge features
            designed to enhance your learning journey
          </p>
        </div>

        {/* Features grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-500 hover:scale-105 hover:bg-white/10 ${
                hoveredIndex === index
                  ? 'shadow-2xl shadow-purple-500/25'
                  : 'shadow-lg'
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              ></div>

              {/* Icon */}
              <div className='relative z-10 mb-6'>
                <div className='text-4xl mb-4'>{feature.icon}</div>
                <div
                  className={`w-12 h-1 bg-gradient-to-r ${feature.gradient} rounded-full`}
                ></div>
              </div>

              {/* Content */}
              <div className='relative z-10'>
                <h3 className='text-xl font-semibold text-white mb-3 group-hover:text-purple-200 transition-colors duration-300'>
                  {feature.title}
                </h3>
                <p className='text-white/70 leading-relaxed'>
                  {feature.description}
                </p>
              </div>

              {/* Hover effect */}
              <div className='absolute inset-0 rounded-2xl border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
            </div>
          ))}
        </div>

        {/* CTA section */}
        <div className='text-center mt-16'>
          <Button className='px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25'>
            Explore All Features
          </Button>
        </div>
      </div>
    </section>
  );
}
