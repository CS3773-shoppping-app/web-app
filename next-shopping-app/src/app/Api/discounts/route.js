import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { DbConnect } from '../products/route';

export async function GET() {
  let connection;
  try {
    connection = await DbConnect();
    const query = 'SELECT discount_code_id, code, discount_percentage, valid_from, valid_until FROM DiscountCodes;';
    const [rows] = await connection.execute(query);

    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }finally{
    if(connection){
      await connection.end();
    }
  }
}

export async function POST(req) {
  const { code, discount_percentage} = await req.json();
  let connection;
  try {
    connection = await DbConnect();
    const [result] = await connection.execute(
      'INSERT INTO DiscountCodes (code, discount_percentage) VALUES (?, ?)',
      [code, discount_percentage]
    );

    return NextResponse.json({ message: 'Discount code added successfully!' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }finally{
    if(connection){
      await connection.end();
    }
  }
}

