// Luxstone Group Strategic Analysis Website JavaScript - 2025 Version - Fixed

class LuxstoneAnalysisApp {
    constructor() {
        this.currentSection = 'executive-dashboard';
        this.charts = {};
        this.initialized = false;
        this.data = {
            portfolio: {
                sectors: ['AI/ML & Revenue Ops', 'B2B SaaS', 'Other Technology'],
                investments: [6, 4, 2],
                colors: ['#1FB8CD', '#FFC185', '#B4413C']
            },
            wealth: {
                categories: ['2020 Companies Value', 'Luxstone AUM', 'Real Estate', 'Other Assets'],
                values: [400, 200, 50, 150],
                colors: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5']
            },
            projections: {
                years: ['2024', '2025', '2026'],
                netWorth: [650, 750, 900],
                investments: [40, 50, 65],
                colors: ['#1FB8CD', '#5D878F']
            }
        };
        
        this.init();
    }
    
    init() {
        console.log('Initializing Luxstone Analysis App - 2025 Version...');
        
        // Wait for DOM to be fully ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeApp();
            });
        } else {
            this.initializeApp();
        }
    }
    
    initializeApp() {
        console.log('DOM ready, setting up application...');
        
        // Ensure we start with executive dashboard
        this.setupNavigation();
        this.showSection('executive-dashboard');
        this.initializeCharts();
        this.setupInteractiveElements();
        this.initialized = true;
        
        console.log('App initialized successfully');
    }
    
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        console.log('Setting up navigation for', navLinks.length, 'links');
        
        navLinks.forEach((link, index) => {
            // Remove any existing event listeners
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            
            // Add fresh event listener
            newLink.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const targetSection = newLink.getAttribute('data-section');
                console.log('Navigation clicked:', targetSection);
                
                if (targetSection) {
                    this.showSection(targetSection);
                    this.updateActiveNavLink(newLink);
                }
            });
            
            console.log(`Nav link ${index + 1} setup:`, newLink.getAttribute('data-section'));
        });
        
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                const sections = [
                    'executive-dashboard', 'leadership-analysis', 'investment-strategy',
                    'portfolio-analysis', 'financial-analysis', 'competitive-positioning',
                    'strategic-predictions', 'investment-framework', 'works-cited'
                ];
                
                const currentIndex = sections.indexOf(this.currentSection);
                
                if (e.key === 'ArrowRight' && currentIndex < sections.length - 1) {
                    e.preventDefault();
                    this.navigateToSection(sections[currentIndex + 1]);
                } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
                    e.preventDefault();
                    this.navigateToSection(sections[currentIndex - 1]);
                }
            }
        });
        
        console.log('Navigation setup complete');
    }
    
    navigateToSection(sectionId) {
        console.log('Programmatic navigation to:', sectionId);
        this.showSection(sectionId);
        const navLink = document.querySelector(`[data-section="${sectionId}"]`);
        if (navLink) {
            this.updateActiveNavLink(navLink);
        }
    }
    
    showSection(sectionId) {
        console.log('Showing section:', sectionId);
        
        // First, hide all sections completely
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none';
        });
        
        // Then show the target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = 'block';
            targetSection.classList.add('active');
            this.currentSection = sectionId;
            
            // Force a reflow
            targetSection.offsetHeight;
            
            // Trigger chart rendering for the active section after a delay
            setTimeout(() => {
                this.renderSectionCharts(sectionId);
            }, 150);
            
            // Update page title
            this.updatePageTitle(sectionId);
            
            console.log('Section shown successfully:', sectionId);
        } else {
            console.error('Section not found:', sectionId);
        }
    }
    
    updateActiveNavLink(activeLink) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    updatePageTitle(sectionId) {
        const titles = {
            'executive-dashboard': 'Executive Dashboard',
            'leadership-analysis': 'Leadership Analysis',
            'investment-strategy': 'Investment Strategy',
            'portfolio-analysis': 'Portfolio Analysis',
            'financial-analysis': 'Financial Analysis',
            'competitive-positioning': 'Market Position',
            'strategic-predictions': '2025-26 Outlook',
            'investment-framework': 'Due Diligence'
        };
        
        document.title = `${titles[sectionId]} | Luxstone Group Strategic Analysis`;
    }
    
    initializeCharts() {
        console.log('Initializing charts...');
        
        // Initialize charts with delay to ensure DOM is ready
        setTimeout(() => {
            this.createPortfolioChart();
            this.createWealthChart();
            this.createProjectionChart();
        }, 300);
    }
    
    renderSectionCharts(sectionId) {
        console.log('Rendering charts for section:', sectionId);
        
        switch(sectionId) {
            case 'portfolio-analysis':
                setTimeout(() => {
                    if (!this.charts.portfolio || this.charts.portfolio.canvas === null) {
                        this.createPortfolioChart();
                    } else {
                        this.charts.portfolio.resize();
                    }
                }, 200);
                break;
            case 'financial-analysis':
                setTimeout(() => {
                    if (!this.charts.wealth || this.charts.wealth.canvas === null) {
                        this.createWealthChart();
                    }
                    if (!this.charts.projection || this.charts.projection.canvas === null) {
                        this.createProjectionChart();
                    }
                    if (this.charts.wealth) {
                        this.charts.wealth.resize();
                    }
                    if (this.charts.projection) {
                        this.charts.projection.resize();
                    }
                }, 200);
                break;
        }
    }
    
    createPortfolioChart() {
        const canvas = document.getElementById('portfolioChart');
        if (!canvas) {
            console.warn('Portfolio chart canvas not found');
            return;
        }
        
        // Destroy existing chart if it exists
        if (this.charts.portfolio) {
            this.charts.portfolio.destroy();
        }
        
        const ctx = canvas.getContext('2d');
        
        try {
            this.charts.portfolio = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: this.data.portfolio.sectors,
                    datasets: [{
                        data: this.data.portfolio.investments,
                        backgroundColor: this.data.portfolio.colors,
                        borderWidth: 2,
                        borderColor: '#ffffff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: '2025 Portfolio Composition by Sector (12+ Companies)',
                            font: {
                                size: 16,
                                weight: 'bold'
                            },
                            color: '#1e3a5f'
                        },
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                font: {
                                    size: 12
                                },
                                color: '#4a5568'
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const label = context.label || '';
                                    const value = context.parsed;
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = ((value / total) * 100).toFixed(1);
                                    return `${label}: ${value} investments (${percentage}%)`;
                                }
                            }
                        }
                    }
                }
            });
            
            console.log('Portfolio chart created successfully');
        } catch (error) {
            console.error('Error creating portfolio chart:', error);
        }
    }
    
    createWealthChart() {
        const canvas = document.getElementById('wealthChart');
        if (!canvas) {
            console.warn('Wealth chart canvas not found');
            return;
        }
        
        // Destroy existing chart if it exists
        if (this.charts.wealth) {
            this.charts.wealth.destroy();
        }
        
        const ctx = canvas.getContext('2d');
        
        try {
            this.charts.wealth = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: this.data.wealth.categories,
                    datasets: [{
                        label: 'Value ($M)',
                        data: this.data.wealth.values,
                        backgroundColor: this.data.wealth.colors,
                        borderWidth: 1,
                        borderColor: '#ffffff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: '2025 Asset Breakdown ($600-800M Total Net Worth)',
                            font: {
                                size: 16,
                                weight: 'bold'
                            },
                            color: '#1e3a5f'
                        },
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.label}: $${context.parsed.y}M`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Value (Millions USD)',
                                color: '#4a5568',
                                font: {
                                    weight: 'bold'
                                }
                            },
                            ticks: {
                                callback: function(value) {
                                    return '$' + value + 'M';
                                },
                                color: '#4a5568'
                            },
                            grid: {
                                color: '#e2e8f0'
                            }
                        },
                        x: {
                            ticks: {
                                color: '#4a5568',
                                maxRotation: 45
                            },
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
            
            console.log('Wealth chart created successfully');
        } catch (error) {
            console.error('Error creating wealth chart:', error);
        }
    }
    
    createProjectionChart() {
        const canvas = document.getElementById('projectionChart');
        if (!canvas) {
            console.warn('Projection chart canvas not found');
            return;
        }
        
        // Destroy existing chart if it exists
        if (this.charts.projection) {
            this.charts.projection.destroy();
        }
        
        const ctx = canvas.getContext('2d');
        
        try {
            this.charts.projection = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: this.data.projections.years,
                    datasets: [
                        {
                            label: 'Net Worth ($M)',
                            data: this.data.projections.netWorth,
                            borderColor: this.data.projections.colors[0],
                            backgroundColor: this.data.projections.colors[0] + '20',
                            borderWidth: 3,
                            fill: true,
                            tension: 0.4,
                            yAxisID: 'y'
                        },
                        {
                            label: 'Annual Investment ($M)',
                            data: this.data.projections.investments,
                            borderColor: this.data.projections.colors[1],
                            backgroundColor: this.data.projections.colors[1] + '20',
                            borderWidth: 3,
                            fill: true,
                            tension: 0.4,
                            yAxisID: 'y1'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                        mode: 'index',
                        intersect: false
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: '2025-2026 Financial Projections',
                            font: {
                                size: 16,
                                weight: 'bold'
                            },
                            color: '#1e3a5f'
                        },
                        legend: {
                            position: 'top',
                            labels: {
                                padding: 20,
                                font: {
                                    size: 12
                                },
                                color: '#4a5568'
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const label = context.dataset.label || '';
                                    const value = context.parsed.y;
                                    return `${label}: $${value}M`;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Year',
                                color: '#4a5568',
                                font: {
                                    weight: 'bold'
                                }
                            },
                            ticks: {
                                color: '#4a5568'
                            },
                            grid: {
                                color: '#e2e8f0'
                            }
                        },
                        y: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                            title: {
                                display: true,
                                text: 'Net Worth ($M)',
                                color: this.data.projections.colors[0],
                                font: {
                                    weight: 'bold'
                                }
                            },
                            ticks: {
                                callback: function(value) {
                                    return '$' + value + 'M';
                                },
                                color: this.data.projections.colors[0]
                            },
                            grid: {
                                color: '#e2e8f0'
                            }
                        },
                        y1: {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            title: {
                                display: true,
                                text: 'Investment ($M)',
                                color: this.data.projections.colors[1],
                                font: {
                                    weight: 'bold'
                                }
                            },
                            ticks: {
                                callback: function(value) {
                                    return '$' + value + 'M';
                                },
                                color: this.data.projections.colors[1]
                            },
                            grid: {
                                drawOnChartArea: false
                            }
                        }
                    }
                }
            });
            
            console.log('Projection chart created successfully');
        } catch (error) {
            console.error('Error creating projection chart:', error);
        }
    }
    
    setupInteractiveElements() {
        // Add smooth scrolling for any internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Add print functionality
        this.setupPrintFunction();
        
        // Add metric card hover effects with intersection observer
        this.setupMetricCardAnimations();
        
        // Setup citation click handlers
        this.setupCitationHandlers();
        
        console.log('Interactive elements set up');
    }
    
    setupPrintFunction() {
        // Add keyboard shortcut for printing
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
                e.preventDefault();
                this.printReport();
            }
        });
    }
    
    printReport() {
        // Show all sections for printing
        const sections = document.querySelectorAll('.content-section');
        const originalDisplayValues = [];
        
        sections.forEach((section, index) => {
            originalDisplayValues[index] = section.style.display;
            section.style.display = 'block';
            section.classList.add('active');
        });
        
        // Hide navigation for print
        const nav = document.querySelector('.sidebar-nav');
        const originalNavDisplay = nav ? nav.style.display : '';
        if (nav) {
            nav.style.display = 'none';
        }
        
        window.print();
        
        // Restore original state after print
        setTimeout(() => {
            sections.forEach((section, index) => {
                section.style.display = originalDisplayValues[index];
                section.classList.remove('active');
            });
            if (nav) {
                nav.style.display = originalNavDisplay;
            }
            this.showSection(this.currentSection);
        }, 1000);
    }
    
    setupMetricCardAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe metric cards and other animated elements
        const animatedElements = document.querySelectorAll('.metric-card, .leader-profile, .framework-item, .focus-area, .pattern-item, .prediction-card');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    setupCitationHandlers() {
        // Add click handlers to all citations
        const citations = document.querySelectorAll('.citation');
        citations.forEach(citation => {
            citation.addEventListener('click', (e) => {
                e.preventDefault();
                const sourceId = citation.getAttribute('data-source');
                
                // Navigate to Works Cited section
                this.navigateToSection('works-cited');
                
                // After a short delay, scroll to the specific citation
                setTimeout(() => {
                    const targetCitation = document.getElementById(`citation-${sourceId}`);
                    if (targetCitation) {
                        targetCitation.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                        
                        // Add a highlight effect
                        targetCitation.classList.add('highlight');
                        setTimeout(() => {
                            targetCitation.classList.remove('highlight');
                        }, 2000);
                    }
                }, 300);
            });
            
            // Add tooltip on hover
            citation.setAttribute('title', `Click to view citation [${citation.getAttribute('data-source')}]`);
        });
        
        console.log(`Set up ${citations.length} citation click handlers`);
    }
    
    // Utility and debug methods
    formatCurrency(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount * 1000000);
    }
    
    formatNumber(number) {
        return new Intl.NumberFormat('en-US').format(number);
    }
    
    handleResize() {
        Object.values(this.charts).forEach(chart => {
            if (chart && typeof chart.resize === 'function') {
                try {
                    chart.resize();
                } catch (error) {
                    console.warn('Error resizing chart:', error);
                }
            }
        });
    }
    
    handleError(error, context) {
        console.error(`Error in ${context}:`, error);
    }
    
    debugNavigation() {
        console.log('=== Navigation Debug - 2025 ===');
        console.log('Current section:', this.currentSection);
        console.log('Available sections:', document.querySelectorAll('.content-section').length);
        console.log('Navigation links:', document.querySelectorAll('.nav-link').length);
        console.log('Initialized:', this.initialized);
        
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            console.log(`Section ${section.id}: ${section.classList.contains('active') ? 'active' : 'inactive'} (display: ${section.style.display || 'default'})`);
        });
        
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach((link, index) => {
            console.log(`Nav link ${index + 1}: ${link.getAttribute('data-section')} - ${link.classList.contains('active') ? 'active' : 'inactive'}`);
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded - Initializing Luxstone Group Strategic Analysis Website - 2025 Version...');
    
    // Verify all sections exist
    const expectedSections = [
        'executive-dashboard', 'leadership-analysis', 'investment-strategy',
        'portfolio-analysis', 'financial-analysis', 'competitive-positioning',
        'strategic-predictions', 'investment-framework', 'works-cited'
    ];
    
    const missingSections = expectedSections.filter(id => !document.getElementById(id));
    if (missingSections.length > 0) {
        console.error('Missing sections:', missingSections);
    } else {
        console.log('All 9 sections found successfully');
    }
    
    // Initialize main app
    const app = new LuxstoneAnalysisApp();
    
    // Make app globally available for debugging
    window.luxstoneApp = app;
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (app.initialized) {
                app.handleResize();
            }
        }, 250);
    });
    
    // Add loading state management
    document.body.classList.add('loaded');
    
    console.log('Luxstone Group Strategic Analysis Website - 2025 Version initialized successfully');
    console.log('Navigation: Use sidebar navigation or Ctrl+Arrow keys to navigate between sections');
    console.log('Print: Use Ctrl+P to print the full report');
    console.log('Debug: Use luxstoneApp.debugNavigation() in console for navigation debugging');
});

// Global error handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// Enhanced keyboard shortcuts for 2025 version
document.addEventListener('keydown', (e) => {
    // Alt + number keys for quick section navigation
    if (e.altKey && e.key >= '1' && e.key <= '9') {
        e.preventDefault();
        const sections = [
            'executive-dashboard', 'leadership-analysis', 'investment-strategy',
            'portfolio-analysis', 'financial-analysis', 'competitive-positioning',
            'strategic-predictions', 'investment-framework', 'works-cited'
        ];
        const sectionIndex = parseInt(e.key) - 1;
        if (window.luxstoneApp && sections[sectionIndex] && window.luxstoneApp.initialized) {
            window.luxstoneApp.navigateToSection(sections[sectionIndex]);
        }
    }
});