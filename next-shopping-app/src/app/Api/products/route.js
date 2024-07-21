import { NextResponse } from 'next/server';
import handler from './getProducts';

export async function GET(){
    return NextResponse.json(handler);
}


