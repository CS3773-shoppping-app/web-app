import { IncomingForm } from 'formidable';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import mysql from 'mysql2/promise';
import { DbConnect } from '../route';

const parseForm = (req) =>
  new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

export default async function POST(req){
    try {
        const { fields, files } = await parseForm(req);
        const { name, description, price, stockAmount } = fields;
        const image = files.image;

        if (!image) {
            return NextResponse.json({ message: 'Image file is required' }, { status: 400 });
          }

      const imagePath = `./public/uploads/${uuidv4()}-${image.originalFilename}`;
      const imagePublicPath = `/uploads/${uuidv4()}-${image.originalFilename}`;

      fs.renameSync(image.filepath, imagePath);
      const connection = await DbConnect();
      const [itemResult] = await connection.execute(
        'INSERT INTO Items (name, description, price, quantity_available) VALUES (?, ?, ?, ?);',
        [name, description, price, stockAmount]
      );

      const itemId = itemResult.insertId;

      await connection.execute(
        'INSERT INTO Images (item_id, image_url) VALUES (?, ?)',
        [itemId, imagePublicPath]
      );

      await connection.end();

      return NextResponse.json({ message: 'Product uploaded successfully' });
    } catch (error) {
        console.error('Error uploading product:', error);
        return NextResponse.json({ message: 'Failed to upload product' }, { status: 500 });
    }
  }
    

