import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { DbConnect } from '../route';
import formidable from 'formidable';

export async function GET(request, { params }) {
  let db;
  const id = params.id;

  try {
    db = await DbConnect();
    const query = `SELECT Items.*, Images.image_url FROM Items LEFT JOIN Images ON Items.item_id = Images.item_id WHERE Items.item_id = ?;`;
    const [rows] = await db.execute(query, [id]);

    if (rows.length === 0) {
      return NextResponse.json({ message: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ item: rows[0] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  } finally {
    if (db) {
      await db.end();
    }
  }
}

export async function PUT(request, { params }) {
  let db;
  const id = params.id;

  const form = formidable({ multiples: true });

  try {
    db = await DbConnect();

    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(request, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const { name, description, price, stock } = fields;
    const image = files.image ? `/uploads/${files.image.newFilename}` : null;

    const [result] = await db.query(
      'UPDATE Items SET name = ?, description = ?, price = ?, quantity_available = ? WHERE item_id = ?;',
      [name, description, price, stock, id]
    );

    // Update the Images table, only if image URL is provided
    if (image) {
      await db.query(
        'UPDATE Images SET image_url = ? WHERE item_id = ?;',
        [image, id]
      );
    }

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Item updated successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  } finally {
    if (db) {
      await db.end();
    }
  }
}
