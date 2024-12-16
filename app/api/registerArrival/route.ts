import { NextResponse } from 'next/server';

interface RequestBody {
  personnummer?: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  const { personnummer } = body;

  if (!personnummer || !/^\d{11}$/.test(personnummer)) {
    return NextResponse.json({ message: 'Ugyldig personnummer.' }, { status: 400 });
  }

  try {
    // Simulate external EJP API call:
    return NextResponse.json({ message: 'Oppmøte registrert' }, { status: 200 });
  } catch (error: unknown) {
    // Narrow the type of error if it's an instance of Error
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      // If it's not an Error, return a generic error message
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  }
}
