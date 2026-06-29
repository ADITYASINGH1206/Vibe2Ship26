import os
import numpy as np
from sklearn.cluster import MiniBatchKMeans
from sklearn.ensemble import RandomForestClassifier
import google.generativeai as genai

# Setup Gemini API key
genai.configure(api_key=os.environ.get("GEMINI_API_KEY", ""))

class TaskClusterer:
    def __init__(self):
        # Initialize MiniBatchKMeans with 3 clusters for simplicity: e.g., Deep Work, Communications, Quick Errands
        self.kmeans = MiniBatchKMeans(n_clusters=3, random_state=42, batch_size=10)
        self.is_fitted = False
        # Mapping cluster indices to semantic names
        self.cluster_names = {
            0: "Deep Work",
            1: "Communications",
            2: "Quick Errands"
        }

    def _get_embedding(self, text: str) -> np.ndarray:
        try:
            # Using Gemini embedding model
            result = genai.embed_content(
                model="models/text-embedding-004",
                content=text,
                task_type="clustering"
            )
            return np.array(result['embedding'])
        except Exception as e:
            print(f"Error fetching embedding: {e}")
            # Fallback to random embedding if API fails
            return np.random.rand(768)

    def cluster_tasks(self, tasks):
        if not tasks:
            return []
            
        embeddings = [self._get_embedding(task.title) for task in tasks]
        X = np.vstack(embeddings)
        
        # Fit if not already fitted (in a real app, this would be pretrained or fit periodically)
        if not self.is_fitted:
            self.kmeans.partial_fit(X)
            self.is_fitted = True
            
        labels = self.kmeans.predict(X)
        
        for idx, task in enumerate(tasks):
            # Attach the cluster name to the task object
            task.contextCluster = self.cluster_names.get(labels[idx], "Unknown")
            
        return tasks

class RiskPredictor:
    def __init__(self):
        self.model = RandomForestClassifier(n_estimators=50, random_state=42)
        self._train_synthetic_model()

    def _train_synthetic_model(self):
        """
        Train a synthetic model on startup.
        Features: [urgency_hours, num_tasks, total_duration_minutes]
        Target: 0 (Success), 1 (Failure)
        """
        print("Training synthetic Risk Assessment model...")
        X_train = []
        y_train = []
        
        # Generate 1000 synthetic samples
        for _ in range(1000):
            urgency_hours = np.random.uniform(1, 168) # 1 hour to 1 week
            num_tasks = np.random.randint(1, 20)
            total_duration = num_tasks * np.random.uniform(15, 120)
            
            # Logic: Short urgency, high number of tasks, high total duration -> Higher chance of failure (1)
            risk_score = (num_tasks * total_duration) / (urgency_hours * 60)
            
            # Add some noise
            risk_score += np.random.normal(0, 0.5)
            
            failed = 1 if risk_score > 2.5 else 0
            
            X_train.append([urgency_hours, num_tasks, total_duration])
            y_train.append(failed)
            
        self.model.fit(X_train, y_train)
        print("Synthetic model trained.")

    def predict_risk(self, urgency_hours: float, num_tasks: int, total_duration: float) -> float:
        """
        Returns the probability of failure [0.0, 1.0]
        """
        features = np.array([[urgency_hours, num_tasks, total_duration]])
        proba = self.model.predict_proba(features)
        # proba[0][1] is the probability of class 1 (Failure)
        return float(proba[0][1])

# Singleton instances
task_clusterer = TaskClusterer()
risk_predictor = RiskPredictor()
