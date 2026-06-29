import React from 'react';

const DeveloperProfileView = () => {
    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Hero Section & Expertise Grid */}
            <section className="pt-8 pb-12 max-w-container-max mx-auto">
                <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
                    <div className="space-y-2 max-w-2xl">
                        <div className="inline-flex items-center px-4 py-1 bg-surface-bright/10 border border-white/5 rounded-full mb-4">
                            <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                            <span className="font-label-caps text-label-caps tracking-widest text-primary uppercase">Active for Collaboration</span>
                        </div>
                        <h2 className="font-h1-mobile md:font-h1 text-h1-mobile md:text-h1 text-primary leading-[1.1]">Aditya Kumar Singh</h2>
                        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                            Senior Software Engineer specializing in low-latency systems and neural architecture design. Building the future of audio intelligence at Auralis.
                        </p>
                    </div>
                    <div className="flex gap-4 mb-1">
                        <button className="px-6 py-3 bg-primary text-background font-label-caps text-label-caps rounded-full hover:opacity-90 transition-all uppercase tracking-widest">Download CV</button>
                        <button className="px-6 py-3 border border-border-subtle text-primary font-label-caps text-label-caps rounded-full hover:bg-surface-bright/5 transition-all uppercase tracking-widest">Contact</button>
                    </div>
                </div>

                {/* Bento Grid Expertise Cards */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    
                    {/* Expertise 1: Web Architecture */}
                    <div className="col-span-12 md:col-span-8 glass-card rounded-2xl p-12 relative overflow-hidden group h-[400px]">
                        <div className="relative z-10 h-full flex flex-col">
                            <div className="w-12 h-12 rounded-xl bg-surface-container-highest border border-border-subtle flex items-center justify-center mb-8">
                                <span className="material-symbols-outlined text-primary text-[28px]">architecture</span>
                            </div>
                            <h3 className="font-h3 text-h3 text-primary mb-4">Web Architecture</h3>
                            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">Designing distributed systems with hyper-efficiency. Expertise in micro-frontends, edge computing, and real-time state synchronization for enterprise environments.</p>
                            
                            <div className="mt-auto grid grid-cols-3 gap-4">
                                <div className="p-4 rounded-xl bg-surface-container-low border border-border-subtle">
                                    <p className="font-label-caps text-[10px] text-on-surface-variant/40 mb-1 uppercase tracking-widest">Scalability</p>
                                    <p className="font-metric text-metric text-primary">99.99%</p>
                                </div>
                                <div className="p-4 rounded-xl bg-surface-container-low border border-border-subtle">
                                    <p className="font-label-caps text-[10px] text-on-surface-variant/40 mb-1 uppercase tracking-widest">Latency</p>
                                    <p className="font-metric text-metric text-primary">&lt;50ms</p>
                                </div>
                                <div className="p-4 rounded-xl bg-surface-container-low border border-border-subtle">
                                    <p className="font-label-caps text-[10px] text-on-surface-variant/40 mb-1 uppercase tracking-widest">Stack</p>
                                    <p className="font-metric text-metric text-primary">Next.js/Rust</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Expertise 2: Machine Learning */}
                    <div className="col-span-12 md:col-span-4 glass-card rounded-2xl p-12 relative overflow-hidden group h-[400px]">
                        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, var(--color-primary) 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="w-12 h-12 rounded-xl bg-surface-container-highest border border-border-subtle flex items-center justify-center mb-8">
                                <span className="material-symbols-outlined text-primary text-[28px]">psychology</span>
                            </div>
                            <h3 className="font-h3 text-h3 text-primary mb-4">Machine Learning</h3>
                            <p className="font-body-md text-body-md text-on-surface-variant">Implementing deep neural networks for audio processing and semantic pattern recognition in real-time streams.</p>
                            
                            <div className="mt-auto space-y-4">
                                <div className="space-y-1">
                                    <div className="flex justify-between font-label-caps text-[10px] uppercase tracking-widest">
                                        <span className="text-on-surface-variant/60">PyTorch Efficiency</span>
                                        <span className="text-primary">92%</span>
                                    </div>
                                    <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-[92%]"></div>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between font-label-caps text-[10px] uppercase tracking-widest">
                                        <span className="text-on-surface-variant/60">Model Inference</span>
                                        <span className="text-primary">88%</span>
                                    </div>
                                    <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-[88%]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Expertise 3: Algorithmic Foundation */}
                    <div className="col-span-12 md:col-span-5 glass-card rounded-2xl p-12 relative overflow-hidden group h-[380px]">
                        <div className="absolute -right-20 -bottom-20 w-64 h-64 border border-border-subtle/50 rounded-full group-hover:scale-110 transition-transform duration-700"></div>
                        <div className="relative z-10 h-full flex flex-col">
                            <div className="w-12 h-12 rounded-xl bg-surface-container-highest border border-border-subtle flex items-center justify-center mb-8">
                                <span className="material-symbols-outlined text-primary text-[28px]">terminal</span>
                            </div>
                            <h3 className="font-h3 text-h3 text-primary mb-4">Algorithmic Foundation</h3>
                            <p className="font-body-md text-body-md text-on-surface-variant">Core computer science excellence. Advanced data structures, graph theory, and computational complexity optimization for hardware-level performance.</p>
                            
                            <div className="mt-auto flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-surface-container-highest text-on-surface-variant/80 font-label-caps text-[10px] tracking-widest rounded uppercase">Dynamic Programming</span>
                                <span className="px-3 py-1 bg-surface-container-highest text-on-surface-variant/80 font-label-caps text-[10px] tracking-widest rounded uppercase">B-Trees</span>
                                <span className="px-3 py-1 bg-surface-container-highest text-on-surface-variant/80 font-label-caps text-[10px] tracking-widest rounded uppercase">Big O Optimization</span>
                            </div>
                        </div>
                    </div>

                    {/* Expertise 4: Software Engineering */}
                    <div className="col-span-12 md:col-span-7 glass-card rounded-2xl p-12 relative overflow-hidden group h-[380px]">
                        <div className="absolute inset-0 opacity-10 bg-cover bg-center grayscale" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDDez0ebW9O70XstwzwAgfYe2Zz0uM3KswFtYVVUtwr4smukOZ3-inCa1kvrw_xmnbQwhmtkH7dLNONDCB6n1ioTtbx0WO1uOThYk36FJOmIXw5lwKMacgVk2FxQK3AZ_0PIFtVtzvTP-IwoFnIQAXPPI51UY-O3V-law-Z90YUuthD3NMdiE2-JuUH9ZiWxWUG0HdPVMAN0l2lbiS-4hY8ORkieg7Hf4i0F5I2PIlTii27s4aEUxvS0goFO9byeNPRT7nck35SC2df')" }}></div>
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="w-12 h-12 rounded-xl bg-surface-container-highest border border-border-subtle flex items-center justify-center mb-8">
                                <span className="material-symbols-outlined text-primary text-[28px]">integration_instructions</span>
                            </div>
                            <h3 className="font-h3 text-h3 text-primary mb-4">Software Engineering</h3>
                            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">Clean code advocate. Mastery in TDD, CI/CD pipelines, and high-concurrency systems. Leading engineering excellence from ideation to production.</p>
                            
                            <div className="mt-auto flex items-center gap-12">
                                <div>
                                    <p className="font-h3 text-h3 text-primary">12k+</p>
                                    <p className="font-label-caps text-[10px] tracking-widest text-on-surface-variant/40 uppercase mt-1">Pull Requests</p>
                                </div>
                                <div className="w-px h-12 bg-border-subtle"></div>
                                <div>
                                    <p className="font-h3 text-h3 text-primary">08</p>
                                    <p className="font-label-caps text-[10px] tracking-widest text-on-surface-variant/40 uppercase mt-1">Open Source</p>
                                </div>
                                <div className="w-px h-12 bg-border-subtle"></div>
                                <div>
                                    <p className="font-h3 text-h3 text-primary">05yr</p>
                                    <p className="font-label-caps text-[10px] tracking-widest text-on-surface-variant/40 uppercase mt-1">Industry Exp</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section Peek */}
            <section className="px-6 pb-12 max-w-container-max mx-auto mt-4">
                <div className="flex justify-between items-center mb-6 border-b border-border-subtle/50 pb-4">
                    <h3 className="font-h3 text-h3 text-primary">Featured Labs</h3>
                    <a className="font-label-caps text-label-caps tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 cursor-pointer" href="#">
                        View Archive <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass-card p-4 rounded-xl flex items-center gap-6 hover:bg-surface-bright/10 transition-colors cursor-pointer group">
                        <div className="w-24 h-24 rounded-lg bg-surface-container-highest overflow-hidden flex-shrink-0">
                            <img className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-80 transition-opacity" alt="Auralis Core V3" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAs0ZDsRlwIavUobc6ByWtp6x_x0o6LzoV-28EEt4xmTf8LwH_nuVnKlnKNk6znvpJwZ5namrEORf6la24OgtdivM9s9p_s37ABHN1ZUReMWm-Qd0ZXQ-_q_67GE6yM-YvbbAoWbiDvOdheWF_0CY2MuC0Rftc9HMIxdH9zHzKMpxUSy5LSJeMundM1zxkyfDtsAN52n4yszOPS98T9S0CJj-fuHzdPuCUIBmLTp5l70qkgVz7o6ELkGhx3Lw9DRha85rUVEpGag6JL" />
                        </div>
                        <div>
                            <h4 className="font-metric text-metric text-primary mb-1">Auralis Core V3</h4>
                            <p className="font-label-caps text-[10px] tracking-widest uppercase text-on-surface-variant/60">Audio Signal Processing Engine</p>
                        </div>
                    </div>
                    
                    <div className="glass-card p-4 rounded-xl flex items-center gap-6 hover:bg-surface-bright/10 transition-colors cursor-pointer group">
                        <div className="w-24 h-24 rounded-lg bg-surface-container-highest overflow-hidden flex-shrink-0">
                            <img className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-80 transition-opacity" alt="Synthetix Node" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQrZyuNuk-tNvs0D17wg3BK7laUZzjaPTLK-b6LYvuhn6AHXCMwwQDJReJA7Pm4om9_-DV_l1FFkV0MxjnCA5XxPI-exqdyCS4Y0yRCyEFiUdPL5za0wPlYth_4qyYs2zRuxpVfLIi1GRFYPizsG1-d07G7kOggEw4GnmiyV3gn-xL71sUGLjhzqFSGQ_tIaZmFAkg0v10fM_d3A0fsFTbMVG0xmLiqXSfKzi0dtiHcScy9XLqEo94UDPdmzLtCfJmDql6E5L0npnR" />
                        </div>
                        <div>
                            <h4 className="font-metric text-metric text-primary mb-1">Synthetix Node</h4>
                            <p className="font-label-caps text-[10px] tracking-widest uppercase text-on-surface-variant/60">Distributed State Management</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DeveloperProfileView;
