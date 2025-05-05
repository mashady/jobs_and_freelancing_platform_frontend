<template>
    <div class="proposals-page">
      <h1>My Proposals</h1>
      
      <div class="search-sort-container">
        <div class="search-box">
          <input type="text" placeholder="Search..." v-model="searchQuery">
          <button @click="searchProposals">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div class="sort-options">
          <label>Sort by:</label>
          <select v-model="sortOption">
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="cost-high">Cost (High to Low)</option>
            <option value="cost-low">Cost (Low to High)</option>
          </select>
        </div>
      </div>
      
      <hr class="divider">
      
      <div class="proposals-header">
        <div class="header-title">Title</div>
        <div class="header-cost">Cost/Time</div>
        <div class="header-status">Status</div>
        <div class="header-actions">Actions</div>
      </div>
      
      <hr class="divider">
      
      <div class="proposals-list">
        <div class="proposal-item" v-for="proposal in filteredProposals" :key="proposal.id">
          <div class="proposal-title">
            <h3>{{ proposal.title }}</h3>
            <div class="location-date">
              <span class="location" :style="{ color: proposal.locationColor }">{{ proposal.location }}</span>
              <span class="date">{{ proposal.date }}</span>
            </div>
          </div>
          
          <div class="proposal-cost">{{ proposal.cost }}</div>
          
          <div class="proposal-status">
            <span :class="['status-badge', proposal.status.toLowerCase()]">{{ proposal.status }}</span>
          </div>
          
          <div class="proposal-actions">
            <button class="action-btn view-btn">View</button>
            <button class="action-btn edit-btn">Edit</button>
            <button class="action-btn withdraw-btn">Withdraw</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: '',
        sortOption: 'newest',
        proposals: [
          {
            id: 1,
            title: 'Website Designer Required For My Project',
            location: 'Los Angeles',
            locationColor: '#4CAF50',
            date: 'February 24, 2025',
            cost: '$150 in 14 hours',
            status: 'Pending'
          },
        ]
      }
    },
    computed: {
      filteredProposals() {
        let filtered = [...this.proposals];
        
        if (this.searchQuery) {
          const query = this.searchQuery.toLowerCase();
          filtered = filtered.filter(proposal => 
            proposal.title.toLowerCase().includes(query) ||
            proposal.location.toLowerCase().includes(query)
          );
        }
        
        switch (this.sortOption) {
          case 'newest':
            filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
          case 'oldest':
            filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
          case 'cost-high':
            filtered.sort((a, b) => this.extractCost(b.cost) - this.extractCost(a.cost));
            break;
          case 'cost-low':
            filtered.sort((a, b) => this.extractCost(a.cost) - this.extractCost(b.cost));
            break;
        }
        
        return filtered;
      }
    },
    methods: {
      extractCost(costString) {
        // Extract numeric value from cost string like "$150 in 14 hours"
        const match = costString.match(/\$(\d+)/);
        return match ? parseInt(match[1]) : 0;
      },
      searchProposals() {
      }
    }
  }
  </script>
  
  <style scoped>
  .proposals-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  h1 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
  }
  
  .search-sort-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .search-box {
    position: relative;
    width: 300px;
  }
  
  .search-box input {
    width: 100%;
    padding: 10px 15px;
    padding-right: 40px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }
  
  .search-box button {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: #666;
  }
  
  .sort-options {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .sort-options label {
    font-size: 14px;
    color: #666;
  }
  
  .sort-options select {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }
  
  .divider {
    border: none;
    border-top: 1px solid #eee;
    margin: 15px 0;
  }
  
  .proposals-header {
    display: grid;
    grid-template-columns: 3fr 1fr 1fr 1fr;
    padding: 10px 0;
    font-weight: bold;
    color: #666;
  }
  
  .proposal-item {
    display: grid;
    grid-template-columns: 3fr 1fr 1fr 1fr;
    padding: 15px 0;
    border-bottom: 1px solid #f5f5f5;
  }
  
  .proposal-title h3 {
    font-size: 16px;
    margin-bottom: 5px;
    color: #333;
  }
  
  .location-date {
    display: flex;
    gap: 15px;
    font-size: 14px;
    color: #888;
  }
  
  .location::before {
    content: '⬤';
    margin-right: 5px;
    font-size: 10px;
  }
  
  .proposal-cost {
    font-size: 14px;
    color: #333;
    display: flex;
    align-items: center;
  }
  
  .status-badge {
    padding: 5px 10px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
  }
  
  .status-badge.pending {
    background-color: #FFF3E0;
    color: #E65100;
  }
  
  .proposal-actions {
    display: flex;
    gap: 10px;
  }
  
  .action-btn {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .view-btn {
    background-color: #E3F2FD;
    color: #1976D2;
  }
  
  .edit-btn {
    background-color: #E8F5E9;
    color: #388E3C;
  }
  
  .withdraw-btn {
    background-color: #FFEBEE;
    color: #D32F2F;
  }
  
  .action-btn:hover {
    opacity: 0.9;
  }
  </style>