const DeveloperProfile = () => {
  return (
    <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      
      {/* Background ambient light */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-blue/10 blur-[120px] rounded-full pointer-events-none"></div>

      <main className="w-full max-w-3xl flex flex-col items-center mt-4 md:mt-8 relative z-10 pb-20">

        {/* Profile Image Container */}
        <div className="relative group mb-12">
          <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-accent-blue/20 rounded-full blur opacity-40 group-hover:opacity-80 transition duration-1000"></div>
          <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full border border-border-subtle overflow-hidden shadow-2xl bg-surface-container">
            <img
              src="/aditya_kumar_singh.jpeg"
              alt="Aditya Kumar Singh"
              className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 ease-in-out transform group-hover:scale-105"
            />
          </div>
        </div>

        {/* Bio Section */}
        <div className="glass-card rounded-3xl p-8 md:p-12 shadow-xl w-full text-center flex flex-col items-center mb-12">
          <h1 className="font-h2 text-h2 font-bold text-primary mb-2 tracking-tight">
            Aditya Kumar Singh
          </h1>
          <h2 className="font-label-caps text-on-surface-variant mb-8 uppercase tracking-widest">
            Full-Stack Engineer | Quant & Data Science
          </h2>

          <p className="font-body-lg text-lg text-on-surface leading-loose max-w-2xl text-center">
            I'm a Full-Stack Developer specializing in high-performance
            web applications and algorithmic trading infrastructure.
            I bridge the gap between complex market structure strategies—often
            leveraging custom Pine Script and data-driven backends—and clean, intuitive user interfaces.
            I build the technology that turns raw market data into an actionable edge.
          </p>
        </div>

        {/* Social Links */}
        <div className="glass-card rounded-3xl p-8 shadow-xl w-full flex flex-col items-center gap-6">
          <h3 className="font-label-caps text-on-surface-variant text-[12px] uppercase tracking-widest mb-2">Let's Connect</h3>

          <div className="flex flex-col w-full gap-4 max-w-md">
            <a
              href="https://github.com/ADITYASINGH1206"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between glass-card rounded-xl p-4 px-6 hover:border-primary transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-on-surface-variant group-hover:text-primary transition-colors">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="font-metric text-on-surface group-hover:text-primary transition-all">ADITYASINGH1206</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-[16px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 group-hover:text-primary">arrow_forward</span>
            </a>

            <a
              href="https://www.linkedin.com/in/aditya-kumar-singh-93603b1b4/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between glass-card rounded-xl p-4 px-6 hover:border-accent-blue transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-on-surface-variant group-hover:text-accent-blue transition-colors">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span className="font-metric text-on-surface group-hover:text-accent-blue transition-all truncate">aditya-kumar-singh</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-[16px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 group-hover:text-accent-blue">arrow_forward</span>
            </a>

            <a
              href="mailto:24ad10ad5@mitsgwl.ac.in"
              className="group flex items-center justify-between glass-card rounded-xl p-4 px-6 hover:border-error transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-on-surface-variant group-hover:text-error transition-colors">
                  <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
                </svg>
                <span className="font-metric text-on-surface group-hover:text-error transition-all truncate">24ad10ad5@mitsgwl.ac.in</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-[16px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 group-hover:text-error">arrow_forward</span>
            </a>
          </div>
        </div>

      </main>
    </div>
  );
};

export default DeveloperProfile;
