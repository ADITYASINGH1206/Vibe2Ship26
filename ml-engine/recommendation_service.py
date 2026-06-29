import random

def get_recommendations(risk_score: float, category: str, total_tasks: int) -> str:
    """
    Generate a personalized productivity recommendation based on the current state.
    """
    if risk_score > 0.8:
        return f"🚨 CRITICAL ALERT: Your '{category}' task has an {(risk_score*100):.1f}% probability of failure. Drop all non-essential activities. Consider asking for a deadline extension immediately or delegating sub-tasks."
    elif risk_score > 0.6:
        return f"⚠️ HIGH RISK: The schedule for this '{category}' task is extremely tight. Recommend the Pomodoro technique (25m work / 5m break) to maintain focus without burning out."
    
    if total_tasks > 5:
        return "🧠 HIGH COGNITIVE LOAD: You have scheduled many micro-tasks. Make sure to take a 10-minute mental reset halfway through."
    
    if category.lower() == 'urgent':
        return "⚡ URGENT TASK DETECTED: Mute all notifications and block your calendar. Focus purely on execution."
    
    # Generic positive reinforcements
    generic = [
        "Your schedule looks balanced. Maintain steady momentum.",
        "Good pacing! Remember to hydrate between micro-tasks.",
        "Risk is low. This is a great opportunity to get ahead of schedule."
    ]
    
    return random.choice(generic)
