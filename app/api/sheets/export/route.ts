import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization')?.split('Bearer ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { trips } = await req.json();

    // 1. Create a new Spreadsheet
    const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        properties: {
          title: 'My Trip History'
        }
      })
    });

    if (!createRes.ok) {
      const errorText = await createRes.text();
      return NextResponse.json({ error: 'Failed to create sheet', details: errorText }, { status: 500 });
    }

    const createData = await createRes.json();
    const spreadsheetId = createData.spreadsheetId;

    // 2. Prepare Data
    const values = [
      ['Trip Name', 'Date', 'Incidents', 'Notes'], // Header Row
      ...trips.map((trip: any) => [
        trip.title,
        trip.date,
        trip.incidents.toString(),
        trip.incidentType || ''
      ])
    ];

    // 3. Write Data to Sheet
    const updateRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A1:D${values.length}?valueInputOption=USER_ENTERED`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        range: `Sheet1!A1:D${values.length}`,
        majorDimension: 'ROWS',
        values: values
      })
    });

    if (!updateRes.ok) {
      const errorText = await updateRes.text();
      return NextResponse.json({ error: 'Failed to write data to sheet', details: errorText }, { status: 500 });
    }

    return NextResponse.json({ success: true, spreadsheetId });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
