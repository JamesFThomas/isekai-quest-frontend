import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log('Received registration data:', body);

    return NextResponse.json({
      success: true,
      message: 'Registration route reached successfully',
      data: {},
    });
  } catch (error) {
    console.error('Error in registration route:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while processing the registration',
        data: {},
      },
      { status: 500 },
    );
  }
}
