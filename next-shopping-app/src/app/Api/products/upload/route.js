import { IncomingForm } from 'formidable';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import mysql from 'mysql2/promise';
import { DbConnect } from '../route';

const parseForm = (req) => {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { fields, files } = await parseForm(req);

      const { name, description, price, stockAmount } = fields;
      const image = files.image;

      const imagePath = `./public/uploads/${uuidv4()}-${image.originalFilename}`;
      const imagePublicPath = `/uploads/${uuidv4()}-${image.originalFilename}`;

      fs.renameSync(image.filepath, imagePath);
      const connection = await DbConnect();
      const [itemResult] = await connection.execute(
        'INSERT INTO Items (name, description, price, quantity_available) VALUES (?, ?, ?, ?)',
        [name, description, price, stockAmount]
      );

      const itemId = itemResult.insertId;

      await connection.execute(
        'INSERT INTO Images (item_id, image_url) VALUES (?, ?)',
        [itemId, imagePublicPath]
      );

      await connection.end();

      res.status(200).json({ message: 'Product uploaded successfully' });
    } catch (error) {
      console.error('Error uploading product:', error);
      res.status(500).json({ message: 'Failed to upload product' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
