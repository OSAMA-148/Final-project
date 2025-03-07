export async function POST(req) {
    try {
        const body = await req.json();
        console.log("Request Body:", body); // ✅ طباعة الطلب للتأكد

        const { prompt } = body;
        if (!prompt) {
            return Response.json(
                { error: "Prompt is required" },
                { status: 400 }
            );
        }

        const apiKey = process.env.GEMINI_API_KEY;
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
            }),
        });

        const data = await res.json();
        console.log("API Response:", data); // ✅ طباعة رد API

        if (data.candidates && data.candidates.length > 0) {
            return Response.json(
                { text: data.candidates[0].content },
                { status: 200 }
            );
        } else {
            return Response.json(
                { error: "No response from AI" },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error("Error:", error); // ✅ طباعة الأخطاء
        return Response.json({ error: error.message }, { status: 500 });
    }
}
