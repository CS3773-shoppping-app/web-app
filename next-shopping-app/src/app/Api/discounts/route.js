import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { DbConnect } from '../products/route';

const dbConfig = {
  host: 'your-database-host',
  user: 'your-database-user',
  password: 'your-database-password',
  database: 'your-database-name',
};

export async function GET() {
  try {
    const connection = await DbConnect();
    const [rows] = await connection.execute('SELECT * FROM DiscountCodes');
    await connection.end();

    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  const { code, discount_percentage} = await req.json();

  try {
    const connection = await DbConnect();
    const [result] = await connection.execute(
      'INSERT INTO DiscountCodes (code, discount_percentage) VALUES (?, ?)',
      [code, discount_percentage]
    );
    await connection.end();

    return NextResponse.json({ message: 'Discount code added successfully!' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
