import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const apiKey = process.env.BREVO_API_KEY;
    const receiverEmail = process.env.BREVO_RECEIVER_EMAIL || 'support@jefedo.com';
    const listId = parseInt(process.env.BREVO_CONTACT_LIST_ID || '2');

    if (!apiKey || apiKey === 'your_brevo_api_key_here') {
        return NextResponse.json({ error: 'Brevo API key not configured or invalid' }, { status: 500 });
    }

    try {
        const body = await req.json();
        const { action, email, name, subject, message } = body;

        if (action === 'subscribe') {
            if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });

            const response = await fetch('https://api.brevo.com/v3/contacts', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'api-key': apiKey,
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    listIds: [listId],
                    updateEnabled: true,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                // If contact already exists and updateEnabled is true, it might still return an error depending on Brevo's mood
                // But usually it returns 204 or 201.
                throw new Error(data.message || 'Failed to subscribe');
            }
            return NextResponse.json({ success: true, data });
        }

        if (action === 'contact') {
            if (!email || !name || !message) {
                return NextResponse.json({ error: 'Missing required fields (name, email, message)' }, { status: 400 });
            }

            const response = await fetch('https://api.brevo.com/v3/smtp/email', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'api-key': apiKey,
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    sender: { name: 'Jefedo System', email: 'no-reply@jefedo.com' },
                    to: [{ email: receiverEmail, name: 'Jefedo Support' }],
                    replyTo: { email, name },
                    subject: `[Contact Form] ${subject || 'New Message'}`,
                    htmlContent: `
                        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                            <h2 style="color: #1a56db;">New Message from Jefedo Contact Form</h2>
                            <p><strong>Name:</strong> ${name}</p>
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>Subject:</strong> ${subject}</p>
                            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                            <p><strong>Message:</strong></p>
                            <p style="white-space: pre-wrap;">${message}</p>
                        </div>
                    `,
                }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to send message');
            return NextResponse.json({ success: true, data });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    } catch (error: any) {
        console.error('Brevo API Error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
