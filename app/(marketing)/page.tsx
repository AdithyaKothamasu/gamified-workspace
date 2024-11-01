"use client";
import { FormEvent, useState } from 'react';
import { ArrowRight, Users, Video, MessageSquare } from 'lucide-react';
import axios from 'axios';

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post('/api/subscribe', { email }, {
        headers: { 'Content-Type': 'application/json' }
      });
      setStatus('success');
      setEmail('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || 'Something went wrong. Please try again.';
        setStatus(errorMessage);
      } else {
        setStatus('Something went wrong. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    {
      name: 'Interactive Space',
      description: 'Move freely in a 2D space with your custom avatar. Interact with teammates naturally.',
      icon: Users
    },
    {
      name: 'Proximity Chat',
      description: 'Voice and video chat automatically trigger when you get close to teammates.',
      icon: Video
    },
    {
      name: 'Team Messaging',
      description: 'Built-in text chat and conferencing for seamless communication.',
      icon: MessageSquare
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-10 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-indigo-500 sm:text-6xl animate-fade-in">
              Your Virtual Workspace Reimagined
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Collaborate in real-time with your team in an interactive 2D space. 
              Voice, video, and proximity chat make remote work feel natural.
            </p>
            
            {/* Email Collection Form */}
            <div className="mt-10">
              <form onSubmit={handleSubscribe} className="flex max-w-lg mx-auto gap-x-4">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Joining...' : 'Be the first to know'}
                  {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                </button>
              </form>
              {status === 'success' && (
                <p className="mt-2 text-sm text-green-600">Thanks for subscribing!</p>
              )}
              {status && status !== 'success' && (
                <p className="mt-2 text-sm text-red-600">{status}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
              Better Collaboration
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need for remote teamwork
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <feature.icon className="h-5 w-5 flex-none text-indigo-600" />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;