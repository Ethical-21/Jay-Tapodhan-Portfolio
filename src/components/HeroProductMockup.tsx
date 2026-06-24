import './HeroProductMockup.css'; // We'll create this CSS file

export default function HeroProductMockup() {
  return (
    <div className="product-mockup-wrapper">
      <div className="product-mockup">
        
        {/* Top Navbar of the mock UI */}
        <div className="mockup-header">
          <div className="mockup-dots">
            <span className="dot close"></span>
            <span className="dot min"></span>
            <span className="dot max"></span>
          </div>
          <div className="mockup-url">dashboard.app/overview</div>
        </div>
        
        {/* Main Body of mock UI */}
        <div className="mockup-body">
          {/* Sidebar */}
          <div className="mockup-sidebar">
            <div className="sidebar-item active"></div>
            <div className="sidebar-item"></div>
            <div className="sidebar-item"></div>
          </div>
          
          {/* Content Area */}
          <div className="mockup-content">
            {/* Header Area */}
            <div className="content-header">
              <div className="header-title"></div>
              <div className="header-button"></div>
            </div>
            
            {/* Metrics Row */}
            <div className="metrics-row">
              <div className="metric-card">
                <div className="metric-icon"></div>
                <div className="metric-bar"></div>
              </div>
              <div className="metric-card">
                <div className="metric-icon ai-icon"></div>
                <div className="metric-bar ai-bar"></div>
              </div>
            </div>
            
            {/* Main Data View */}
            <div className="data-view">
              <div className="data-row"></div>
              <div className="data-row"></div>
              <div className="data-row"></div>
            </div>
          </div>
        </div>
        
      </div>
      
      {/* Floating Elements */}
      <div className="floating-card ai-assistant">
        <div className="ai-pulse"></div>
        <div className="ai-text">AI integration active</div>
      </div>
      
      <div className="floating-card deploy-status">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        <span>Build successful</span>
      </div>
    </div>
  );
}
