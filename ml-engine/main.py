from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import traceback

from ml_models import task_clusterer, risk_predictor

app = FastAPI(title="Last-Minute Life Saver ML Engine")

class Task(BaseModel):
    title: str
    durationMinutes: int
    contextCluster: Optional[str] = None
    scheduledStart: Optional[str] = None
    scheduledEnd: Optional[str] = None

class AnalyzeRequest(BaseModel):
    deadline: str
    microTasks: List[Task]

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "ML Engine is running."}

@app.post("/analyze")
def analyze_tasks(request: AnalyzeRequest):
    try:
        # 1. Calculate urgency in hours
        try:
            # Assuming ISO 8601 format from frontend/backend
            deadline_dt = datetime.fromisoformat(request.deadline.replace('Z', '+00:00'))
            now = datetime.now(deadline_dt.tzinfo)
            urgency_hours = (deadline_dt - now).total_seconds() / 3600.0
            if urgency_hours < 0:
                urgency_hours = 0.1 # Very urgent if past deadline
        except Exception as e:
            print(f"Error parsing date: {e}")
            urgency_hours = 24.0 # Default fallback

        # 2. Cluster Tasks (Unsupervised)
        # Note: In a real implementation, we'd wait for asyncio if _get_embedding was async
        clustered_tasks = task_clusterer.cluster_tasks(request.microTasks)
        
        # 3. Calculate Risk of Failure (Supervised)
        num_tasks = len(clustered_tasks)
        total_duration = sum(t.durationMinutes for t in clustered_tasks)
        
        risk_score = risk_predictor.predict_risk(
            urgency_hours=urgency_hours,
            num_tasks=num_tasks,
            total_duration=total_duration
        )

        return {
            "status": "success",
            "data": {
                "tasks": [t.model_dump() for t in clustered_tasks],
                "analytics": {
                    "riskOfFailure": risk_score,
                    "urgencyHours": round(urgency_hours, 2),
                    "totalDurationMinutes": total_duration
                }
            }
        }
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

class RecommendRequest(BaseModel):
    riskScore: float
    category: str
    totalTasks: int

@app.post("/recommend")
def get_recommendation(request: RecommendRequest):
    try:
        from recommendation_service import get_recommendations
        insight = get_recommendations(request.riskScore, request.category, request.totalTasks)
        return {"status": "success", "recommendation": insight}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
