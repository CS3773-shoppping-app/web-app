import { NextResponse } from "next/server";
import { DbConnect } from "../products/route";
import mysql from 'mysql2/promise';

export async function GET() {
    let connection;
    try {
        connection = await DbConnect();
        const query = 'SELECT user_id, username, can_edit FROM Users;';
        const [data] = await connection.execute(query);

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

export async function PUT(request) {
    let connection;
    try {
        connection = await DbConnect();
        const changes = await request.json();

        await connection.beginTransaction();

        for (const [userId, canEdit] of Object.entries(changes)) {
            const userIdNumber = parseInt(userId, 10);
            const canEditValue = canEdit ? 1 : 0;

            await connection.query(
                'UPDATE Users SET can_edit = ? WHERE user_id = ?',
                [canEditValue, userIdNumber]
            );
        }
        await connection.commit();
        return NextResponse.json({ message: 'Users updated successfully' });
    } catch (error) {
        if (connection) {
            await connection.rollback();
        }
        console.error('Error updating users:', error);
        return NextResponse.json({ error: 'Failed to update users' }, { status: 500 });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}
