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
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
  }
}