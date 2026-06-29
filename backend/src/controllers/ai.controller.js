const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generatePlan = async (req, res) => {
    try {
        const { taskDescription } = req.body;

        if (!taskDescription) {
            return res.status(400).json({ error: 'Task description is required' });
        }

        // 1. Phase 1: Agentic Core - Parse text to identify hard deadline & scope and generate micro-tasks
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const prompt = `
        You are a proactive productivity agent. Analyze the following vague task description:
        "${taskDescription}"

        1. Identify the core objective and the hard deadline.
        2. Break the objective down into a series of actionable micro-tasks.
        3. Estimate the duration (in minutes) for each micro-task.
        
        Respond ONLY with a valid JSON object in this exact format:
        {
            "objective": "...",
            "deadline": "YYYY-MM-DDTHH:MM:SSZ",
            "microTasks": [
                { "title": "...", "durationMinutes": 30 }
            ]
        }
        `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        
        // Clean markdown JSON formatting if present
        const jsonStr = responseText.replace(/```json\n?|```/g, '').trim();
        const parsedData = JSON.parse(jsonStr);

        // 2. Interrogate Calendar API (Mocking this interaction for the skeleton)
        // In reality, this would use googleapis (calendar.events.freeBusy)
        console.log("Interrogating Google Calendar for available time blocks...");
        const availableBlocks = [
            { start: new Date(Date.now() + 3600000), end: new Date(Date.now() + 7200000) }, // +1 hr to +2 hr
            { start: new Date(Date.now() + 10800000), end: new Date(Date.now() + 14400000) } // +3 hr to +4 hr
        ];

        // 3. Autonomously schedule micro-tasks
        const scheduledTasks = parsedData.microTasks.map((task, index) => {
            // Simplistic scheduling logic for demonstration
            const block = availableBlocks[index % availableBlocks.length];
            return {
                ...task,
                scheduledStart: block.start,
                scheduledEnd: new Date(block.start.getTime() + task.durationMinutes * 60000)
            };
        });

        // 4. Phase 2: Machine Learning Intelligence Layer (Real ML Microservice call)
        console.log("Sending tasks to ML engine for context clustering and risk assessment...");
        
        let mlEnrichedTasks = scheduledTasks;
        let totalRisk = 0;
        let interventionTriggered = false;

        try {
            const mlResponse = await fetch(`${process.env.ML_ENGINE_URL}/analyze`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    deadline: parsedData.deadline,
                    microTasks: scheduledTasks
                })
            });

            if (mlResponse.ok) {
                const mlData = await mlResponse.json();
                mlEnrichedTasks = mlData.data.tasks;
                totalRisk = mlData.data.analytics.riskOfFailure;

                if (totalRisk > 0.8) {
                    console.warn(`⚠️ High Risk of Failure detected (${(totalRisk * 100).toFixed(1)}%). Triggering proactive intervention sequence.`);
                    interventionTriggered = true;
                }
            } else {
                console.error("ML Engine returned an error:", await mlResponse.text());
                // Fallback risk calculation if ML engine fails
                totalRisk = 0.5; 
            }
        } catch (mlError) {
            console.error("Failed to communicate with ML Engine:", mlError.message);
            totalRisk = 0.5;
        }

        res.status(200).json({
            status: 'success',
            data: {
                objective: parsedData.objective,
                deadline: parsedData.deadline,
                scheduledTasks: mlEnrichedTasks,
                analytics: {
                    averageRiskScore: totalRisk,
                    interventionTriggered: interventionTriggered
                }
            }
        });

    } catch (error) {
        console.error("Error in generatePlan:", error);
        res.status(500).json({ error: 'Failed to generate and schedule plan.' });
    }
};

module.exports = {
    generatePlan
};
