# e-Chem AI-Powered FAQ Chatbot

## Project Overview

This is a technical assignment for W3S Solutions. It is an AI chatbot designed for e-Chem to automate responses regarding A/L Chemistry classes, exam centers, and student results.

---

## AI Service Used

**Google Gemini API**

The Google Gemini API was selected for the following reasons:

- **Fast Response Times**: Provides quick and efficient responses to user queries
- **Contextual Understanding**: Excellent ability to handle grounded context for specific organizational data
- **Cost-Effective**: Competitive pricing for high-volume API calls
- **Reliability**: Stable and mature service with comprehensive documentation
- **Integration**: Seamless integration with Laravel through the Google Gemini PHP package

---

## Project Setup Instructions

### Prerequisites

- PHP 8.1 or higher
- Composer
- Node.js and npm
- MySQL (or another supported database)
- Google Gemini API key

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/OSithu/echem-ai-faq-chat-bot.git
   cd e-chem-chatbot
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Create environment configuration**
   ```bash
   cp .env.example .env
   ```

4. **Add API credentials**
   - Open `.env` file
   - Add your Google Gemini API key:
     ```
     GEMINI_API_KEY=your_api_key_here
     ```

5. **Generate application key**
   ```bash
   php artisan key:generate
   ```



### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

---

## How to Run the Application

### Start Backend Server

```bash
php artisan serve --host=localhost --port=8000
```

The Laravel backend will be available at `http://localhost:8000`

### Start Frontend Development Server

1. **From the frontend directory**
   ```bash
   npm start
   ```
   
The React frontend will be available at `http://localhost:3000`

### Access the Chatbot

- Open your browser and navigate to `http://localhost:3000`
- The chatbot interface will be loaded and ready to accept queries

---

## Knowledge Base Coverage

The bot is grounded in the following e-Chem data:

- **42 Physical Exam Centers** (Nugegoda, Galle, Kandy, etc.)
- **Batches**: 2025, 2026, 2027
- **Portals**: 
  - results.echem.lk (Student results portal)
  - student.echem.lk (Student management portal)
  - info.echem.lk (Information portal)

---

## Assumptions & Limitations

### Assumptions

1. **API Key Availability**: Assumes the Google Gemini API key is valid and has sufficient quota
2. **Network Connectivity**: Requires stable internet connection for API calls
3. **Browser Compatibility**: Works on modern browsers (Chrome, Firefox, Safari, Edge)
4. **User Context**: Assumes queries are related to e-Chem services and chemistry-related topics

### Limitations

1. **API Rate Limits**: Subject to Google Gemini API rate limiting based on subscription tier
2. **Response Latency**: API response times depend on Google's infrastructure and network conditions
3. **Knowledge Cutoff**: Gemini has a knowledge cutoff date; queries about recent events may have limited accuracy
4. **Context Window**: Long conversations may be truncated due to API context limitations
5. **Language Support**: Primarily optimized for English; support for other languages may be limited
6. **Offline Functionality**: Chatbot requires internet connection; cannot function offline
7. **Data Accuracy**: Bot responses are only as accurate as the knowledge base provided; requires regular updates
8. **Cost**: API usage incurs costs based on Google's pricing model

---

## Technology Stack

### Backend
- **Framework**: Laravel 11
- **Language**: PHP 8.1+
- **API Client**: Google Gemini PHP Package
- **Authentication**: Laravel Sanctum

### Frontend
- **Framework**: React
- **Build Tool**: Vite
- **Styling**: CSS

