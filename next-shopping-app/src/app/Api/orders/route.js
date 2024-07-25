import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { DbConnect } from '../products/route';

export async function GET() {
    let connection;
  try {
    connection = await DbConnect();
    const query = 'SELECT order_id, customer_id, total_amount, order_date, fulfilled FROM Orders;';
    const [rows] = await connection.execute(query);

    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }finally {
    if (connection) {
      await connection.end();
}
  }
}
