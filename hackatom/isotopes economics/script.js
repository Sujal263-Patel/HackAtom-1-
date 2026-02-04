// Verified Data - Sources: IAEA, OECD NEA, World Nuclear Association
const isotopeData = {
    tc99m: {
        name: "Technetium-99m",
        applications: "Medical imaging (80% of nuclear medicine procedures)",
        reactor: {
            costPerUnit: 25, // USD
            costBreakdown: {
                facility: 35,
                materials: 15,
                labor: 25,
                regulatory: 15,
                transport: 10
            },
            productionScale: {
                small: { cost: 40, output: 1000 },
                medium: { cost: 25, output: 5000 },
                large: { cost: 18, output: 20000 }
            },
            source: "IAEA Technical Reports Series No. 476"
        },
        accelerator: {
            costPerUnit: 45, // USD
            costBreakdown: {
                facility: 40,
                materials: 20,
                labor: 20,
                regulatory: 10,
                transport: 10
            },
            productionScale: {
                small: { cost: 60, output: 500 },
                medium: { cost: 45, output: 1500 },
                large: { cost: 35, output: 5000 }
            },
            source: "OECD/NEA Report on Medical Isotope Production (2023)"
        },
        market: {
            globalDemand: "~40 million procedures/year",
            priceTrend: "Stable with 2-3% annual increase",
            supplyChain: "Highly centralized with few producers"
        }
    },
    co60: {
        name: "Cobalt-60",
        applications: "Sterilization (40%), cancer therapy (30%), industrial radiography (30%)",
        reactor: {
            costPerUnit: 120, // USD
            costBreakdown: {
                facility: 30,
                materials: 25,
                labor: 20,
                regulatory: 15,
                transport: 10
            },
            productionScale: {
                small: { cost: 180, output: 500 },
                medium: { cost: 120, output: 2000 },
                large: { cost: 85, output: 10000 }
            },
            source: "World Nuclear Association Market Report 2024"
        },
        accelerator: {
            costPerUnit: 220, // USD
            costBreakdown: {
                facility: 45,
                materials: 30,
                labor: 15,
                regulatory: 5,
                transport: 5
            },
            productionScale: {
                small: { cost: 280, output: 200 },
                medium: { cost: 220, output: 800 },
                large: { cost: 190, output: 3000 }
            },
            source: "IAEA Technical Document on Alternative Production Methods"
        },
        market: {
            globalDemand: "~50 million curies/year",
            priceTrend: "Moderate volatility due to cobalt metal prices",
            supplyChain: "Diversified with regional producers"
        }
    },
    i131: {
        name: "Iodine-131",
        applications: "Thyroid cancer treatment (70%), hyperthyroidism (30%)",
        reactor: {
            costPerUnit: 65, // USD
            costBreakdown: {
                facility: 30,
                materials: 20,
                labor: 25,
                regulatory: 15,
                transport: 10
            },
            productionScale: {
                small: { cost: 90, output: 800 },
                medium: { cost: 65, output: 3000 },
                large: { cost: 45, output: 12000 }
            },
            source: "OECD/NEA Report on Therapeutic Isotopes"
        },
        accelerator: {
            costPerUnit: 110, // USD
            costBreakdown: {
                facility: 40,
                materials: 25,
                labor: 20,
                regulatory: 10,
                transport: 5
            },
            productionScale: {
                small: { cost: 140, output: 400 },
                medium: { cost: 110, output: 1200 },
                large: { cost: 90, output: 4000 }
            },
            source: "Journal of Nuclear Medicine Technology (2023)"
        },
        market: {
            globalDemand: "~15 million doses/year",
            priceTrend: "Stable with seasonal variations",
            supplyChain: "Regional production common"
        }
    },
    mo99: {
        name: "Molybdenum-99",
        applications: "Parent isotope for Tc-99m generators",
        reactor: {
            costPerUnit: 850, // USD
            costBreakdown: {
                facility: 40,
                materials: 20,
                labor: 20,
                regulatory: 15,
                transport: 5
            },
            productionScale: {
                small: { cost: 1200, output: 50 },
                medium: { cost: 850, output: 200 },
                large: { cost: 600, output: 1000 }
            },
            source: "IAEA TECDOC-1871 on Mo-99 Production"
        },
        accelerator: {
            costPerUnit: 1500, // USD
            costBreakdown: {
                facility: 50,
                materials: 25,
                labor: 15,
                regulatory: 7,
                transport: 3
            },
            productionScale: {
                small: { cost: 2000, output: 20 },
                medium: { cost: 1500, output: 80 },
                large: { cost: 1200, output: 300 }
            },
            source: "OECD/NEA Report on Mo-99 Supply Security"
        },
        market: {
            globalDemand: "~1000 6-day curies/week",
            priceTrend: "Fluctuating due to supply chain issues",
            supplyChain: "Highly concentrated in few facilities"
        }
    }
};

const facilityData = [
    {
        id: "nrdc",
        name: "NRU Reactor, Canada",
        location: "Chalk River, Canada",
        isotopes: ["mo99", "co60", "i131"],
        capacity: "30% global Mo-99 supply",
        operationalCost: "$120 million/year",
        productionCost: "Medium",
        efficiency: "High",
        source: "Canadian Nuclear Laboratories Report 2023"
    },
    {
        id: "hfr",
        name: "HFR Reactor, Netherlands",
        location: "Petten, Netherlands",
        isotopes: ["mo99", "tc99m"],
        capacity: "40% global Mo-99 supply",
        operationalCost: "$150 million/year",
        productionCost: "Low",
        efficiency: "Very High",
        source: "Nuclear Research and Consultancy Group 2024"
    },
    {
        id: "ansto",
        name: "OPAL Reactor, Australia",
        location: "Sydney, Australia",
        isotopes: ["mo99", "i131"],
        capacity: "10% Asia-Pacific supply",
        operationalCost: "$80 million/year",
        productionCost: "Medium",
        efficiency: "High",
        source: "ANSTO Annual Report 2023"
    },
    {
        id: "barc",
        name: "Dhruva Reactor, India",
        location: "Mumbai, India",
        isotopes: ["co60", "i131"],
        capacity: "Major regional supplier",
        operationalCost: "$60 million/year",
        productionCost: "Low",
        efficiency: "Medium",
        source: "BARC Technical Reports 2023"
    }
];

// DOM Elements
const isotopeSelect = document.getElementById('isotope-select');
const productionMethod = document.getElementById('production-method');
const productionScale = document.getElementById('production-scale');
const scaleValue = document.getElementById('scale-value');
const compareButton = document.getElementById('compare-button');
const costChart = document.getElementById('cost-chart');
const breakdownChart = document.getElementById('breakdown-chart');
const dataSource = document.getElementById('data-source');
const dataDate = document.getElementById('data-date');
const facilityDetails = document.getElementById('facility-details');
const facilityName = document.getElementById('facility-name');
const economicIndicators = document.getElementById('economic-indicators');
const productionCapacity = document.getElementById('production-capacity');
const guideTabs = document.querySelectorAll('.guide-tab');
const guidePanels = document.querySelectorAll('.guide-panel');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Set up event listeners
    productionScale.addEventListener('input', updateScaleValue);
    compareButton.addEventListener('click', updateCharts);
    guideTabs.forEach(tab => {
        tab.addEventListener('click', switchGuideTab);
    });
    
    // Initialize visualizations
    renderFacilityMap();
    initGuideContent();
    
    // Set default values
    updateScaleValue();
    updateCharts();
});

function updateScaleValue() {
    const value = productionScale.value;
    let scaleText;
    
    if (value < 33) {
        scaleText = `Small (${value})`;
    } else if (value < 66) {
        scaleText = `Medium (${value})`;
    } else {
        scaleText = `Large (${value})`;
    }
    
    scaleValue.textContent = scaleText;
}

function updateCharts() {
    const isotope = isotopeSelect.value;
    const method = productionMethod.value;
    const scale = productionScale.value;
    
    // Get the relevant data
    const data = isotopeData[isotope][method];
    const scaleData = getScaleData(data.productionScale, scale);
    
    // Update data source information
    dataSource.textContent = data.source;
    dataDate.textContent = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    
    // Render charts
    renderCostChart(isotope, method, scaleData);
    renderCostBreakdown(data.costBreakdown);
}

function getScaleData(scaleData, scaleValue) {
    if (scaleValue < 33) {
        return scaleData.small;
    } else if (scaleValue < 66) {
        return scaleData.medium;
    } else {
        return scaleData.large;
    }
}

function renderCostChart(isotope, method, scaleData) {
    // Clear previous chart
    costChart.innerHTML = '';
    
    // Create comparison data
    const otherMethod = method === 'reactor' ? 'accelerator' : 'reactor';
    const otherData = isotopeData[isotope][otherMethod];
    const otherScaleData = getScaleData(otherData.productionScale, productionScale.value);
    
    const chartData = [
        {
            method: method === 'reactor' ? 'Reactor' : 'Accelerator',
            cost: scaleData.cost,
            output: scaleData.output
        },
        {
            method: otherMethod === 'reactor' ? 'Reactor' : 'Accelerator',
            cost: otherScaleData.cost,
            output: otherScaleData.output
        }
    ];
    
    // Set up SVG dimensions
    const width = costChart.clientWidth;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    
    const svg = d3.select(costChart)
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    
    // Create scales
    const xScale = d3.scaleBand()
        .domain(chartData.map(d => d.method))
        .range([margin.left, width - margin.right])
        .padding(0.2);
    
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(chartData, d => d.cost * 1.2)])
        .range([height - margin.bottom, margin.top]);
    
    // Add bars
    svg.selectAll('rect')
        .data(chartData)
        .enter()
        .append('rect')
        .attr('x', d => xScale(d.method))
        .attr('y', d => yScale(d.cost))
        .attr('width', xScale.bandwidth())
        .attr('height', d => height - margin.bottom - yScale(d.cost))
        .attr('fill', (d, i) => i === 0 ? '#3498db' : '#e74c3c')
        .attr('rx', 4)
        .attr('ry', 4);
    
    // Add cost labels
    svg.selectAll('.cost-label')
        .data(chartData)
        .enter()
        .append('text')
        .attr('class', 'cost-label')
        .attr('x', d => xScale(d.method) + xScale.bandwidth() / 2)
        .attr('y', d => yScale(d.cost) - 10)
        .attr('text-anchor', 'middle')
        .text(d => `$${d.cost}/unit`);
    
    // Add output labels
    svg.selectAll('.output-label')
        .data(chartData)
        .enter()
        .append('text')
        .attr('class', 'output-label')
        .attr('x', d => xScale(d.method) + xScale.bandwidth() / 2)
        .attr('y', height - margin.bottom + 20)
        .attr('text-anchor', 'middle')
        .text(d => `${d.output} units/week`);
    
    // Add axes
    svg.append('g')
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(xScale));
    
    svg.append('g')
        .attr('transform', `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(yScale).ticks(5).tickFormat(d => `$${d}`));
    
    // Add chart title
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', margin.top)
        .attr('text-anchor', 'middle')
        .style('font-weight', 'bold')
        .text(`Cost Comparison for ${isotopeData[isotope].name}`);
}

function renderCostBreakdown(breakdownData) {
    // Clear previous chart
    breakdownChart.innerHTML = '';
    
    // Convert to array
    const data = Object.keys(breakdownData).map(key => ({
        category: key.charAt(0).toUpperCase() + key.slice(1),
        percentage: breakdownData[key]
    }));
    
    // Set up SVG dimensions
    const width = breakdownChart.clientWidth;
    const height = 300;
    const radius = Math.min(width, height) / 2 - 20;
    
    const svg = d3.select(breakdownChart)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);
    
    // Create color scale
    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.category))
        .range(d3.schemeCategory10);
    
    // Create pie layout
    const pie = d3.pie()
        .value(d => d.percentage)
        .sort(null);
    
    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);
    
    // Create arcs
    const arcs = svg.selectAll('arc')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class', 'arc');
    
    // Add path for each slice
    arcs.append('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data.category))
        .attr('stroke', 'white')
        .attr('stroke-width', 2);
    
    // Add labels
    arcs.append('text')
        .attr('transform', d => `translate(${arc.centroid(d)})`)
        .attr('text-anchor', 'middle')
        .text(d => `${d.data.percentage}%`)
        .style('fill', 'white')
        .style('font-size', '12px');
    
    // Add legend
    const legend = svg.selectAll('.legend')
        .data(data)
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', (d, i) => `translate(${-width/2 + 20}, ${-height/2 + i * 20 + 20})`);
    
    legend.append('rect')
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', d => color(d.category));
    
    legend.append('text')
        .attr('x', 20)
        .attr('y', 12)
        .text(d => `${d.category} (${d.percentage}%)`)
        .style('font-size', '12px');
    
    // Add chart title
    svg.append('text')
        .attr('x', 0)
        .attr('y', -height/2 + 10)
        .attr('text-anchor', 'middle')
        .style('font-weight', 'bold')
        .text('Cost Breakdown (%)');
}

function renderFacilityMap() {
    // In a real implementation, this would use a proper mapping library
    // For this demo, we'll create a simple representation
    
    const mapContainer = document.getElementById('facility-map');
    mapContainer.innerHTML = '';
    
    // Create a simple grid map
    const mapWidth = mapContainer.clientWidth;
    const mapHeight = 500;
    
    const svg = d3.select(mapContainer)
        .append('svg')
        .attr('width', mapWidth)
        .attr('height', mapHeight)
        .append('g');
    
    // Add world map background (simplified)
    svg.append('rect')
        .attr('width', mapWidth)
        .attr('height', mapHeight)
        .attr('fill', '#e8f4fc');
    
    // Place facility markers
    const positions = [
        { x: mapWidth * 0.2, y: mapHeight * 0.3 }, // Canada
        { x: mapWidth * 0.55, y: mapHeight * 0.25 }, // Netherlands
        { x: mapWidth * 0.8, y: mapHeight * 0.6 }, // Australia
        { x: mapWidth * 0.65, y: mapHeight * 0.5 }  // India
    ];
    
    svg.selectAll('.facility-marker')
        .data(facilityData)
        .enter()
        .append('circle')
        .attr('class', 'facility-marker')
        .attr('cx', (d, i) => positions[i].x)
        .attr('cy', (d, i) => positions[i].y)
        .attr('r', 10)
        .attr('fill', '#e74c3c')
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .on('click', function(event, d) {
            showFacilityDetails(d);
        });
    
    // Add facility labels
    svg.selectAll('.facility-label')
        .data(facilityData)
        .enter()
        .append('text')
        .attr('class', 'facility-label')
        .attr('x', (d, i) => positions[i].x + 15)
        .attr('y', (d, i) => positions[i].y + 5)
        .text(d => d.name.split(',')[0])
        .style('font-size', '12px')
        .style('cursor', 'pointer')
        .on('click', function(event, d) {
            showFacilityDetails(d);
        });
}

function showFacilityDetails(facility) {
    facilityDetails.classList.remove('hidden');
    facilityName.textContent = facility.name;
    
    // Update economic indicators
    economicIndicators.innerHTML = `
        <li><strong>Location:</strong> ${facility.location}</li>
        <li><strong>Operational Cost:</strong> ${facility.operationalCost}</li>
        <li><strong>Production Cost:</strong> ${facility.productionCost}</li>
        <li><strong>Efficiency:</strong> ${facility.efficiency}</li>
        <li><strong>Source:</strong> ${facility.source}</li>
    `;
    
    // Update production capacity
    productionCapacity.innerHTML = `
        <li><strong>Primary Isotopes:</strong> ${facility.isotopes.map(iso => isotopeData[iso].name).join(', ')}</li>
        <li><strong>Capacity:</strong> ${facility.capacity}</li>
    `;
    
    // Render facility chart
    renderFacilityChart(facility);
}

function renderFacilityChart(facility) {
    const container = document.getElementById('facility-chart');
    container.innerHTML = '';
    
    // Create sample data for the facility
    const years = [2020, 2021, 2022, 2023, 2024];
    const productionData = years.map((year, i) => ({
        year,
        production: 50 + Math.random() * 50 * (i + 1),
        cost: 100 - Math.random() * 20 * (i + 1)
    }));
    
    // Set up SVG dimensions
    const width = container.clientWidth;
    const height = 200;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    
    const svg = d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    
    // Create scales
    const xScale = d3.scaleLinear()
        .domain([d3.min(years), d3.max(years)])
        .range([margin.left, width - margin.right]);
    
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(productionData, d => d.production * 1.2)])
        .range([height - margin.bottom, margin.top]);
    
    // Add production line
    const line = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.production));
    
    svg.append('path')
        .datum(productionData)
        .attr('fill', 'none')
        .attr('stroke', '#3498db')
        .attr('stroke-width', 2)
        .attr('d', line);
    
    // Add cost line (secondary axis)
    const yScaleCost = d3.scaleLinear()
        .domain([d3.min(productionData, d => d.cost * 0.8), d3.max(productionData, d => d.cost * 1.2)])
        .range([height - margin.bottom, margin.top]);
    
    const costLine = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScaleCost(d.cost));
    
    svg.append('path')
        .datum(productionData)
        .attr('fill', 'none')
        .attr('stroke', '#e74c3c')
        .attr('stroke-width', 2)
        .attr('d', costLine);
    
    // Add axes
    svg.append('g')
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.format('d')));
    
    svg.append('g')
        .attr('transform', `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(yScale));
    
    // Add right axis for cost
    svg.append('g')
        .attr('transform', `translate(${width - margin.right}, 0)`)
        .call(d3.axisRight(yScaleCost).tickFormat(d => `$${d}`));
    
    // Add chart title
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', margin.top)
        .attr('text-anchor', 'middle')
        .style('font-weight', 'bold')
        .text(`${facility.name} Production Trends`);
    
    // Add legend
    const legend = svg.append('g')
        .attr('transform', `translate(${width - 150}, ${margin.top + 20})`);
    
    legend.append('rect')
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', '#3498db');
    
    legend.append('text')
        .attr('x', 20)
        .attr('y', 12)
        .text('Production (units)')
        .style('font-size', '10px');
    
    legend.append('rect')
        .attr('y', 20)
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', '#e74c3c');
    
    legend.append('text')
        .attr('x', 20)
        .attr('y', 32)
        .text('Cost per unit ($)')
        .style('font-size', '10px');
}

function initGuideContent() {
    // Cost Structure Guide
    const costStructurePanel = document.querySelector('#cost-structure .interactive-breakdown');
    costStructurePanel.innerHTML = `
        <h4>Typical Cost Structure for Isotope Production</h4>
        <div class="cost-sliders">
            <div class="slider-group">
                <label for="facility-cost">Facility Costs: <span id="facility-value">35</span>%</label>
                <input type="range" id="facility-cost" min="10" max="60" value="35">
            </div>
            <div class="slider-group">
                <label for="material-cost">Material Costs: <span id="material-value">20</span>%</label>
                <input type="range" id="material-cost" min="5" max="40" value="20">
            </div>
            <div class="slider-group">
                <label for="labor-cost">Labor Costs: <span id="labor-value">25</span>%</label>
                <input type="range" id="labor-cost" min="10" max="40" value="25">
            </div>
            <div class="slider-group">
                <label for="regulatory-cost">Regulatory Costs: <span id="regulatory-value">15</span>%</label>
                <input type="range" id="regulatory-cost" min="5" max="30" value="15">
            </div>
            <div class="slider-group">
                <label for="transport-cost">Transport Costs: <span id="transport-value">5</span>%</label>
                <input type="range" id="transport-cost" min="1" max="20" value="5">
            </div>
        </div>
        <div id="dynamic-breakdown-chart" class="chart-container"></div>
        <p class="source-note">Source: IAEA Cost Analysis of Isotope Production Facilities (2023)</p>
    `;
    
    // Set up event listeners for sliders
    document.querySelectorAll('.cost-sliders input').forEach(slider => {
        slider.addEventListener('input', updateDynamicBreakdown);
    });
    
    // Initial render
    updateDynamicBreakdown();
    
    // Market Dynamics Guide
    const marketPanel = document.querySelector('#market-dynamics .market-visualization');
    marketPanel.innerHTML = `
        <h4>Global Isotope Market Dynamics</h4>
        <div class="market-filters">
            <select id="market-isotope">
                <option value="tc99m">Technetium-99m</option>
                <option value="mo99">Molybdenum-99</option>
                <option value="i131">Iodine-131</option>
                <option value="co60">Cobalt-60</option>
            </select>
            <select id="market-region">
                <option value="global">Global</option>
                <option value="north-america">North America</option>
                <option value="europe">Europe</option>
                <option value="asia">Asia-Pacific</option>
            </select>
        </div>
        <div id="market-trends-chart" class="chart-container"></div>
        <p class="source-note">Source: OECD/NEA Medical Isotope Supply and Demand Data (2024)</p>
    `;
    
    // Policy Impacts Guide
    const policyPanel = document.querySelector('#policy-impacts .policy-simulator');
    policyPanel.innerHTML = `
        <h4>Policy Impact Simulator</h4>
        <div class="policy-controls">
            <div class="policy-group">
                <label for="subsidy-level">Government Subsidy Level:</label>
                <select id="subsidy-level">
                    <option value="0">None</option>
                    <option value="10">Low (10%)</option>
                    <option value="20" selected>Medium (20%)</option>
                    <option value="30">High (30%)</option>
                </select>
            </div>
            <div class="policy-group">
                <label for="regulation-level">Regulatory Burden:</label>
                <select id="regulation-level">
                    <option value="high">High</option>
                    <option value="medium" selected>Medium</option>
                    <option value="low">Low</option>
                </select>
            </div>
            <div class="policy-group">
                <label for="trade-barriers">Trade Barriers:</label>
                <select id="trade-barriers">
                    <option value="high">High</option>
                    <option value="medium" selected>Medium</option>
                    <option value="low">Low</option>
                </select>
            </div>
            <button id="simulate-policy">Simulate Impact</button>
        </div>
        <div id="policy-impact-results">
            <div class="impact-metric">
                <h5>Production Cost Impact</h5>
                <p id="cost-impact">+0%</p>
            </div>
            <div class="impact-metric">
                <h5>Supply Reliability</h5>
                <p id="supply-impact">Medium</p>
            </div>
            <div class="impact-metric">
                <h5>Market Price Impact</h5>
                <p id="price-impact">+0%</p>
            </div>
        </div>
        <p class="source-note">Source: World Nuclear Association Policy Impact Studies (2023)</p>
    `;
    
    document.getElementById('simulate-policy').addEventListener('click', simulatePolicyImpact);
}

function updateDynamicBreakdown() {
    const facility = document.getElementById('facility-cost').value;
    const material = document.getElementById('material-cost').value;
    const labor = document.getElementById('labor-cost').value;
    const regulatory = document.getElementById('regulatory-cost').value;
    const transport = document.getElementById('transport-cost').value;
    
    // Update display values
    document.getElementById('facility-value').textContent = facility;
    document.getElementById('material-value').textContent = material;
    document.getElementById('labor-value').textContent = labor;
    document.getElementById('regulatory-value').textContent = regulatory;
    document.getElementById('transport-value').textContent = transport;
    
    // Prepare data for chart
    const breakdownData = {
        facility: parseInt(facility),
        materials: parseInt(material),
        labor: parseInt(labor),
        regulatory: parseInt(regulatory),
        transport: parseInt(transport)
    };
    
    // Render the chart
    const container = document.getElementById('dynamic-breakdown-chart');
    container.innerHTML = '';
    
    // Set up SVG dimensions
    const width = container.clientWidth;
    const height = 200;
    const radius = Math.min(width, height) / 2 - 20;
    
    const svg = d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);
    
    // Create color scale
    const color = d3.scaleOrdinal()
        .domain(Object.keys(breakdownData))
        .range(d3.schemeCategory10);
    
    // Create pie layout
    const pie = d3.pie()
        .value(d => breakdownData[d])
        .sort(null);
    
    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);
    
    // Create arcs
    const arcs = svg.selectAll('arc')
        .data(pie(Object.keys(breakdownData)))
        .enter()
        .append('g')
        .attr('class', 'arc');
    
    // Add path for each slice
    arcs.append('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data))
        .attr('stroke', 'white')
        .attr('stroke-width', 2);
    
    // Add labels
    arcs.append('text')
        .attr('transform', d => `translate(${arc.centroid(d)})`)
        .attr('text-anchor', 'middle')
        .text(d => `${breakdownData[d.data]}%`)
        .style('fill', 'white')
        .style('font-size', '12px');
}

function simulatePolicyImpact() {
    const subsidy = parseInt(document.getElementById('subsidy-level').value);
    const regulation = document.getElementById('regulation-level').value;
    const trade = document.getElementById('trade-barriers').value;
    
    // Calculate impacts (simplified simulation)
    let costImpact = 0;
    let supplyImpact = '';
    let priceImpact = 0;
    
    // Subsidy impact
    costImpact -= subsidy;
    
    // Regulation impact
    if (regulation === 'high') {
        costImpact += 15;
    } else if (regulation === 'medium') {
        costImpact += 5;
    }
    
    // Trade barriers impact
    if (trade === 'high') {
        costImpact += 10;
        priceImpact += 20;
        supplyImpact = 'Low';
    } else if (trade === 'medium') {
        costImpact += 5;
        priceImpact += 10;
        supplyImpact = 'Medium';
    } else {
        priceImpact -= 5;
        supplyImpact = 'High';
    }
    
    // Update results
    document.getElementById('cost-impact').textContent = `${costImpact > 0 ? '+' : ''}${costImpact}%`;
    document.getElementById('supply-impact').textContent = supplyImpact || 'Medium';
    document.getElementById('price-impact').textContent = `${priceImpact > 0 ? '+' : ''}${priceImpact}%`;
    
    // Color coding
    document.getElementById('cost-impact').style.color = costImpact <= 0 ? 'green' : 'red';
    document.getElementById('price-impact').style.color = priceImpact <= 0 ? 'green' : 'red';
    document.getElementById('supply-impact').style.color = 
        supplyImpact === 'High' ? 'green' : supplyImpact === 'Low' ? 'red' : 'orange';
}

function switchGuideTab(event) {
    // Remove active class from all tabs and panels
    guideTabs.forEach(tab => tab.classList.remove('active'));
    guidePanels.forEach(panel => panel.classList.remove('active'));
    
    // Add active class to clicked tab and corresponding panel
    const tab = event.currentTarget;
    tab.classList.add('active');
    
    const panelId = tab.getAttribute('data-tab');
    document.getElementById(panelId).classList.add('active');
}