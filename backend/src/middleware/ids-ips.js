const rateLimit = require('express-rate-limit');

// Simple pattern matching for common prompt injection or malicious payloads
const maliciousPatterns = [
    /ignore previous instructions/i,
    /system prompt/i,
    /drop table/i,
    /<script>/i,
    /exec\(/i
];

const idsIpsMiddleware = (req, res, next) => {
    const payload = JSON.stringify(req.body || {});
    
    // 1. IPS: Check payload size (e.g., limit to 5KB to prevent resource exhaustion)
    if (payload.length > 5000) {
        console.warn(`[IPS Blocked] Payload too large from IP: ${req.ip}`);
        return res.status(413).json({ error: 'Payload too large. Request blocked by IPS.' });
    }

    // 2. IDS/IPS: Pattern Matching for Prompt Injection and Malicious Content
    for (const pattern of maliciousPatterns) {
        if (pattern.test(payload)) {
            console.warn(`[IPS Blocked] Malicious pattern detected from IP: ${req.ip}. Pattern: ${pattern}`);
            return res.status(403).json({ error: 'Malicious payload detected. Request blocked by IPS.' });
        }
    }

    // 3. IDS: Log anomalous activity (e.g., unexpected fields)
    if (req.body && Object.keys(req.body).length > 10) {
        console.warn(`[IDS Alert] Unusually high number of fields in payload from IP: ${req.ip}`);
        // Not blocking, just alerting (Intrusion Detection)
    }

    next();
};

// Rate limiter specifically for AI endpoints to prevent DoS attacks
const aiRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Limit each IP to 50 requests per `window` (here, per 15 minutes)
    message: { error: 'Too many requests to AI endpoints, please try again later. Blocked by IPS.' },
    standardHeaders: true, 
    legacyHeaders: false, 
});

module.exports = {
    idsIpsMiddleware: [aiRateLimiter, idsIpsMiddleware]
};
