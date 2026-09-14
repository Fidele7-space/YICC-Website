import React from 'react'
import Header from '../components/Header'
import StatsGrid from '../components/StatsGrid'
import ProgramCard from '../components/ProgramCard'
import Footer from '../components/Footer'

export default function NewHome() {
  const stats = [
    { label: 'Students Reached', value: 1350 },
    { label: 'Trees Planted', value: 200 },
    { label: 'Schools Targeted in 2026', value: 65 },
    { label: 'Core Programs', value: 3 },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      <Header />
      <main className="pt-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero */}
        <section className="text-center py-12">
          <h1 className="text-2xl sm:text-4xl font-extrabold">Youth Initiative in Climate Change</h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We are young Rwandans committed to creating a launchpad into Rwanda’s sustainable future by inspiring and engaging young Rwandans to commit to and protect the environment.
          </p>
          <div className="mt-6">
            <a href="/programs" className="inline-block bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md">Explore Our Programs</a>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">3</div>
              <div>
                <div className="text-sm font-semibold">Core Programs</div>
                <div className="text-xs text-gray-500">SET · CAR · CMP</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center font-bold">65+</div>
              <div>
                <div className="text-sm font-semibold">Target Schools</div>
                <div className="text-xs text-gray-500">Expanding in 2026</div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section>
          <StatsGrid stats={stats} />
        </section>

        {/* Programs */}
        <section>
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold">Our Programs</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Three comprehensive initiatives working together to empower Rwandan youth to become climate leaders through education, innovation, and action.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <ProgramCard img="/assets/microphone.png" title="SET Program" subtitle="Sensitization, Engagement & Transformation">
              Raising awareness and transforming youth into active environment guardians through education and youth-driven activism.
            </ProgramCard>
            <ProgramCard img="/assets/climate.png" title="CAR Program" subtitle="Climate Adaptation in Rwanda">
              Empowering youth to develop innovative adaptation solutions for climate resilience in vulnerable communities.
            </ProgramCard>
            <ProgramCard img="/assets/climate-change.png" title="CMP Program" subtitle="Climate Mitigation Program">
              Reducing greenhouse gas emissions through tree planting, renewable energy promotion and sustainable practices.
            </ProgramCard>
          </div>
        </section>

        {/* Mission */}
        <section>
          <h2 className="text-center text-xl font-bold">Our Mission</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-center">To empower Rwandan high school students and youth to become environmental leaders of tomorrow, ensuring that climate solutions extend from local communities to the global stage.</p>
        </section>

        {/* Join section */}
        <section className="bg-white/5 p-6 rounded">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1">
              <a className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded" href="#username">Join The Movement</a>
              <h3 className="mt-4 text-2xl font-semibold">Together, We Can Make a Difference</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">Whether you are a student, educator, innovator, organization — there is a space for you to take part in Rwanda's future.</p>
            </div>
            <div className="w-full sm:w-1/3">
              <img src="/assets/class.jpeg" alt="class" className="w-full rounded" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
