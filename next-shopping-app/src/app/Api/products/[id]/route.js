import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { DbConnect } from '../route';

const db = DbConnect();

export async function GET(request, { params }) {
  const url = new URL(request.url);
  const id = params.id;

  try {
    const [rows] = await db.query(`
      SELECT Items.*, Images.image_url
      FROM Items
      LEFT JOIN Images ON Items.item_id = Images.item_id
      WHERE Items.item_id = ?;`,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ item: rows[0] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const id = params.id
    const body = await request.json();
    const { name, description, price, stock } = body;
    const image = request.file ? `/uploads/${request.file.filename}` : null;

    // Update the Items table
    const [result] = await db.query(
      'UPDATE Items SET name = ?, description = ?, price = ?, quantity_available = ? WHERE item_id = ?;',
      [name, description, price, stock, id]
    );

    // Update the Images table
    await db.query(
      'UPDATE Images SET image_url = ? WHERE item_id = ?;',
      [image, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Item updated successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
