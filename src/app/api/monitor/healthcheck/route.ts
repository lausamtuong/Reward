import { NextResponse } from 'next/server';

export type HealthCheckApiPayload = {
  status: 'ok' | 'error';
  message: string;
  appName: string;
  appVersion: string;
  timestamp: string;
};

export async function GET() {
  const payload: HealthCheckApiPayload = {
    status: 'ok',
    message: 'Health check successful for API route',
    appName: process.env.APP_NAME ?? 'unknown',
    appVersion: process.env.APP_VERSION ?? 'unknown',
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(payload, { status: 200, headers: { 'Content-Type': 'application/json' } });
}
