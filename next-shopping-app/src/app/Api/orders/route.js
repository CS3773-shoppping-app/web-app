import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { DbConnect } from '../products/route';

export async function GET() {
  try {
    const connection = await DbConnect();
    const [rows] = await connection.execute('SELECT * FROM Orders');
    await connection.end();

    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
