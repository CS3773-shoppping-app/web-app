//Api/discounts/route.js
'use server';
import { NextResponse } from 'next/server';
import { DbConnect } from '../products/route.js';

export async function GET() {
  console.log('GET request to /Api/discounts received');
    let connection;
  try {
    connection = await DbConnect();
    const query = 'SELECT discount_code_id, code, discount_percentage, valid_from, valid_until FROM DiscountCodes;';
    const [rows] = await connection.execute(query);
    console.log('Query executed successfully:', rows);

    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }finally {
    if (connection) {
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

