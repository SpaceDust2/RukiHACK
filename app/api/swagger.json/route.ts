import { NextResponse } from 'next/server';
import swaggerDocument from '../../../swagger-output.json';

export async function GET() {
  return NextResponse.json(swaggerDocument);
}