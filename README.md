# OptiFlow (Formerly Last-Minute Life Saver)

OptiFlow is an advanced, AI-driven cognitive interface designed to optimize task management, predictive scheduling, and risk mitigation. Built for productivity enthusiasts and professionals, the system leverages machine learning and generative AI to break down complex objectives into manageable micro-tasks, evaluate failure risks, and semantically cluster related tasks to streamline execution.

## System Architecture

The application is structured as a robust microservices architecture comprising three primary layers:

### 1. Frontend (Client Application)
A highly responsive, modern single-page application (SPA) focused on delivering a rich, interactive user experience.
- **Framework:** React 19 / Vite
- **Styling:** Tailwind CSS (v4), integrating deep custom themes and fluid animations.
- **State Management:** Custom React Hooks and LocalStorage for persistent local state tracking (History Ledger, Bills, Tasks).
- **Key Dependencies:** Recharts (data visualization), React Big Calendar (scheduling interface), Axios (HTTP client).

### 2. Backend (API Gateway & Generative Services)
A lightweight, high-performance Node.js service acting as the primary orchestrator between the client, the generative AI models, and the machine learning engine.
- **Runtime:** Node.js (Express framework)
- **Security:** Helmet and CORS integrations.
- **Generative AI:** Google Generative AI (Gemini Flash) SDK for dynamic task decomposition and contextual objective analysis.
- **Role:** Handles client requests, queries the Gemini model to break objectives into sub-tasks, and orchestrates requests to the ML Engine for clustering and risk assessment.

### 3. ML Engine (Analytical Microservice)
A dedicated Python-based service responsible for heavy computational analysis, natural language processing, and predictive scoring.
- **Framework:** FastAPI
- **Machine Learning:** Scikit-Learn (K-Means Clustering, Random Forest Classification), Sentence Transformers (`all-MiniLM-L6-v2`).
- **Functionality:** 
  - Generates semantic embeddings for incoming micro-tasks.
  - Clusters tasks based on contextual similarity using unsupervised learning.
  - Predicts the statistical risk of task failure based on historical urgency and volume using a trained Random Forest model.

## Core Features

- **Dynamic Task Breakdown:** Translates abstract, high-level user objectives into concrete, schedulable micro-tasks ranging dynamically based on complexity.
- **Semantic Clustering:** Intelligently groups sub-tasks that share contextual similarities, reducing context-switching fatigue.
- **Predictive Risk Analytics:** Analyzes impending deadlines and total workload volume to output a quantitative "Risk of Failure" score, triggering proactive interventions if necessary.
- **History Ledger:** A centralized, chronological timeline tracking completed tasks, achieved objectives, and settled fiscal obligations.
- **Biometric Enforcer Demo:** A proof-of-concept intervention protocol that intercepts high-risk user actions, requiring simulated biometric verification to proceed.
- **Smart Calendar & Fiscal Tracking:** Integrated calendar interfaces and financial tracking queues built seamlessly into the unified command center.

## Local Development Setup

To run the full stack locally, ensure you have Docker and Docker Compose installed. 

### Prerequisites
1. Provide a Google Gemini API Key.
2. Create a `.env` file in the root directory (or in the `backend/` directory) with the following variable:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

### Running with Docker
The project includes a unified `docker-compose.yml` file to spin up all three services simultaneously.

```bash
docker-compose up --build
```

- **Frontend** will be available at `http://localhost:3000`
- **Backend API** will be available at `http://localhost:5000`
- **ML Engine API** will be available at `http://localhost:8000`

## Cloud Deployment

The application is fully containerized and production-ready for deployment on Google Cloud Run.

### Deployment Prerequisites
Ensure the source code is pushed to a GitHub repository and accessible to the Google Cloud Console. 

### Service Configuration
1. **ML Engine:** Deploy the `ml-engine` directory. Expose port `8000` or rely on the Cloud Run injected `PORT` environment variable. Ensure unauthenticated invocations are allowed.
2. **Backend:** Deploy the `backend` directory. Configure the following environment variables in the Cloud Run deployment console:
   - `GEMINI_API_KEY`: Your Google Gemini API Key.
   - `ML_ENGINE_URL`: The deployed Cloud Run URL of the ML Engine service.
3. **Frontend:** Deploy the `frontend` directory. Configure the following build-time environment variable:
   - `VITE_API_URL`: The deployed Cloud Run URL of the Backend service (e.g., `https://backend-xyz.a.run.app/api`).

By deploying via Google Cloud Run, the application benefits from automatic horizontal scaling, SSL termination, and managed infrastructure.
