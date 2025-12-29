import { NextResponse } from 'next/server';

const WEBHOOK_URL = 'https://n8n-production-c81b.up.railway.app/webhook/c147766c-0f57-4d89-b073-edb909809b2e';

export async function POST(request) {
  try {
    const body = await request.json();
    
    console.log('API Route: Received data:', body);
    console.log('API Route: Forwarding to webhook:', WEBHOOK_URL);

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    console.log('API Route: Webhook response status:', response.status);
    
    const responseData = await response.text();
    console.log('API Route: Webhook response:', responseData);

    if (response.ok) {
      return NextResponse.json(
        { success: true, message: 'Data sent successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: `Webhook returned status ${response.status}`, details: responseData },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error('API Route: Error forwarding to webhook:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to send data to webhook' },
      { status: 500 }
    );
  }
}

