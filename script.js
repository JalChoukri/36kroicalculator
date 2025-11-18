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
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span class="tooltip-text">This is your goal. A 'Buy 2, get 3 entries' program aims for 2.</span>
                            </div>
                        </label>
                        <input type="number" id="targetAvgUnits" value="1.5" class="w-full bg-[#202221] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-[#EDA400] focus:outline-none" placeholder="e.g., 1.5">
                        <div id="targetAvgUnitsError" class="text-red-400 text-sm mt-1 hidden">Target units must be greater than average units.</div>
                    </div>
                </div>
                <div class="flex justify-between mt-8">
                    <button onclick="goToStep1()" class="bg-gray-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-600 transition duration-300 active:scale-[0.98] active:brightness-95">&larr; Back</button>
                    <button onclick="goToStepEmail()" class="bg-[#EDA400] text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-[#d59200] transition duration-300 active:scale-[0.98] active:brightness-95">Calculate My ROI & See My Data Leaks &rarr;</button>
                </div>
            </div>

            <div id="stepEmail" class="step-transition opacity-0 hidden">
                <div class="text-center">
                    <svg class="mx-auto h-12 w-12 text-[#EDA400]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    <h3 class="text-2xl font-bold text-white mt-4 mb-2">Your Analysis is Ready to be Unlocked</h3>
                    <p class="text-gray-400 mb-6">Enter your email to receive your personalized ROI analysis.</p>
                    <div class="space-y-4">
                        <input type="email" id="userEmail" class="w-full bg-[#202221] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-[#EDA400] focus:outline-none" placeholder="you@company.com">
                        <div id="emailError" class="text-red-400 text-sm text-left hidden">Please enter a valid email address.</div>
                    </div>
                    <button id="unlockButton" onclick="showResults()" class="w-full bg-[#EDA400] text-gray-900 font-bold py-3 px-6 rounded-lg mt-6 hover:bg-[#d59200] transition duration-300 active:scale-[0.98] active:brightness-95 disabled:opacity-50">Unlock My Results Now &rarr;</button>
                    <button onclick="goToStep2()" class="text-gray-400 text-sm mt-4 hover:text-white transition active:scale-[0.98] active:brightness-95">&larr; Go Back</button>
                </div>
            </div>

            <div id="stepResult" class="step-transition opacity-0 hidden">
                <h3 class="text-3xl font-bold text-white mb-6 text-center">Your <strong class="font-bold">Buy, Scan, Win</strong> ROI Analysis</h3>
                
                <div class="bar-chart-container mb-6">
                    <h4 class="text-lg font-bold text-white mb-4 text-center">Visualizing Your Return (ROI)</h4>
                    <p class="text-xs text-gray-400 text-center mb-6 -mt-2">How much value you generated for every $1 spent.</p>
                    
                    <div class="legend-container text-xs text-gray-400">
                        <div class="legend-item"><span class="legend-dot bar-color-loss"></span>Loss (Below Breakeven)</div>
                        <div class="legend-item"><span class="legend-dot bar-color-baseline"></span>Baseline Revenue</div>
                        <div class="legend-item"><span class="legend-dot bar-color-uplift"></span>Sales Uplift</div>
                        <div class="legend-item"><span class="legend-dot bar-color-data"></span>1st-Party Data Value</div>
                    </div>

                    <div class="bar-row">
                        <div class="bar-label">
                            <div>
                                <span class="text-gray-300"><strong class="font-bold">Standard</strong> Program ROI</span>
                                <span class="value ml-2" id="standard-bar-value"></span>
                            </div>
                            <span class="percent" id="standard-bar-percent"></span>
                        </div>
                        <div class="bar-wrapper" id="standard-bar-wrapper">
                            <div id="bar-standard" class="bar-segment rounded-md"></div>
                        </div>
                    </div>

                    <div class="bar-row">
                        <div class="bar-label">
                            <div>
                                <span class="text-white"><strong class="font-bold">Full-Stack</strong> ROI</span>
                                <span class="value ml-2" id="fullstack-bar-value"></span>
                            </div>
                            <span class="percent" id="fullstack-bar-percent"></span>
                        </div>
                        <div class="bar-wrapper" id="fullstack-bar-wrapper">
                            <div id="bar-fs-baseline" class="bar-segment bar-color-baseline rounded-l-md"></div>
                            <div id="bar-fs-uplift" class="bar-segment bar-color-uplift"></div>
                            <div id="bar-fs-data" class="bar-segment bar-color-data rounded-r-md"></div>
                        </div>
                        <div class="bar-segment-labels" id="fullstack-label-wrapper">
                            <div id="label-fs-baseline" class="segment-label">Baseline</div>
                            <div id="label-fs-uplift" class="segment-label">Uplift</div>
                            <div id="label-fs-data" class="segment-label">Data</div>
                        </div>
                    </div>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="bg-[#202221] p-6 rounded-lg border border-gray-700">
                        <h4 class="text-xl font-bold text-white mb-4"><strong class="font-bold">Standard</strong> Program ROI</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span class="text-gray-400">Total Participants:</span>
                                <span class="text-white font-medium" id="tradParticipants"></span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-400">Avg. Units per Receipt:</span>
                                <span class="text-white font-medium" id="tradAvgUnits"></span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-400">Baseline Revenue:</span>
                                <span class="text-white font-medium" id="tradRevenue"></span>
                            </div>
                        </div>
                        <hr class="border-gray-700 my-4">
                        <div class="text-center">
                            <span class="text-sm text-gray-400">Baseline ROI</span>
                            <h2 class="text-4xl font-extrabold text-red-400 my-2" id="tradROI"></h2>
                            <span class="text-sm text-gray-400" id="tradROI_subtitle"></span>
                        </div>
                        <div class="mt-4 pt-4 border-t border-gray-700">
                            <h5 class="font-bold text-white mb-2">Our Analysis: The <strong class="font-bold">Standard</strong> View</h5>
                            <p class="text-xs text-gray-300">
                                This is the traditional way to see a <strong class="font-bold">Buy, Scan, Win</strong> program.
                                <br><br>
                                Your investment of <strong id="didactic_investment_1" class="text-[#EDA400]"></strong> only brought in <strong id="didactic_revenue_1" class="text-[#EDA400]"></strong> in sales. This looks like a <strong class="text-red-400">net loss</strong>.
                            </p>
                        </div>
                    </div>

                    <div class="bg-[#202221] p-6 rounded-lg border-2 border-[#EDA400] shadow-lg">
                        <h4 class="text-xl font-bold text-[#EDA400] mb-4">Threesixkey <strong class="font-bold">Full-Stack</strong> ROI</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span class="text-gray-400">Target Avg. Units/Receipt:</span>
                                <span class="text-white font-medium" id="phyTargetAvgUnits"></span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-400">Total Program Revenue¹:</span>
                                <span class="text-white font-medium" id="phyRevenue"></span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-400">+ 1st-Party Data Value²:</span>
                                <span class="text-white font-medium" id="phyDataValue"></span>
                            </div>
                            <div class="flex justify-between font-bold">
                                <span class="text-gray-300">Total Generated Value:</span>
                                <span class="text-white" id="phyTotalValue"></span>
                            </div>
                        </div>
                        <hr class="border-gray-700 my-4">
                        <div class="text-center">
                            <span class="text-sm text-[#EDA400]"><strong class="font-bold">Full-Stack</strong> ROI</span>
                            <h2 class="text-4xl font-extrabold text-[#EDA400] my-2" id="phyROI"></h2>
                            <span class="text-sm text-[#EDA400]" id="phyROI_subtitle"></span>
                        </div>
                        <div class="mt-4 pt-4 border-t border-gray-700">
                            <h5 class="font-bold text-white mb-2">Our Analysis: The <strong class="font-bold">Full-Stack</strong> View</h5>
                            <p class="text-xs text-gray-300">
                                We sell more products through gamification uplift (<strong id="didactic_uplift_revenue" class="text-[#EDA400]"></strong>) and build a data asset worth <strong id="didactic_data_value" class="text-[#EDA400]"></strong>.
                            </p>
                        </div>
                    </div>
                </div>
                
                <div class="text-center text-xs text-gray-500 mt-6">
                    <p>¹ Total Program Revenue is calculated using your 'Target Units per Receipt' goal.</p>
                    <p>² Based on a conservative $10 CPG industry value for a 1st-party lead with purchase history.</p>
                </div>

                <div class="mt-10 text-center bg-[#202221] p-6 rounded-lg">
                    <h3 class="text-2xl font-bold text-white">Your <strong class="font-semibold text-3xl">Buy, Scan, Win</strong> program has hidden value.</h3>
                    <p class="text-gray-300 mt-2 mb-6">You've already done the hard part. Let Threesixkey build the system that captures the <strong class="font-bold">full-basket data</strong> and turns your cost into a profit.</p>
                    <a href="https://www.threesixkey.com/contact-us" target="_blank" rel="noopener noreferrer" class="inline-block bg-[#EDA400] text-gray-900 font-bold py-3 px-8 rounded-lg text-lg hover:bg-[#d59200] transition duration-300 active:scale-[0.98] active:brightness-95">
                        Book a 15-Min Demo to Plug Your Data Leaks
                    </a>
                </div>
            </div>
        </div>
    </div>
    `;
});

// 2. Logic & Functions
let calculatorData = { totalInvestment: 0, participants: 0, leads: 0, productPrice: 0, avgUnits: 1, targetAvgUnits: 1.5 };
const BENCHMARK_LEAD_VALUE = 10;
const steps = ['step1', 'step2', 'stepEmail', 'stepResult'];
let currentStep = 'step1'; 

function validateInput(inputId, errorId, validationFn, errorMessage) {
    const input = document.getElementById(inputId);
    const errorEl = document.getElementById(errorId);
    const value = parseFloat(input.value);
    if (validationFn(value)) {
        input.classList.remove('input-error');
        errorEl.classList.add('hidden');
        return true;
    } else {
        input.classList.add('input-error');
        errorEl.innerText = errorMessage;
        errorEl.classList.remove('hidden');
        return false;
    }
}

function resetErrors(ids) {
    ids.forEach(id => {
        document.getElementById(id)?.classList.remove('input-error');
        document.getElementById(id + 'Error')?.classList.add('hidden');
    });
}

function showStep(stepId) {
    if (stepId === currentStep) return;
    const oldStepEl = document.getElementById(currentStep);
    const newStepEl = document.getElementById(stepId);
    if (oldStepEl) oldStepEl.classList.add('opacity-0');
    setTimeout(() => {
        if (oldStepEl) oldStepEl.classList.add('hidden');
        if (newStepEl) {
            newStepEl.classList.remove('hidden');
            setTimeout(() => {
                newStepEl.classList.remove('opacity-0');
                currentStep = stepId;
                window.scrollTo(0, 0);
            }, 10);
        }
    }, 300);
}

function goToStep1() { showStep('step1'); }

function goToStep2() {
    resetErrors(['techFees', 'mediaSpend', 'prizeCosts']);
    if (validateInput('techFees', 'techFeesError', val => val > 0, 'Enter value > 0') &&
        validateInput('mediaSpend', 'mediaSpendError', val => val > 0, 'Enter value > 0') &&
        validateInput('prizeCosts', 'prizeCostsError', val => val > 0, 'Enter value > 0')) {
        calculatorData.totalInvestment = parseFloat(document.getElementById('techFees').value) + parseFloat(document.getElementById('mediaSpend').value) + parseFloat(document.getElementById('prizeCosts').value);
        showStep('step2');
    }
}

function goToStepEmail() {
    resetErrors(['participants', 'leads', 'productPrice', 'avgUnits', 'targetAvgUnits']);
    const avgUnits = parseFloat(document.getElementById('avgUnits').value) || 1;
    if (validateInput('participants', 'participantsError', val => val > 0, 'Enter value > 0') &&
        validateInput('productPrice', 'productPriceError', val => val > 0, 'Enter value > 0') &&
        validateInput('avgUnits', 'avgUnitsError', val => val > 0, 'Enter value > 0') &&
        validateInput('targetAvgUnits', 'targetAvgUnitsError', val => val > avgUnits, 'Target must be > Avg')) {
            
        calculatorData.participants = parseFloat(document.getElementById('participants').value) || 0;
        calculatorData.leads = parseFloat(document.getElementById('leads').value) || calculatorData.participants;
        calculatorData.productPrice = parseFloat(document.getElementById('productPrice').value) || 0;
        calculatorData.avgUnits = avgUnits;
        calculatorData.targetAvgUnits = parseFloat(document.getElementById('targetAvgUnits').value) || 1.5;
        showStep('stepEmail');
    }
}

function showResults() {
    const email = document.getElementById('userEmail').value;
    if (!validateEmail(email)) {
        document.getElementById('emailError').classList.remove('hidden');
        document.getElementById('userEmail').classList.add('input-error');
        return;
    }
    document.getElementById('emailError').classList.add('hidden');
    
    const webhookUrl = 'https://n8n.hatim.us/webhook/37dea748-679c-4871-ac9a-0108ffec901f';
    fetch(webhookUrl, { method: 'POST', mode: 'no-cors', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ email: email }) }).catch(e => console.error(e));

    document.getElementById('unlockButton').disabled = true;
    document.getElementById('loadingOverlay').classList.remove('hidden');
    setTimeout(() => document.getElementById('loadingOverlay').classList.remove('opacity-0'), 10);

    setTimeout(() => {
        resetChart();
        const results = calculateAndDisplayROI();
        showStep('stepResult');
        document.getElementById('loadingOverlay').classList.add('opacity-0');
        setTimeout(() => {
            document.getElementById('loadingOverlay').classList.add('hidden');
            document.getElementById('unlockButton').disabled = false;
        }, 300);
        setTimeout(() => animateChart(results), 400);
    }, 3000);
}

function resetChart() {
    const barStandard = document.getElementById('bar-standard');
    const bars = ['bar-standard', 'bar-fs-baseline', 'bar-fs-uplift', 'bar-fs-data', 'label-fs-baseline', 'label-fs-uplift', 'label-fs-data'];
    bars.forEach(id => { if(document.getElementById(id)) document.getElementById(id).style.width = '0%'; });
    if (barStandard) barStandard.classList.remove('bar-color-loss', 'bar-color-gray');
    document.querySelectorAll('.breakeven-line, .breakeven-label').forEach(el => el.remove());
}

function validateEmail(email) {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\[0-9]{1,3}\[0-9]{1,3}\[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email).toLowerCase());
}
function formatCurrency(v) { return v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }); }
function formatPercent(v) { return v.toLocaleString('en-US', { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 }); }
function formatBarPercent(v) { return isFinite(v) ? v.toLocaleString('en-US', { style: 'percent', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : '0%'; }
function formatPerDollar(v) { return (isFinite(v) && v > 0) ? `Generated ${v.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })} per $1 spent` : "Generated $0.00 per $1 spent"; }
function formatNumber(v) { return Math.round(v).toLocaleString('en-US'); }
function formatUnits(v) { return v.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }); }

function animateChart(results) {
    const { baselineROAS, fullStackROAS, baselineRevenue, upliftRevenue, totalDataValue } = results;
    const maxChartROAS = Math.max(1.1, fullStackROAS);
    
    const standardWidth = (baselineROAS / maxChartROAS) * 100;
    const fsBaseWidth = ((baselineRevenue / calculatorData.totalInvestment) / maxChartROAS) * 100;
    const fsUpliftWidth = ((upliftRevenue / calculatorData.totalInvestment) / maxChartROAS) * 100;
    const fsDataWidth = ((totalDataValue / calculatorData.totalInvestment) / maxChartROAS) * 100;
    const breakevenPercent = (1 / maxChartROAS) * 100;

    ['standard-bar-wrapper', 'fullstack-bar-wrapper'].forEach(id => {
        const wrapper = document.getElementById(id);
        const line = document.createElement('div'); line.className = 'breakeven-line'; line.style.left = breakevenPercent + '%';
        const label = document.createElement('div'); label.className = 'breakeven-label'; label.style.left = breakevenPercent + '%'; label.innerText = 'Breakeven';
        wrapper.appendChild(line); wrapper.appendChild(label);
    });

    document.getElementById('standard-bar-value').innerText = formatPerDollar(baselineROAS);
    document.getElementById('fullstack-bar-value').innerText = formatPerDollar(fullStackROAS);
    document.getElementById('standard-bar-percent').innerText = formatBarPercent(baselineROAS);
    document.getElementById('fullstack-bar-percent').innerText = formatBarPercent(fullStackROAS);

    const barStandard = document.getElementById('bar-standard');
    if (baselineROAS < 1) barStandard.classList.add('bar-color-loss'); else barStandard.classList.add('bar-color-gray');

    setTimeout(() => { if (barStandard) barStandard.style.width = standardWidth + '%'; }, 100);
    setTimeout(() => { 
        if (document.getElementById('bar-fs-baseline')) document.getElementById('bar-fs-baseline').style.width = fsBaseWidth + '%';
        if (document.getElementById('label-fs-baseline')) document.getElementById('label-fs-baseline').style.width = fsBaseWidth + '%';
    }, 900);
    setTimeout(() => { 
        if (document.getElementById('bar-fs-uplift')) document.getElementById('bar-fs-uplift').style.width = fsUpliftWidth + '%';
        if (document.getElementById('label-fs-uplift')) document.getElementById('label-fs-uplift').style.width = fsUpliftWidth + '%';
    }, 1700);
    setTimeout(() => { 
        if (document.getElementById('bar-fs-data')) document.getElementById('bar-fs-data').style.width = fsDataWidth + '%';
        if (document.getElementById('label-fs-data')) document.getElementById('label-fs-data').style.width = fsDataWidth + '%';
    }, 2500);
}

function calculateAndDisplayROI() {
    const { totalInvestment, participants, leads, productPrice, avgUnits, targetAvgUnits } = calculatorData;
    const baselineRevenue = participants * avgUnits * productPrice;
    const baselineROI = (baselineRevenue - totalInvestment) / totalInvestment;
    const baselineROAS = baselineRevenue / totalInvestment;
    
    const totalProductRevenue = participants * targetAvgUnits * productPrice; 
    const upliftRevenue = totalProductRevenue - baselineRevenue;
    const totalDataValue = leads * BENCHMARK_LEAD_VALUE;
    const totalValue = totalProductRevenue + totalDataValue;
    const fullStackROI = (totalValue - totalInvestment) / totalInvestment;
    const fullStackROAS = totalValue / totalInvestment;

    document.getElementById('tradParticipants').innerText = formatNumber(participants);
    document.getElementById('tradAvgUnits').innerText = formatUnits(avgUnits);
    document.getElementById('tradRevenue').innerText = formatCurrency(baselineRevenue);
    document.getElementById('tradROI').innerText = isFinite(baselineROI) ? formatPercent(baselineROI) : 'N/A';
    document.getElementById('tradROI_subtitle').innerText = formatPerDollar(baselineROAS);

    document.getElementById('phyTargetAvgUnits').innerText = formatUnits(targetAvgUnits);
    document.getElementById('phyRevenue').innerText = formatCurrency(totalProductRevenue);
    document.getElementById('phyDataValue').innerText = formatCurrency(totalDataValue);
    document.getElementById('phyTotalValue').innerText = formatCurrency(totalValue);
    document.getElementById('phyROI').innerText = isFinite(fullStackROI) ? formatPercent(fullStackROI) : 'N/A';
    document.getElementById('phyROI_subtitle').innerText = formatPerDollar(fullStackROAS);
    
    document.getElementById('didactic_investment_1').innerText = formatCurrency(totalInvestment);
    document.getElementById('didactic_revenue_1').innerText = formatCurrency(baselineRevenue);
    document.getElementById('didactic_uplift_revenue').innerText = formatCurrency(upliftRevenue);
    document.getElementById('didactic_data_value').innerText = formatCurrency(totalDataValue);
    
    return { baselineRevenue, totalValue, baselineROI, upliftRevenue, totalDataValue, baselineROAS, fullStackROAS };
}
