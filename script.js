/* script.js */

// 1. Inject the HTML Structure
document.addEventListener("DOMContentLoaded", function() {
    const appContainer = document.getElementById('app-container');
    
    if (!appContainer) {
        console.error("Error: Element with ID 'app-container' not found.");
        return;
    }

    appContainer.innerHTML = `
    <div id="loadingOverlay" class="hidden fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50 backdrop-blur-sm transition-opacity duration-300 opacity-0">
        <div class="loader"></div>
        <p class="text-white text-lg font-semibold mt-4">Calculating your results...</p>
    </div>

    <div class="w-full max-w-5xl mx-auto">
        
        <div class="text-center mb-8">
            <img src="https://cdn.prod.website-files.com/68cc5af3d01de0e204120944/68d407d3bf013b181b7bd083_36k-logo-whte-yllw.avif" alt="Threesixkey Logo" class="mx-auto h-12 w-auto">
            <h2 class="text-3xl font-bold text-gray-200 mt-4">
                <span class="text-4xl">Buy, Scan, Win</span> ROI Calculator
            </h2>
        </div>
        
        <div class="bg-[#101211] p-6 sm:p-10 rounded-xl shadow-2xl relative overflow-hidden">

            <div id="step1" class="step-transition opacity-100">
                <div class="mb-6 p-4 bg-[#202221] rounded-lg border border-gray-700">
                    <h4 class="font-bold text-lg text-[#EDA400] mb-2">What is this calculator for?</h4>
                    <p class="text-sm text-gray-300">
                        A <strong class="font-bold">Buy, Scan, Win</strong> program is often seen as a simple cost. This calculator will help you:
                    </p>
                    <ul class="list-decimal list-inside text-sm text-gray-300 mt-2 space-y-1">
                        <li>Understand the ROI of your <strong>current program</strong> (The <strong class="font-bold">Cost Center</strong> view).</li>
                        <li>Simulate how a <strong class="font-bold">Full-Stack</strong> system turns it into a <strong>revenue-generating system</strong> by increasing units per purchase and valuing your 1st-party data.</li>
                    </ul>
                </div>
                
                <h3 class="text-2xl font-bold text-white mb-2">Step 1: Your Program Investment</h3>
                <p class="text-gray-400 mb-6">Enter the total costs for your <strong class="font-bold">Buy, Scan, Win</strong> program.</p>
                
                <div class="space-y-4">
                    <div>
                        <label for="techFees" class="block text-sm font-medium text-gray-300 mb-1">
                            Strategy, Creative & Tech Build ($)
                            <div class="info-tooltip ml-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span class="tooltip-text">Includes the website/app, receipt validation technology, creative design, and program management.</span>
                            </div>
                        </label>
                        <input type="number" id="techFees" value="15000" class="w-full bg-[#202221] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-[#EDA400] focus:outline-none" placeholder="e.g., 15000">
                        <div id="techFeesError" class="text-red-400 text-sm mt-1 hidden">Please enter a value greater than 0.</div>
                    </div>
                    <div>
                        <label for="mediaSpend" class="block text-sm font-medium text-gray-300 mb-1">
                            Media & Acquisition Spend ($)
                            <div class="info-tooltip ml-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span class="tooltip-text">All costs to advertise your program. Ex: Social media ads, influencers, and in-store POS materials.</span>
                            </div>
                        </label>
                        <input type="number" id="mediaSpend" value="5000" class="w-full bg-[#202221] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-[#EDA400] focus:outline-none" placeholder="e.g., 5000">
                        <div id="mediaSpendError" class="text-red-400 text-sm mt-1 hidden">Please enter a value greater than 0.</div>
                    </div>
                    <div>
                        <label for="prizeCosts" class="block text-sm font-medium text-gray-300 mb-1">
                            Total Cost of Prizes & Fulfillment ($)
                            <div class="info-tooltip ml-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span class="tooltip-text">The total cash value of all prizes plus any shipping costs.</span>
                            </div>
                        </label>
                        <input type="number" id="prizeCosts" value="10000" class="w-full bg-[#202221] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-[#EDA400] focus:outline-none" placeholder="e.g., 10000">
                        <div id="prizeCostsError" class="text-red-400 text-sm mt-1 hidden">Please enter a value greater than 0.</div>
                    </div>
                </div>
                <button onclick="goToStep2()" class="w-full bg-[#EDA400] text-gray-900 font-bold py-3 px-6 rounded-lg mt-8 hover:bg-[#d59200] transition duration-300 active:scale-[0.98] active:brightness-95">Next: Enter Your Results &rarr;</button>
            </div>

            <div id="step2" class="step-transition opacity-0 hidden">
                <h3 class="text-2xl font-bold text-white mb-2">Step 2: Your Program Performance</h3>
                <p class="text-gray-400 mb-6">Enter the results you are currently tracking.</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="participants" class="block text-sm font-medium text-gray-300 mb-1">
                            Total Valid Receipts (Participants)
                            <div class="info-tooltip ml-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span class="tooltip-text">The number of unique, approved receipts uploaded.</span>
                            </div>
                        </label>
                        <input type="number" id="participants" value="5000" class="w-full bg-[#202221] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-[#EDA400] focus:outline-none" placeholder="e.g., 5000">
                        <div id="participantsError" class="text-red-400 text-sm mt-1 hidden">Please enter a value greater than 0.</div>
                    </div>
                    <div>
                        <label for="leads" class="block text-sm font-medium text-gray-300 mb-1">
                            Total Emails Collected (Leads)
                            <div class="info-tooltip ml-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span class="tooltip-text">The number of unique emails collected.</span>
                            </div>
                        </label>
                        <input type="number" id="leads" value="5000" class="w-full bg-[#202221] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-[#EDA400] focus:outline-none" placeholder="e.g., 5000">
                        <div id="leadsError" class="text-red-400 text-sm mt-1 hidden">Leads will default to participants if 0.</div>
                    </div>
                    <div>
                        <label for="productPrice" class="block text-sm font-medium text-gray-300 mb-1">
                            Price per Unit of Your Product ($)
                            <div class="info-tooltip ml-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span class="tooltip-text">The price of a single unit (e.g., $5).</span>
                            </div>
                        </label>
                        <input type="number" id="productPrice" value="5" class="w-full bg-[#202221] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-[#EDA400] focus:outline-none" placeholder="e.g., 5">
                        <div id="productPriceError" class="text-red-400 text-sm mt-1 hidden">Please enter a value greater than 0.</div>
                    </div>
                    <div>
                        <label for="avgUnits" class="block text-sm font-medium text-gray-300 mb-1">
                            Average Units of Your Product per Receipt
                            <div class="info-tooltip ml-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span class="tooltip-text">A standard 'Buy 1' program = 1.</span>
                            </div>
                        </label>
                        <input type="number" id="avgUnits" value="1" class="w-full bg-[#202221] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-[#EDA400] focus:outline-none" placeholder="e.g., 1">
                        <div id="avgUnitsError" class="text-red-400 text-sm mt-1 hidden">Please enter a value greater than 0.</div>
                    </div>
                    <div class="md:col-span-2">
                        <label for="targetAvgUnits" class="block text-sm font-medium text-gray-300 mb-1">
                            Target Units per Receipt (with Gamification)
                            <div class="info-tooltip ml-1">
                                <svg xmlns="http://www.w3
